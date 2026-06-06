import { motion } from 'framer-motion';
import { Bluetooth, Fingerprint, MapPinned, ShieldCheck } from 'lucide-react';
import { useSmartBag } from '../context/SmartBagContext';
import { StatusPill } from './StatusPill';

export const DeviceMockup = () => {
  const { state } = useSmartBag();

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="glass absolute inset-8 rounded-[2rem] border-cyanblue/25 p-6"
      >
        <div className="mx-auto h-8 w-28 rounded-b-3xl bg-black/60" />
        <div className="mt-10 rounded-2xl border border-white/12 bg-black/45 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-cyanblue">SmartBag OS</p>
          <h3 className="mt-3 text-3xl font-semibold">{state.settings.bagName}</h3>
          <p className="mt-2 text-sm text-slate-400">{state.currentLocation}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            [Bluetooth, state.bleStatus],
            [ShieldCheck, state.securityStatus],
            [Fingerprint, state.ownerAuthentication],
            [MapPinned, `${state.battery}%`],
          ].map(([Icon, label]) => (
            <div key={String(label)} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <Icon className="text-cyanblue" size={20} aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-white">{String(label)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <StatusPill label={`${state.securityScore}% security score`} tone={state.securityStatus === 'Secure' ? 'good' : 'bad'} />
        </div>
      </motion.div>
    </div>
  );
};
