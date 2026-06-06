import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export const Section = ({ id, eyebrow, title, description, children }: SectionProps) => (
  <section id={id} className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.45 }}
      className="mb-8 max-w-3xl"
    >
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-300">{description}</p> : null}
    </motion.div>
    {children}
  </section>
);
