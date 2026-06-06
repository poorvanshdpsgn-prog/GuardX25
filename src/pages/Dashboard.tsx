import { Battery, Bluetooth, Fingerprint, MapPin, PlugZap, ShieldCheck, Wifi } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DemoPanel } from '../components/DemoPanel';
import { MetricCard } from '../components/MetricCard';
import { Timeline } from '../components/Timeline';
import { useSmartBag } from '../context/SmartBagContext';

const Dashboard = () => {
  const { state } = useSmartBag();

  return (
    <AnimatedPage>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Command Center</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Live SmartBag Dashboard</h1>
            <p className="mt-3 text-slate-400">Real-time demo telemetry for safety, authentication, location, and embedded system health.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <MetricCard title="Bag Status" value={state.bagStatus} icon={PlugZap} tone={state.bagStatus === 'Connected' ? 'good' : 'bad'} />
            <MetricCard title="Security Status" value={state.securityStatus} icon={ShieldCheck} tone={state.securityStatus === 'Secure' ? 'good' : 'bad'} progress={state.securityScore} />
            <MetricCard title="BLE Status" value={state.bleStatus} icon={Bluetooth} tone={state.bleStatus === 'Connected' ? 'good' : state.bleStatus === 'Pairing' ? 'warn' : 'bad'} progress={state.signalStrength} />
            <MetricCard title="Battery Level" value={`${state.battery}%`} icon={Battery} tone={state.battery > 55 ? 'good' : state.battery > 25 ? 'warn' : 'bad'} progress={state.battery} />
            <MetricCard title="Location" value={state.currentLocation} icon={MapPin} detail={`Last known: ${state.lastKnownLocation}`} />
            <MetricCard title="Owner Authentication" value={state.ownerAuthentication} icon={Fingerprint} tone={state.ownerAuthentication === 'Verified' ? 'good' : 'bad'} />
            <MetricCard title="System Health" value={state.systemHealth} icon={Wifi} tone={state.systemHealth === 'Online' ? 'good' : 'bad'} />
          </div>
          <div className="mt-6">
            <Timeline items={state.events} />
          </div>
        </div>
        <DemoPanel />
      </section>
    </AnimatedPage>
  );
};

export default Dashboard;
