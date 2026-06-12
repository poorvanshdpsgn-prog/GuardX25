import { useState, useEffect, useRef } from 'react';
import { Bluetooth, PlugZap, Radio, RotateCcw, WifiOff } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/Button';
import { MetricCard } from '../components/MetricCard';
import { Timeline } from '../components/Timeline';
import { BleDeviceModal, BleDevice } from '../components/BleDeviceModal';
import { useSmartBag } from '../context/SmartBagContext';

interface NavigatorWithBluetooth extends Navigator {
  bluetooth?: {
    requestDevice: (options: any) => Promise<any>;
  };
}

const BleControl = () => {
  const { state, simulate, addToast, connectBleDevice, processBleMessage } = useSmartBag();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<any>(null);
  const [connectedGattServer, setConnectedGattServer] = useState<any>(null);
  const [characteristic, setCharacteristic] = useState<any>(null);
  // Buffer to reassemble split BLE packets
  const messageBufferRef = useRef('');

  // Listen for characteristic notifications
  useEffect(() => {
    if (characteristic) {
      const handleNotifications = (event: any) => {
        const value = event.target.value;
        if (value && value.buffer) {
          const decoder = new TextDecoder('utf-8');
          const chunk = decoder.decode(value.buffer);
          messageBufferRef.current += chunk;

          // Arduino btSend ends lines with \n — flush complete messages
          const lines = messageBufferRef.current.split('\n');
          // Keep last incomplete fragment in buffer
          messageBufferRef.current = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed) {
              console.log('📨 BLE Message Received:', trimmed);
              processBleMessage(trimmed);
            }
          }
        }
      };

      characteristic.addEventListener('characteristicvaluechanged', handleNotifications);

      return () => {
        characteristic.removeEventListener('characteristicvaluechanged', handleNotifications);
      };
    }
  }, [characteristic, processBleMessage]);

  const handleDeviceSelect = async (device: BleDevice) => {
    setIsConnecting(true);
    try {
      const navigatorWithBluetooth = navigator as NavigatorWithBluetooth;
      
      if (!navigatorWithBluetooth.bluetooth) {
        addToast('Bluetooth not available');
        return;
      }

      addToast(`Connecting to ${device.name}...`);

      // Nordic UART Service (NUS) — standard for HC-05/HC-06/BLE UART + Arduino btSend()
      // Service:        6e400001-b5a3-f393-e0a9-e50e24dcca9e
      // TX Characteristic (Arduino → Phone): 6e400003-b5a3-f393-e0a9-e50e24dcca9e
      const NUS_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
      const NUS_TX_CHAR = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

      const bleDevice = await navigatorWithBluetooth.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [NUS_SERVICE],
      });

      setConnectedDevice(bleDevice);
      console.log('✅ Device selected:', bleDevice.name);

      // Re-connect if the device was previously disconnected
      bleDevice.addEventListener('gattserverdisconnected', () => {
        console.warn('⚠️ BLE device disconnected unexpectedly');
        handleDisconnect();
      });

      // Connect to GATT server
      const gattServer = await bleDevice.gatt.connect();
      console.log('✅ Connected to GATT Server');

      // Get the Nordic UART Service
      const service = await gattServer.getPrimaryService(NUS_SERVICE);
      console.log('✅ Got NUS Service');

      // Get the TX characteristic (data flows Arduino → browser)
      const char = await service.getCharacteristic(NUS_TX_CHAR);
      console.log('✅ Got TX Characteristic');

      // Start notifications
      await char.startNotifications();
      console.log('✅ Started Notifications');

      // Store references
      setConnectedGattServer(gattServer);
      setCharacteristic(char);

      // Update UI state
      await connectBleDevice(device.id, device.name);
      setIsModalOpen(false);

      addToast(`✓ Connected to ${device.name} - Listening for alerts...`);
    } catch (error) {
      console.error('BLE Connection Error:', error);
      addToast(`Failed to connect: ${(error as Error).message}`);
      setConnectedDevice(null);
      setConnectedGattServer(null);
      setCharacteristic(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (characteristic) {
        await characteristic.stopNotifications();
      }

      if (connectedGattServer) {
        await connectedGattServer.disconnect();
      }

      if (connectedDevice) {
        setConnectedDevice(null);
      }

      setConnectedGattServer(null);
      setCharacteristic(null);
      simulate('bleDisconnect');
      addToast('Disconnected from BLE device');
    } catch (error) {
      addToast('Error disconnecting');
      console.error('Disconnect error:', error);
    }
  };

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">BLE Control Center</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Bluetooth management</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Device Name" value={state.deviceName} icon={Bluetooth} />
          <MetricCard title="Signal Strength" value={`${state.signalStrength}%`} icon={Radio} progress={state.signalStrength} tone={state.signalStrength > 60 ? 'good' : 'warn'} />
          <MetricCard title="Connection" value={state.bleStatus} icon={PlugZap} tone={state.bleStatus === 'Connected' ? 'good' : state.bleStatus === 'Pairing' ? 'warn' : 'bad'} />
          <MetricCard title="Firmware" value={state.firmwareVersion} icon={RotateCcw} detail={`Last sync: ${state.lastSync}`} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="glass rounded-xl p-5">
            <h3 className="text-lg font-semibold text-white">Device controls</h3>
            <div className="mt-5 grid gap-3">
              <Button 
                icon={Bluetooth} 
                onClick={() => setIsModalOpen(true)}
                disabled={isConnecting}
              >
                {state.bleStatus === 'Connected' ? 'Change Device' : 'Connect Device'}
              </Button>
              <Button 
                icon={WifiOff} 
                variant="danger" 
                onClick={handleDisconnect}
                disabled={state.bleStatus !== 'Connected'}
              >
                Disconnect
              </Button>
              <Button icon={RotateCcw} variant="secondary" onClick={() => simulate('deviceRecovery')}>
                Recover Connection
              </Button>
            </div>
            {state.bleStatus === 'Connected' && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-xs text-emerald-300">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  Listening for alerts...
                </p>
              </div>
            )}
          </div>
          <Timeline items={state.connectionHistory} title="Connection History" />
        </div>
      </section>

      <BleDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleDeviceSelect}
        isConnecting={isConnecting}
      />
    </AnimatedPage>
  );
};

export default BleControl;
