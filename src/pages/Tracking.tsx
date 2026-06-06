import { Clock, MapPinned, Navigation, Route } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { MetricCard } from '../components/MetricCard';
import { StatusPill } from '../components/StatusPill';
import { mapPoints } from '../data/sampleData';
import { useSmartBag } from '../context/SmartBagContext';

const Tracking = () => {
  const { state } = useSmartBag();

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Live Tracking</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">GPS-ready location intelligence</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MetricCard title="Current Location" value={state.currentLocation} icon={MapPinned} />
          <MetricCard title="Last Known" value={state.lastKnownLocation} icon={Clock} />
          <MetricCard title="Movement Points" value={mapPoints.length} icon={Route} tone="good" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="glass relative h-[560px] overflow-hidden rounded-xl p-6">
            <div className="absolute inset-0 grid-mask opacity-70" />
            <div className="absolute inset-8 rounded-xl border border-cyanblue/20" />
            {mapPoints.map((point, index) => (
              <div key={point.label} className="absolute" style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                <div className="relative">
                  <span className={`absolute -inset-2 rounded-full ${index === mapPoints.length - 1 ? 'animate-ping bg-cyanblue/30' : 'bg-white/5'}`} />
                  <span className="relative grid h-4 w-4 place-items-center rounded-full bg-cyanblue shadow-glow" />
                  <div className="mt-2 w-36 rounded-lg border border-white/10 bg-black/60 p-2 text-xs">
                    <p className="font-semibold text-white">{point.label}</p>
                    <p className="text-slate-400">{point.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <svg className="absolute inset-0 h-full w-full">
              <polyline
                points={mapPoints.map((point) => `${point.x},${point.y}`).join(' ')}
                fill="none"
                stroke="#00D8FF"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Location timeline</h3>
              <StatusPill label="Mock GPS" />
            </div>
            <div className="mt-5 space-y-4">
              {mapPoints.map((point, index) => (
                <div key={point.label} className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <Navigation className="mt-1 text-cyanblue" size={18} />
                  <div>
                    <p className="font-medium text-white">{point.label}</p>
                    <p className="text-sm text-slate-400">{point.time} · movement sample {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Tracking;
