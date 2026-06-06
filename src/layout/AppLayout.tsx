import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Bell,
  Bluetooth,
  ChevronRight,
  Home,
  Menu,
  Moon,
  Radar,
  Search,
  Settings,
  Shield,
  Sun,
  X,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BackToTop } from '../components/BackToTop';
import { ToastHost } from '../components/ToastHost';
import { useSmartBag } from '../context/SmartBagContext';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Dashboard', path: '/dashboard', icon: Activity },
  { label: 'Tracking', path: '/tracking', icon: Radar },
  { label: 'Security', path: '/security', icon: Shield },
  { label: 'BLE', path: '/ble', icon: Bluetooth },
  { label: 'Alerts', path: '/alerts', icon: Bell },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const productLinks = [
  { label: 'Technology', path: '/technology' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { state, updateSettings, searchQuery, setSearchQuery } = useSmartBag();
  const isLight = state.settings.theme === 'light';

  const NavContent = () => (
    <>
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyanblue/30 bg-cyanblue/10 text-cyanblue">
            <Radar size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">SmartBag</p>
            <p className="text-xs text-slate-500">Connect</p>
          </div>
        </Link>
      </div>
      <nav className="mt-8 space-y-1 lg:mt-0 lg:flex lg:items-center lg:gap-1 lg:space-y-0">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-cyanblue text-slate-950' : 'text-slate-300 hover:bg-white/8 hover:text-white'
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-5 flex flex-col gap-3 lg:mt-0 lg:flex-row lg:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search system"
            className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanblue/60 lg:w-44"
          />
        </div>
        <button
          aria-label="Toggle theme"
          onClick={() => updateSettings({ theme: isLight ? 'dark' : 'light' })}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyanblue/40 hover:text-cyanblue"
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-transparent text-white">
      <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4">
        <div className="glass mx-auto hidden max-w-7xl items-center justify-between rounded-xl px-4 py-3 lg:flex">
          <NavContent />
        </div>
        <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-xl px-4 py-3 lg:hidden">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyanblue/30 bg-cyanblue/10 text-cyanblue">
              <Radar size={22} />
            </div>
            <span className="font-semibold">SmartBag Connect</span>
          </Link>
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 text-white">
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 lg:hidden">
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="glass ml-auto h-full w-full max-w-sm p-5"
            >
              <div className="flex justify-end">
                <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg p-2 text-white">
                  <X />
                </button>
              </div>
              <NavContent />
              <div className="mt-6 border-t border-white/10 pt-4">
                {productLinks.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className="flex items-center justify-between py-3 text-slate-300">
                    {item.label}
                    <ChevronRight size={16} />
                  </Link>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pt-24">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}>{children}</motion.div>
        </AnimatePresence>
      </div>

      <footer className="border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-slate-500 md:flex-row md:items-center">
          <p>SmartBag Connect. Student-built smart safety ecosystem.</p>
          <div className="flex flex-wrap gap-4">
            {productLinks.map((item) => (
              <Link key={item.path} to={item.path} className="transition hover:text-cyanblue">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <ToastHost />
      <BackToTop />
    </div>
  );
};
