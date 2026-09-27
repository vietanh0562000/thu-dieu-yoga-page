import type { ReactNode } from 'react';
import { Icon } from './Icon';

export function ContactChip({ icon, href, children }: { icon: string; href: string; children: ReactNode }) {
  return (
    <a href={href} className="contact-chip">
      <span className="contact-chip__icon">
        <Icon name={icon} set="fill" size={22} color="var(--white)" />
      </span>
      {children}
    </a>
  );
}
