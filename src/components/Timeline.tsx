import { EventLog } from '../context/SmartBagContext';

export const Timeline = ({ items, title = 'Recent Events' }: { items: EventLog[]; title?: string }) => {
  const tone = {
    success: 'bg-emerald-300',
    warning: 'bg-amber-300',
    danger: 'bg-rose-300',
    info: 'bg-cyanblue',
  };

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[auto_1fr] gap-3">
            <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${tone[item.status]}`} />
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-white">{item.label}</p>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
