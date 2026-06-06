import { BatteryLow, BluetoothOff, Fingerprint, LocateFixed, RotateCcw, ShieldAlert } from 'lucide-react';
import { DemoAction, useSmartBag } from '../context/SmartBagContext';
import { Button } from './Button';

const actions: { label: string; action: DemoAction; icon: typeof Fingerprint; variant?: 'primary' | 'secondary' | 'danger' }[] = [
  { label: 'RFID Success', action: 'rfidSuccess', icon: Fingerprint, variant: 'secondary' },
  { label: 'RFID Failure', action: 'rfidFailure', icon: ShieldAlert, variant: 'danger' },
  { label: 'BLE Disconnect', action: 'bleDisconnect', icon: BluetoothOff, variant: 'danger' },
  { label: 'Theft Alert', action: 'theftAlert', icon: ShieldAlert, variant: 'danger' },
  { label: 'Location Change', action: 'locationChange', icon: LocateFixed, variant: 'secondary' },
  { label: 'Battery Drain', action: 'batteryDrain', icon: BatteryLow, variant: 'secondary' },
  { label: 'Device Recovery', action: 'deviceRecovery', icon: RotateCcw },
];

export const DemoPanel = () => {
  const { simulate } = useSmartBag();

  return (
    <aside className="glass rounded-xl p-5">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyanblue">Demo Mode</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Hardware simulator</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">Trigger live SmartBag states without physical hardware.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((item) => (
          <Button key={item.action} icon={item.icon} variant={item.variant} onClick={() => simulate(item.action)} className="w-full">
            {item.label}
          </Button>
        ))}
      </div>
    </aside>
  );
};
