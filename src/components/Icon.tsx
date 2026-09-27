import type { CSSProperties } from 'react';

const PHOSPHOR = 'https://unpkg.com/@phosphor-icons/core@2.1.1/assets/';
const SIMPLE_ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';

export type IconSet = 'regular' | 'fill' | 'brand';

function iconUrl(name: string, set: IconSet) {
  if (set === 'brand') return `${SIMPLE_ICONS}${name}.svg`;
  if (set === 'fill') return `${PHOSPHOR}fill/${name}-fill.svg`;
  return `${PHOSPHOR}regular/${name}.svg`;
}

interface IconProps {
  name: string;
  set?: IconSet;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

/** Glyph drawn as a CSS mask, so it takes any colour. */
export function Icon({ name, set = 'regular', size = 20, color = 'currentColor', style }: IconProps) {
  const mask = `url(${iconUrl(name, set)}) center/contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      style={{ display: 'inline-block', flex: 'none', width: size, height: size, backgroundColor: color, WebkitMask: mask, mask, ...style }}
    />
  );
}
