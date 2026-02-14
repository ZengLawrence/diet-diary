// @ts-expect-error: individual feature flag should be exported as function for consistency
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _isFeatureFlagEnabled(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}
