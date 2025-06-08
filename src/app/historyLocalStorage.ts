import { RootState } from "./store";

export function loadHistory(): RootState['history'] | undefined {
  const history = localStorage.getItem('history');
  if (history === null) {
    return undefined;
  }
  return JSON.parse(history);
}

export function saveHistory(history: RootState['history']): void {
  try {
    const serializedHistory = JSON.stringify(history);
    localStorage.setItem('history', serializedHistory);
  } catch {
    // ignore write errors
  }
}
