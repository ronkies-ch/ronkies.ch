import { stripHtml } from 'string-strip-html';

export function getExcerpt(html: string, maxChars = 150): string {
  const stripped = stripHtml(html).result;  // strip all tags
  if (stripped.length <= maxChars) {
    return stripped;
  }
  return stripped.slice(0, maxChars) + '…';
}