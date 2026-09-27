import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** glass sits on photography, light on paper */
  tone?: 'glass' | 'light';
}

/** Set aria-invalid to show the error state. */
export function Input({ tone = 'glass', className = '', ...rest }: InputProps) {
  return <input className={`input input--${tone} ${className}`} {...rest} />;
}
