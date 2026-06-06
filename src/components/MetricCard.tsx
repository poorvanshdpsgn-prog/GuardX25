import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { StatusPill } from './StatusPill';

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  detail?: string;
  tone?: 'good' | 'warn' | 'bad' | 'info';
  progress?: number;
};

export const MetricCard = ({ title, value, icon: Icon, detail, tone = 'info', progress }: MetricCardProps) => (
  <motion.article
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    className="glass aurora-border rounded-xl p-5"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{value}</h3>
      </div>
      <div className="rounded-lg border border-cyanblue/20 bg-cyanblue/10 p-3 text-cyanblue">
        <Icon size={22} aria-hidden="true" />
      </div>
    </div>
    {detail ? <p className="mt-4 text-sm text-slate-300">{detail}</p> : null}
    <div className="mt-5 flex items-center justify-between gap-3">
      <StatusPill label={String(value)} tone={tone} />
      {typeof progress === 'number' ? (
        <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-cyanblue"
          />
        </div>
      ) : null}
    </div>
  </motion.article>
);
