import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

type InputVariant = 'default' | 'filled' | 'ghost';
type InputState = 'default' | 'error' | 'success';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: InputVariant;
  state?: InputState;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default: 'bg-zinc-900 border border-zinc-700',
  filled: 'bg-zinc-800 border border-transparent',
  ghost: 'bg-transparent border border-zinc-700 focus:border-zinc-500',
};

const stateStyles: Record<InputState, string> = {
  default: 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  error: 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500',
  success: 'border-green-500 focus:ring-2 focus:ring-green-500 focus:border-green-500',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, variant = 'default', state = 'default', iconLeft, iconRight, className = '', ...props }, ref) => {
    const id = useId();
    const inputId = props.id || id;
    
    const determinedState = error ? 'error' : props.value ? 'success' : state;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-zinc-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-2.5 rounded-lg text-white placeholder-zinc-500
              transition-all duration-200
              focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
              ${iconLeft ? 'pl-10' : ''}
              ${iconRight ? 'pr-10' : ''}
              ${variantStyles[variant]}
              ${stateStyles[determinedState]}
              ${className}
            `}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-zinc-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    const id = useId();
    const inputId = props.id || id;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-zinc-300 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-lg text-white placeholder-zinc-500
            bg-zinc-900 border border-zinc-700
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-none
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-zinc-500">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';