import { Icon } from './Icon';

export function PlayButton({ size = 420, onClick }: { size?: number; onClick?: () => void }) {
  const glass = size * 0.915;
  const disc = size * 0.37;
  return (
    <div className="play" style={{ width: size, height: size }}>
      <span className="play__ring" />
      <span className="play__glass" style={{ width: glass, height: glass }} />
      <button type="button" aria-label="Play video" className="play__btn" style={{ width: disc, height: disc }} onClick={onClick}>
        <Icon name="play" set="fill" size={Math.max(16, disc * 0.11)} color="var(--sage-300)" style={{ marginLeft: 3 }} />
      </button>
    </div>
  );
}
