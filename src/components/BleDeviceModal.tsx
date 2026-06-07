import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bluetooth, AlertCircle, Loader } from 'lucide-react';
import { Button } from './Button';

export type BleDevice = {
  name: string;
  id: string;
  rssi?: number;
};

type BleDeviceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (device: BleDevice) => void;
  isConnecting: boolean;
  onDataReceived?: (message: string) => void;
};

// Extend Navigator type to include bluetooth
interface NavigatorWithBluetooth extends Navigator {
  bluetooth?: {
    requestDevice: (options: any) => Promise<any>;
  };
}

export const BleDeviceModal = ({ isOpen, onClose, onSelect, isConnecting, onDataReceived }: BleDeviceModalProps) => {
  const [devices, setDevices] = useState<BleDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportsBLE, setSupportsBLE] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    // Check if browser supports BLE
    const navigatorWithBluetooth = navigator as NavigatorWithBluetooth;
    if (!navigatorWithBluetooth.bluetooth) {
      setSupportsBLE(false);
      setError('Bluetooth is not supported in this browser or context (requires HTTPS)');
      return;
    }

    setSupportsBLE(true);
  }, [isOpen]);

  const startScan = async () => {
    const navigatorWithBluetooth = navigator as NavigatorWithBluetooth;
    
    if (!navigatorWithBluetooth.bluetooth) {
      setError('Bluetooth is not available');
      return;
    }

    setIsScanning(true);
    setError(null);
    setDevices([]);

    try {
      const device = await navigatorWithBluetooth.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['0000180c-0000-1000-8000-00805f9b34fb'],
      });

      if (device) {
        const newDevice: BleDevice = {
          name: device.name || 'Unknown Device',
          id: device.id,
        };
        setDevices((prev) => [...prev, newDevice]);
      }
    } catch (err) {
      if ((err as Error).name !== 'NotFoundError') {
        setError((err as Error).message || 'Failed to scan for devices');
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleConnect = (device: BleDevice) => {
    onSelect(device);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass w-full max-w-md rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Select BLE Device</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Search for and select your Arduino R4 WiFi or other BLE device
        </p>

        {!supportsBLE ? (
          <div className="mt-6 flex gap-3 rounded-lg bg-red-500/10 p-4 border border-red-500/30">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-red-400">Bluetooth not available</p>
              <p className="text-xs text-red-300 mt-1">
                Ensure you're using HTTPS and a supported browser (Chrome, Edge, Firefox, Safari on iOS)
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="mt-6 flex gap-3 rounded-lg bg-yellow-500/10 p-4 border border-yellow-500/30">
            <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-yellow-400">Scan Error</p>
              <p className="text-xs text-yellow-300 mt-1">{error}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-6">
          <Button
            onClick={startScan}
            disabled={isScanning || isConnecting}
            icon={isScanning ? Loader : Bluetooth}
            className={isScanning ? 'animate-pulse' : ''}
          >
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        </div>

        {devices.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyanblue mb-3">
              Available Devices ({devices.length})
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {devices.map((device) => (
                <motion.button
                  key={device.id}
                  onClick={() => handleConnect(device)}
                  disabled={isConnecting}
                  whileHover={{ y: -2 }}
                  className="w-full flex items-center justify-between rounded-lg border border-cyanblue/25 bg-cyanblue/10 p-4 hover:bg-cyanblue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bluetooth className="text-cyanblue flex-shrink-0" size={18} />
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{device.name}</p>
                      <p className="text-xs text-slate-400">{device.id}</p>
                    </div>
                  </div>
                  {isConnecting && (
                    <Loader size={16} className="text-cyanblue animate-spin" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {devices.length === 0 && !isScanning && !error && (
          <div className="mt-6 text-center py-8">
            <Bluetooth className="mx-auto text-slate-500 mb-3" size={32} />
            <p className="text-sm text-slate-400">No devices found</p>
            <p className="text-xs text-slate-500 mt-1">
              Make sure your Arduino R4 WiFi BLE is powered on and in pairing mode
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={isConnecting}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
