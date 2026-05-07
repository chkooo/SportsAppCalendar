import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold dark:bg-blue-500 dark:hover:bg-blue-600',
  secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white font-medium dark:bg-zinc-600 dark:hover:bg-zinc-500',
  danger: 'bg-red-500 hover:bg-red-600 text-white font-semibold',
  success: 'bg-green-500 hover:bg-green-600 text-white font-semibold',
  ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-300 hover:text-white dark:hover:text-white',
  outline: 'bg-transparent border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white dark:hover:text-white',
  accent: 'bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 rounded-lg transition-all
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 dark:focus:ring-offset-zinc-900 focus:ring-offset-white
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          active:scale-[0.98]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';