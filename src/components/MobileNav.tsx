import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { Icon } from './Icon';
import type { NavItem } from './NavBar';
import { Wordmark } from './Wordmark';

interface MobileNavProps {
  links: NavItem[];
  cta: NavItem;
  extra?: ReactNode;
  menuLabel?: string;
  defaultOpen?: boolean;
}

export function MobileNav({ links, cta, extra, menuLabel = 'Menu', defaultOpen = false }: MobileNavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const close = () => setOpen(false);
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav__bar">
        <Link to="/" className="mobile-nav__brand" onClick={close}>
          <Wordmark scale={0.9} />
        </Link>
        <button type="button" className="mobile-nav__toggle" aria-label={menuLabel} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? 'x' : 'list'} size={22} />
        </button>
      </div>
      {open && (
        <div className="mobile-nav__sheet">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="mobile-nav__link" onClick={close}>
              {l.label}
            </NavLink>
          ))}
          {extra}
          <Link to={cta.to} className="mobile-nav__cta" onClick={close}>
            {cta.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
