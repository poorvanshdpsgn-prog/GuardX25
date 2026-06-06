import { Bluetooth, PlugZap, Radio, RotateCcw, WifiOff } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/Button';
import { MetricCard } from '../components/MetricCard';
import { Timeline } from '../components/Timeline';
import { useSmartBag } from '../context/SmartBagContext';

const BleControl = () => {
  const { state, simulate, addToast } = useSmartBag();

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
              <Button icon={Bluetooth} onClick={() => addToast('Pairing request sent')}>Pair Device</Button>
              <Button icon={WifiOff} variant="danger" onClick={() => simulate('bleDisconnect')}>Disconnect</Button>
              <Button icon={RotateCcw} variant="secondary" onClick={() => simulate('deviceRecovery')}>Recover Connection</Button>
            </div>
          </div>
          <Timeline items={state.connectionHistory} title="Connection History" />
        </div>
      </section>
    </AnimatedPage>
  );
};

export default BleControl;
