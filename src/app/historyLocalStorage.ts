import { RootState } from "./store";

export function loadHistory(): RootState['history'] | null {
  const history = localStorage.getItem('history');
  if (history === null) {
    return null;
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
