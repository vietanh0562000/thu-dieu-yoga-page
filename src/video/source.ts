/**
 * Where a lesson's video lives. The app only ever passes a VideoSource to <VideoPlayer>,
 * so changing host means touching this folder and the `lesson_videos` table, nothing else.
 *
 * To add Bunny Stream:
 *   1. Allow 'bunny' in `lesson_videos.provider`; `video_ref` holds the Bunny video GUID.
 *   2. Add `{ provider: 'bunny'; embedUrl: string }` to VideoSource. In resolveVideoSource, fetch the
 *      signed embed URL from a Supabase Edge Function (the Bunny token key must stay on the server).
 *   3. Add BunnyPlayer.tsx with the same props as YouTubePlayer (Bunny's embed speaks player.js for
 *      timeupdate/ended), then add its case to VideoPlayer.
 * Lessons can move over one at a time, since each row names its own provider.
 */

/** A row of `lesson_videos`; RLS only returns it to users allowed to watch the lesson. */
export interface LessonVideoRow {
  provider: 'youtube';
  video_ref: string;
}

export type VideoSource = { provider: 'youtube'; videoId: string };

/** Async because hosts with signed URLs (Bunny) need a server round trip. */
export async function resolveVideoSource(row: LessonVideoRow): Promise<VideoSource> {
  switch (row.provider) {
    case 'youtube':
      return { provider: 'youtube', videoId: row.video_ref };
  }
}
