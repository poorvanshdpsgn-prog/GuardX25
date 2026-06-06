import { Bell, Contact, RotateCcw, Settings2, User } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/Button';
import { useSmartBag } from '../context/SmartBagContext';

const Settings = () => {
  const { state, updateSettings, simulate } = useSmartBag();
  const [form, setForm] = useState(state.settings);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    updateSettings(form);
  };

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">Settings</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Profile and device configuration</h1>
        <form onSubmit={submit} className="mt-8 grid gap-6">
          <div className="glass rounded-xl p-5">
            <div className="mb-5 flex items-center gap-3">
              <User className="text-cyanblue" />
              <h3 className="text-lg font-semibold text-white">Owner Information</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyanblue/60" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} placeholder="Owner name" />
              <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyanblue/60" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" />
              <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyanblue/60" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} placeholder="Emergency contact" />
              <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyanblue/60" value={form.bagName} onChange={(e) => setForm({ ...form, bagName: e.target.value })} placeholder="Bag name" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <div className="mb-5 flex items-center gap-3">
                <Settings2 className="text-cyanblue" />
                <h3 className="text-lg font-semibold text-white">Device Settings</h3>
              </div>
              {[
                ['ownerMode', 'Owner Mode'],
                ['autoLock', 'Auto Lock'],
                ['notifications', 'Notifications'],
              ].map(([key, label]) => (
                <label key={key} className="mb-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-white">
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(form[key as keyof typeof form])}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    className="h-5 w-5 accent-cyanblue"
                  />
                </label>
              ))}
            </div>
            <div className="glass rounded-xl p-5">
              <div className="mb-5 flex items-center gap-3">
                <Bell className="text-cyanblue" />
                <h3 className="text-lg font-semibold text-white">Theme Settings</h3>
              </div>
              <select
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyanblue/60"
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value as 'dark' | 'light' })}
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <Contact size={16} />
                Emergency contact receives future alert integrations.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit">Save Settings</Button>
            <Button type="button" variant="danger" icon={RotateCcw} onClick={() => simulate('deviceRecovery')}>
              Reset Device
            </Button>
          </div>
        </form>
      </section>
    </AnimatedPage>
  );
};

export default Settings;
