import type { CSSProperties } from 'react';
import { Icon } from './Icon';

interface PlayButtonProps {
  /** px, or any CSS length such as 'min(590px, 70vw)' */
  size?: number | string;
  label?: string;
  onClick?: () => void;
}

export function PlayButton({ size = 420, label = 'Play video', onClick }: PlayButtonProps) {
  const style = { '--play-size': typeof size === 'number' ? `${size}px` : size } as CSSProperties;
  return (
    <div className="play" style={style}>
      <span className="play__ring" />
      <span className="play__glass" />
      <button type="button" aria-label={label} className="play__btn" onClick={onClick}>
        <Icon name="play" set="fill" size="max(16px, calc(var(--play-size) * .04))" color="var(--sage-300)" style={{ marginLeft: 3 }} />
      </button>
    </div>
  );
}
