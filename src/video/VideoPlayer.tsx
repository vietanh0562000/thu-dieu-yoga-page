import type { VideoSource } from './source';
import { YouTubePlayer } from './YouTubePlayer';
import './video.css';

export interface PlayerProps {
  /** used as the iframe title for screen readers */
  title: string;
  /** seconds to start from; read once per video */
  startAt?: number;
  /** current position in seconds, every few seconds while playing and on pause */
  onProgress?: (seconds: number) => void;
  onEnded?: () => void;
}

export function VideoPlayer({ source, ...props }: PlayerProps & { source: VideoSource }) {
  switch (source.provider) {
    case 'youtube':
      return <YouTubePlayer videoId={source.videoId} {...props} />;
  }
}
