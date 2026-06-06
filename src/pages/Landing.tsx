import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { DeviceMockup } from '../components/DeviceMockup';
import { Section } from '../components/Section';
import { features, techStack, team } from '../data/sampleData';

const Landing = () => (
  <main>
    <section className="grid-mask relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanblue/25 bg-cyanblue/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyanblue">
            <Sparkles size={14} />
            Startup-grade safety tech
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">SmartBag Connect</h1>
          <p className="mt-5 max-w-2xl text-xl text-slate-200">The Future of School Safety and Smart Organization</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">Track, protect, and manage your bag through intelligent technology.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/dashboard">
              <Button icon={Rocket}>Launch Dashboard</Button>
            </Link>
            <a href="#features">
              <Button icon={ArrowRight} variant="secondary">
                Explore Features
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
      <DeviceMockup />
    </section>

    <Section id="features" eyebrow="Features" title="Safety, tracking, and organization in one connected bag." description="SmartBag Connect represents a complete smart hardware ecosystem with a premium dashboard experience.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <motion.article key={feature.title} whileHover={{ y: -5 }} className="glass rounded-xl p-5">
            <feature.icon className="text-cyanblue" size={26} />
            <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>

    <Section id="technology" eyebrow="Technology" title="Built around practical embedded hardware." description="The platform is ready for Arduino, RFID, BLE, GPS, ultrasonic, motion, cloud, and future AI integrations.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.slice(0, 8).map((item) => (
          <div key={item.title} className="glass rounded-xl p-5">
            <item.icon className="text-cyanblue" />
            <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section id="how-it-works" eyebrow="Workflow" title="From sensor signal to action in seconds.">
      <div className="grid gap-4 lg:grid-cols-3">
        {['Sense bag activity', 'Verify owner access', 'Notify and recover'].map((step, index) => (
          <div key={step} className="glass rounded-xl p-6">
            <span className="text-sm font-bold text-cyanblue">0{index + 1}</span>
            <h3 className="mt-4 text-xl font-semibold text-white">{step}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {index === 0 && 'BLE, RFID, GPS, motion, and ultrasonic modules stream demo-ready telemetry into the dashboard.'}
              {index === 1 && 'Owner Mode checks RFID authentication and highlights failed attempts instantly.'}
              {index === 2 && 'Alerts, timelines, and recovery actions keep the bag visible and protected.'}
            </p>
          </div>
        ))}
      </div>
    </Section>

    <Section id="team" eyebrow="Team" title="Student-built, startup-presented.">
      <div className="grid gap-4 md:grid-cols-2">
        {team.map((member) => (
          <div key={member.name} className="glass rounded-xl p-6">
            <div className="grid h-16 w-16 place-items-center rounded-xl border border-cyanblue/25 bg-cyanblue/10 text-2xl font-bold text-cyanblue">
              {member.name.charAt(0)}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{member.name}</h3>
            <p className="text-cyanblue">{member.role}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{member.bio}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section id="contact" eyebrow="Contact" title="Ready for demo day and beyond.">
      <div className="glass flex flex-col justify-between gap-6 rounded-xl p-6 md:flex-row md:items-center">
        <div>
          <h3 className="text-2xl font-semibold text-white">See the full control center.</h3>
          <p className="mt-2 text-slate-400">Explore dashboards, alerts, analytics, BLE control, and settings.</p>
        </div>
        <Link to="/contact">
          <Button icon={ExternalLink}>Open Contact</Button>
        </Link>
      </div>
    </Section>
  </main>
);

export default Landing;
