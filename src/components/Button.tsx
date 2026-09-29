import type { ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';

type Variant = 'primary' | 'dark' | 'light' | 'tint' | 'outline' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

const ICON_SIZE: Record<Size, number> = { sm: 17, md: 18, lg: 22 };

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: string;
  iconRight?: string;
}

export function Button({ variant = 'primary', size = 'md', fullWidth, icon, iconRight, className = '', type = 'button', children, ...rest }: ButtonProps) {
  const classes = `btn btn--${variant} btn--${size}${fullWidth ? ' btn--full' : ''} btn-smooth ${className}`;
  return (
    <button type={type} className={classes} {...rest}>
      {icon && <Icon name={icon} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </button>
  );
}
