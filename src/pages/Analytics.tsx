import { BarChart3, Clock, Map, ShieldAlert, TrendingUp } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BarChart, LineChart } from '../components/Chart';
import { MetricCard } from '../components/MetricCard';
import { movementData, securityData, uptimeData, weeklyData } from '../data/sampleData';

const Analytics = () => (
  <AnimatedPage>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Analytics</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Usage, movement, and security insights</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Daily Usage" value="7.4h" icon={Clock} tone="good" progress={74} />
        <MetricCard title="Weekly Usage" value="42h" icon={TrendingUp} tone="good" progress={82} />
        <MetricCard title="Security Events" value="9" icon={ShieldAlert} tone="warn" progress={45} />
        <MetricCard title="Connection Uptime" value="98%" icon={BarChart3} tone="good" progress={98} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BarChart title="Movement Activity" data={movementData} labels={['8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p']} />
        <LineChart title="Connection Uptime" data={uptimeData} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} />
        <BarChart title="Security Events" data={securityData} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} />
        <LineChart title="Weekly Usage" data={weeklyData} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} />
      </div>
      <div className="glass mt-6 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <Map className="text-cyanblue" />
          <h3 className="text-lg font-semibold text-white">Location History</h3>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400">Generated campus movement data is ready to be replaced with GPS module coordinates when hardware integration begins.</p>
      </div>
    </section>
  </AnimatedPage>
);

export default Analytics;
