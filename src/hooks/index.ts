export function useFeatureFlag(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}