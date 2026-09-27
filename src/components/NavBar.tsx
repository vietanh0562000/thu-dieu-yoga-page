import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { Wordmark } from './Wordmark';

export interface NavItem {
  to: string;
  label: string;
}

interface NavBarProps {
  links: NavItem[];
  cta: NavItem;
  /** rendered before the CTA, e.g. a language switch */
  extra?: ReactNode;
}

export function NavBar({ links, cta, extra }: NavBarProps) {
  return (
    <nav className="navbar">
      <Link to="/" className="glass navbar__brand">
        <Wordmark />
      </Link>
      <div className="glass navbar__links">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="navbar__link">
            {l.label}
          </NavLink>
        ))}
      </div>
      <div className="navbar__actions">
        {extra}
        <Link to={cta.to} className="btn btn--dark btn--md">{cta.label}</Link>
      </div>
    </nav>
  );
}
