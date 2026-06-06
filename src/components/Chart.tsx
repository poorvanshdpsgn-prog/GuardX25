import { motion } from 'framer-motion';

type ChartProps = {
  title: string;
  data: number[];
  labels?: string[];
};

export const BarChart = ({ title, data, labels }: ChartProps) => {
  const max = Math.max(...data, 1);

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-6 flex h-48 items-end gap-3">
        {data.map((value, index) => (
          <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              className="w-full rounded-t-md bg-gradient-to-t from-electric to-cyanblue"
            />
            <span className="text-[11px] text-slate-500">{labels?.[index] ?? index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LineChart = ({ title, data, labels }: ChartProps) => {
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <svg viewBox="0 0 100 100" className="mt-6 h-48 w-full overflow-visible">
        <defs>
          <linearGradient id={`line-${title}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#00D8FF" />
            <stop offset="100%" stopColor="#2F7DFF" />
          </linearGradient>
        </defs>
        <polyline points={points} fill="none" stroke={`url(#line-${title})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((value, index) => (
          <circle key={`${value}-${index}`} cx={(index / Math.max(data.length - 1, 1)) * 100} cy={100 - value} r="2" fill="#fff" />
        ))}
      </svg>
      {labels ? (
        <div className="flex justify-between text-[11px] text-slate-500">
          {labels.map((label, index) => (
            <span key={`${title}-${label}-${index}`}>{label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};
