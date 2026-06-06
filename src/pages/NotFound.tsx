import { Link } from 'react-router-dom';
import { AnimatedPage } from '../components/AnimatedPage';
import { Button } from '../components/Button';

const NotFound = () => (
  <AnimatedPage>
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyanblue">404</p>
        <h1 className="mt-3 text-5xl font-semibold text-white">Signal not found</h1>
        <p className="mt-4 text-slate-400">This SmartBag route is not available. Return to the command center.</p>
        <Link to="/dashboard" className="mt-8 inline-block">
          <Button>Open Dashboard</Button>
        </Link>
      </div>
    </section>
  </AnimatedPage>
);

export default NotFound;
