import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-lg border border-cyanblue/30 bg-cyanblue text-slate-950 shadow-glow transition hover:bg-white"
    >
      <ArrowUp size={18} />
    </button>
  );
};
