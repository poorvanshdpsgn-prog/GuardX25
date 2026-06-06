import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const AnimatedPage = ({ children }: { children: ReactNode }) => (
  <motion.main
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 18 }}
    transition={{ duration: 0.38, ease: 'easeOut' }}
    className="min-h-screen"
  >
    {children}
  </motion.main>
);
