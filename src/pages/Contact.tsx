import { Mail, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/Button';
import { useSmartBag } from '../context/SmartBagContext';

const Contact = () => {
  const { addToast } = useSmartBag();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Use a valid email.';
    if (form.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    addToast('Message validated for demo');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <AnimatedPage>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Talk to SmartBag Connect</h1>
          <p className="mt-4 leading-7 text-slate-400">A polished contact flow with validation for demos, pitches, and future deployment inquiries.</p>
          <div className="glass mt-6 rounded-xl p-5">
            <Mail className="text-cyanblue" />
            <p className="mt-4 text-white">demo@smartbagconnect.dev</p>
            <p className="mt-2 text-sm text-slate-400">Future investor, school, and guardian contact channel.</p>
          </div>
        </div>
        <form onSubmit={submit} className="glass rounded-xl p-6">
          {[
            ['name', 'Name', 'text'],
            ['email', 'Email', 'email'],
          ].map(([key, label, type]) => (
            <label key={key} className="mb-5 block">
              <span className="text-sm text-slate-300">{label}</span>
              <input
                value={form[key as keyof typeof form]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                type={type}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyanblue/60"
              />
              {errors[key] ? <span className="mt-1 block text-sm text-rose-300">{errors[key]}</span> : null}
            </label>
          ))}
          <label className="mb-5 block">
            <span className="text-sm text-slate-300">Message</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              rows={7}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyanblue/60"
            />
            {errors.message ? <span className="mt-1 block text-sm text-rose-300">{errors.message}</span> : null}
          </label>
          <Button icon={Send} type="submit">
            Send Message
          </Button>
        </form>
      </section>
    </AnimatedPage>
  );
};

export default Contact;
