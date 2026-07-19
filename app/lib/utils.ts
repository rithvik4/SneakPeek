export function formatRating(value: number) {
  return `${value.toFixed(1)} / 5`;
}

export function chapterNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}
