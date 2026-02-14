// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isFeatureFlagEnabled(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}
