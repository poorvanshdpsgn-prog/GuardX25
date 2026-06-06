import { motion } from 'framer-motion';
import { AnimatedPage } from '../components/AnimatedPage';
import { techStack } from '../data/sampleData';

const Technology = () => (
  <AnimatedPage>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Technology</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-white">Premium hardware showcase for a future-ready smart bag.</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -5 }}
            className="glass rounded-xl p-5"
          >
            <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyanblue/25 bg-cyanblue/10 text-cyanblue">
              <item.icon />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
          </motion.article>
        ))}
      </div>
      <div className="glass mt-8 rounded-xl p-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyanblue">Product showcase</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {['Device render placeholder', 'Dashboard preview placeholder', 'Mobile app roadmap placeholder'].map((item) => (
            <div key={item} className="grid aspect-video place-items-center rounded-xl border border-dashed border-cyanblue/30 bg-white/5 text-sm text-slate-400">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  </AnimatedPage>
);

export default Technology;
