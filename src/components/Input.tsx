import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

/** glass sits on photography, light on paper */
type Tone = 'glass' | 'light';

/** Set aria-invalid to show the error state. */
export function Input({ tone = 'glass', className = '', ...rest }: InputHTMLAttributes<HTMLInputElement> & { tone?: Tone }) {
  return <input className={`input input--${tone} ${className}`} {...rest} />;
}

export function Textarea({ tone = 'glass', className = '', rows = 4, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { tone?: Tone }) {
  return <textarea rows={rows} className={`input input--${tone} input--multiline ${className}`} {...rest} />;
}
