import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// Pull the function out of the TS file (it has no type-only syntax in its body) and run it.
const src = readFileSync(new URL("../src/video/source.ts", import.meta.url), 'utf8');
const body = src.slice(src.indexOf('export function parseYouTubeId')).replace('export function parseYouTubeId(input: string): string | null', 'function parseYouTubeId(input)');
const parseYouTubeId = new Function(body + '; return parseYouTubeId;')();
const id = 'M7lc1UVf-VE';
for (const input of [id, ` ${id} `, `https://www.youtube.com/watch?v=${id}`, `https://youtube.com/watch?feature=share&v=${id}&t=30`, `https://youtu.be/${id}?si=abc`, `https://www.youtube-nocookie.com/embed/${id}`, `https://youtube.com/shorts/${id}`, `https://www.youtube.com/live/${id}`])
  assert.equal(parseYouTubeId(input), id, input);
for (const bad of ['', 'hello', 'https://vimeo.com/123456789', `https://youtube.com/watch?v=${id}X`])
  assert.equal(parseYouTubeId(bad), null, bad);
console.log('parseYouTubeId: all checks passed');
