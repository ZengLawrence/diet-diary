import type { CustomTargetsLoader, CustomTargetsSaver } from "../model/customTarget";
import type { Target } from "../model/Target";

interface SerializedCustomTargets {
  targets: Target[];
}

function loadCustomTargets(): SerializedCustomTargets | undefined {
  try {
    const serializedState = localStorage.getItem('customTargets');
    if (serializedState === null) {
      return undefined;
    }
    const customTargets: SerializedCustomTargets = JSON.parse(serializedState);
    return customTargets;
  } catch (e) {
    console.error("Error loading custom targets from localStorage", e);
    return undefined;
  }
}

function saveCustomTargets(customTargets: SerializedCustomTargets): void {
  try {
    const serializedState = JSON.stringify(customTargets);
    localStorage.setItem('customTargets', serializedState);
  } catch {
    // ignore write errors
  }
}

export class CustomTargetsLocalStorage implements CustomTargetsLoader, CustomTargetsSaver {
  load(): Target[] {
    const customTargets = loadCustomTargets();
    if (!customTargets) {
      return [];
    }
    return customTargets.targets;
  }

  save(targets: Target[]): void {
    saveCustomTargets({ targets });
  }
}

export const customTargetsLocalStorage = new CustomTargetsLocalStorage();
