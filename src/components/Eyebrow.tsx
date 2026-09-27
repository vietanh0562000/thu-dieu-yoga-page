import type { ReactNode } from 'react';

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return <div className={tone === 'light' ? 'eyebrow eyebrow--light' : 'eyebrow'}>{children}</div>;
}
