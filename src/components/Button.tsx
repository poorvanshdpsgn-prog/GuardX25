import { LucideIcon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button = ({ children, className = '', icon: Icon, variant = 'primary', ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-cyanblue text-slate-950 shadow-glow hover:bg-white',
    secondary: 'border border-white/15 bg-white/8 text-white hover:border-cyanblue/60 hover:bg-cyanblue/10',
    danger: 'border border-rose-400/40 bg-rose-500/15 text-rose-100 hover:bg-rose-500/25',
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={17} aria-hidden="true" /> : null}
      {children}
    </button>
  );
};
