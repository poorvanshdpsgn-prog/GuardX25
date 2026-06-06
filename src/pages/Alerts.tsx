import { AlertTriangle, BatteryLow, BluetoothOff, CheckCircle2, Eye, Droplets, Lock, MapPin, RadioTower, ShieldAlert, AlertCircle } from 'lucide-react';
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
  'Bag Opened': AlertTriangle,
  'Water Detected': Droplets,
  'Owner Mode': Lock,
  'Misuse Detected': AlertCircle,
  'Surveillance': Eye,
};

const Alerts = () => {
  const { state, dismissAlert } = useSmartBag();

  const getAnimationClass = (severity: string, resolved: boolean) => {
    if (resolved) return '';
    
    switch (severity) {
      case 'critical':
        return 'alert-critical-glow border-rose-500/60 bg-rose-600/20';
      case 'high':
        return 'alert-flash border-rose-400/50 bg-rose-500/15';
      case 'medium':
        return 'alert-pulse border-amber-400/40 bg-amber-500/12';
      default:
        return '';
    }
  };

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Alerts</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Notification system</h1>
        
        {state.alerts.length === 0 && (
          <div className="mt-12 text-center py-12">
            <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={48} />
            <p className="text-lg text-slate-300">All systems operational</p>
            <p className="text-sm text-slate-500 mt-2">No active alerts at this time</p>
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {state.alerts.map((alert) => {
            const Icon = iconMap[alert.type as keyof typeof iconMap] || AlertTriangle;
            const animationClass = getAnimationClass(alert.severity, alert.resolved);
            
            const baseSeverityClass = {
              low: 'border-cyanblue/20 bg-cyanblue/8',
              medium: 'border-amber-300/20 bg-amber-300/8',
              high: 'border-rose-300/25 bg-rose-400/10',
              critical: 'border-rose-300/40 bg-rose-500/15',
            }[alert.severity];

            const displayClass = alert.resolved ? baseSeverityClass : animationClass || baseSeverityClass;

            return (
              <article 
                key={alert.id} 
                className={`glass flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between transition-all duration-300 ${displayClass}`}
              >
                <div className="flex gap-4">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 ${alert.resolved ? 'text-emerald-400' : 'text-rose-400 ' + (alert.severity === 'critical' || alert.severity === 'high' ? 'alert-icon-flash' : '')}`}>
                    {alert.resolved ? <CheckCircle2 /> : <Icon />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={`text-lg font-semibold ${alert.resolved ? 'text-slate-300' : 'text-white'}`}>
                        {alert.type}
                      </h3>
                      <span className={`rounded-full px-2 py-1 text-xs uppercase font-medium ${
                        alert.severity === 'critical' 
                          ? 'bg-rose-600/30 text-rose-200' 
                          : alert.severity === 'high'
                          ? 'bg-rose-500/20 text-rose-300'
                          : alert.severity === 'medium'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-cyanblue/20 text-cyanblue'
                      }`}>
                        {alert.severity}
                      </span>
                      {alert.resolved ? (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-200 font-medium">
                          ✓ Resolved
                        </span>
                      ) : null}
                    </div>
                    <p className={`mt-2 text-sm ${alert.resolved ? 'text-slate-500' : 'text-slate-200 font-medium'}`}>
                      {alert.message}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{alert.time}</p>
                  </div>
                </div>
                {!alert.resolved ? (
                  <Button variant="secondary" onClick={() => dismissAlert(alert.id)} className="whitespace-nowrap">
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
