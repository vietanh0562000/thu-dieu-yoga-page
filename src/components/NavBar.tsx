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
  extra?: ReactNode;
}

export function NavBar({ links, cta, extra }: NavBarProps) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <Wordmark />
      </Link>
      <div className="navbar__links">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="navbar__link">
            {l.label}
          </NavLink>
        ))}
      </div>
      <div className="navbar__actions">
        {extra}
        <Link to={cta.to} className="navbar__cta">{cta.label}</Link>
      </div>
    </nav>
  );
}
