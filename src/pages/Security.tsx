import { Fingerprint, Lock, ShieldAlert, ShieldCheck, UserCheck } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { MetricCard } from '../components/MetricCard';
import { Timeline } from '../components/Timeline';
import { useSmartBag } from '../context/SmartBagContext';

const Security = () => {
  const { state } = useSmartBag();

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Security Center</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Owner Mode and access intelligence</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="RFID Status" value={state.rfidStatus} icon={Fingerprint} tone={state.rfidStatus === 'Failed' ? 'bad' : 'good'} />
          <MetricCard title="Owner Mode" value={state.settings.ownerMode ? 'Enabled' : 'Disabled'} icon={UserCheck} tone={state.settings.ownerMode ? 'good' : 'warn'} />
          <MetricCard title="Security Score" value={`${state.securityScore}%`} icon={ShieldCheck} progress={state.securityScore} tone={state.securityScore > 80 ? 'good' : 'warn'} />
          <MetricCard title="Unauthorized Access" value={state.securityStatus === 'Alert' ? 'Detected' : 'Clear'} icon={ShieldAlert} tone={state.securityStatus === 'Alert' ? 'bad' : 'good'} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <Timeline items={state.events} title="Authentication Logs" />
          <div className="glass rounded-xl p-5">
            <Lock className="text-cyanblue" />
            <h3 className="mt-4 text-xl font-semibold text-white">Access Attempts</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">RFID success, failed scans, and theft detection events are tracked as a single security timeline.</p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-end justify-between">
                <span className="text-sm text-slate-400">Security Score</span>
                <span className="text-4xl font-semibold text-white">{state.securityScore}</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-electric to-cyanblue" style={{ width: `${state.securityScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Security;
