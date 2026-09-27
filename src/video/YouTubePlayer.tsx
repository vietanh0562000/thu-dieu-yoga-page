import { useEffect, useRef, useState } from 'react';
import { useT } from '../i18n';
import type { PlayerProps } from './VideoPlayer';

// Just the slice of the IFrame Player API we use (https://developers.google.com/youtube/iframe_api_reference).
interface YTPlayer {
  getCurrentTime(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      host: string;
      playerVars: Record<string, number>;
      events: { onReady: () => void; onStateChange: (e: { data: number }) => void };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PROGRESS_EVERY_MS = 5000;

let api: Promise<YTNamespace> | undefined;

function loadYouTubeApi() {
  api ??= new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!);
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => {
      api = undefined; // let the next mount retry
      reject(new Error('YouTube IFrame API failed to load'));
    };
    document.head.append(script);
  });
  return api;
}

export function YouTubePlayer({ videoId, title, startAt = 0, onProgress, onEnded }: PlayerProps & { videoId: string }) {
  const { t } = useT();
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  // Latest props, read inside player callbacks so a re-render never rebuilds the player.
  const latest = useRef({ title, startAt, onProgress, onEnded });
  useEffect(() => {
    latest.current = { title, startAt, onProgress, onEnded };
  });

  useEffect(() => {
    let player: YTPlayer | undefined;
    let timer: number | undefined;
    let cancelled = false;
    const wrapper = host.current!;
    setFailed(false);

    loadYouTubeApi().then(
      (YT) => {
        if (cancelled) return;
        // The API replaces its target element with an iframe, so give it one React doesn't own.
        const target = document.createElement('div');
        wrapper.append(target);
        const report = () => player && latest.current.onProgress?.(player.getCurrentTime());
        player = new YT.Player(target, {
          videoId,
          host: 'https://www.youtube-nocookie.com',
          playerVars: { rel: 0, playsinline: 1, start: Math.floor(latest.current.startAt) },
          events: {
            onReady: () => {
              player!.getIframe().title = latest.current.title;
            },
            onStateChange: ({ data }) => {
              window.clearInterval(timer);
              if (data === YT.PlayerState.PLAYING) timer = window.setInterval(report, PROGRESS_EVERY_MS);
              else if (data === YT.PlayerState.PAUSED) report();
              else if (data === YT.PlayerState.ENDED) latest.current.onEnded?.();
            },
          },
        });
      },
      () => !cancelled && setFailed(true),
    );

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      player?.destroy();
      wrapper.replaceChildren();
    };
  }, [videoId]);

  return (
    <div className="video">
      <div ref={host} className="video__frame" />
      {failed && (
        <div className="video__error" role="alert">
          <p>{t('video.error')}</p>
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer">
            {t('video.openYouTube')}
          </a>
        </div>
      )}
    </div>
  );
}
