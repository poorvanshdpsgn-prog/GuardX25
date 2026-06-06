import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useSmartBag } from '../context/SmartBagContext';

export const ToastHost = () => {
  const { toasts, removeToast } = useSmartBag();

  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => removeToast(toasts.length - 1), 3200);
    return () => window.clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="fixed right-4 top-24 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={`${toast}-${index}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass flex min-w-64 items-center gap-3 rounded-lg px-4 py-3 text-sm text-white"
          >
            <CheckCircle2 className="text-cyanblue" size={18} />
            {toast}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
