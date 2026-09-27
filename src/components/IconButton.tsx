import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconSet } from './Icon';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon?: string;
  iconSet?: IconSet;
  variant?: 'dark' | 'glass' | 'light';
  size?: number;
}

export function IconButton({ label, icon = 'arrow-right', iconSet = 'regular', variant = 'dark', size = 58, className = '', style, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`icon-btn icon-btn--${variant} ${className}`}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <Icon name={icon} set={iconSet} size={Math.round(size * 0.38)} />
    </button>
  );
}
