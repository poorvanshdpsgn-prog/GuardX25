import { AlertTriangle, BatteryLow, BluetoothOff, CheckCircle2, MapPin, RadioTower, ShieldAlert } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/Button';
import { useSmartBag } from '../context/SmartBagContext';

const iconMap = {
  'Bag Left Behind': AlertTriangle,
  'Unauthorized Movement': ShieldAlert,
  'RFID Failure': RadioTower,
  'Low Battery': BatteryLow,
  'BLE Disconnected': BluetoothOff,
  'Location Change': MapPin,
};

const Alerts = () => {
  const { state, dismissAlert } = useSmartBag();

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Alerts</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Notification system</h1>
        <div className="mt-8 grid gap-4">
          {state.alerts.map((alert) => {
            const Icon = iconMap[alert.type];
            const severity = {
              low: 'border-cyanblue/20 bg-cyanblue/8',
              medium: 'border-amber-300/20 bg-amber-300/8',
              high: 'border-rose-300/25 bg-rose-400/10',
              critical: 'border-rose-300/40 bg-rose-500/15',
            }[alert.severity];

            return (
              <article key={alert.id} className={`glass flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between ${severity}`}>
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-cyanblue">
                    {alert.resolved ? <CheckCircle2 /> : <Icon />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{alert.type}</h3>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs uppercase text-slate-300">{alert.severity}</span>
                      {alert.resolved ? <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200">Resolved</span> : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{alert.message}</p>
                    <p className="mt-1 text-xs text-slate-500">{alert.time}</p>
                  </div>
                </div>
                {!alert.resolved ? (
                  <Button variant="secondary" onClick={() => dismissAlert(alert.id)}>
                    Resolve
                  </Button>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Alerts;
