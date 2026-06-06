type StatusPillProps = {
  label: string;
  tone?: 'good' | 'warn' | 'bad' | 'info';
};

export const StatusPill = ({ label, tone = 'info' }: StatusPillProps) => {
  const tones = {
    good: 'bg-emerald-400/12 text-emerald-200 ring-emerald-300/30',
    warn: 'bg-amber-400/12 text-amber-200 ring-amber-300/30',
    bad: 'bg-rose-400/12 text-rose-200 ring-rose-300/30',
    info: 'bg-cyanblue/12 text-cyan-100 ring-cyanblue/30',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-glow" />
      {label}
    </span>
  );
};
