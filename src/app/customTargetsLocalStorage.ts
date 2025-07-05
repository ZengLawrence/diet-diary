import { RootState } from "./store";

export function loadCustomTargets(): RootState['customTargets'] | undefined {
  try {
    const serializedState = localStorage.getItem('customTargets');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading custom targets from localStorage", e);
    return undefined;
  }
}

export function saveCustomTargets(customTargets: RootState['customTargets']): void {
  try {
    const serializedState = JSON.stringify(customTargets);
    localStorage.setItem('customTargets', serializedState);
  } catch {
    // ignore write errors
  }
}
