const WORDS_PER_MINUTE = 220;

export function estimateReadingTimeMinutes(markdown: string): number {
  const withoutFences = markdown.replace(/```[\s\S]*?```/g, " ");
  const withoutTags = withoutFences.replace(/<[^>]+>/g, " ");
  const words = withoutTags
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token));
  const minutes = Math.ceil(words.length / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
