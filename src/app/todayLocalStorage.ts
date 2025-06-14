import { RootState } from "./store";

export function loadToday(): RootState['today'] | undefined {
  try {
    const serializedState = localStorage.getItem('today');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading today from localStorage", e);
    return undefined;
  }
}

export function saveToday(state: RootState['today']): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('today', serializedState);
  } catch {
    // ignore write errors
  }
}
