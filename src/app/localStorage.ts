import { loadCustomTargets, saveCustomTargets } from "./customTargetsLocalStorage";
import { RootState } from "./store";

type SerializedReduxState = RootState | Omit<RootState, 'customTargets'>;

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasCustomTargets(state: any): state is RootState {
  return ('customTargets' in state) 
    && Array.isArray(state.customTargets.targets) 
    && state.customTargets.targets.length > 0;
}

function loadReduxState(): SerializedReduxState | null {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  const state = loadReduxState();
  if (state === null) {
    return undefined;
  }
  if (hasCustomTargets(state)) {
    return state;
  }
  const customTargets = loadCustomTargets();
  if (customTargets) {
    return {
      ...state,
      customTargets,
    };
  }
  return {
    ...state,
    customTargets: {
      targets: [],
    },
  };
}

function removeCustomTargets(state: RootState): Omit<RootState, 'customTargets'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { customTargets: _unused, ...rest } = state;
  return rest;
}

function saveReduxState(state: Omit<RootState, 'customTargets'>): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

export const saveState = (state: RootState) => {
  saveReduxState(removeCustomTargets(state));
  saveCustomTargets(state.customTargets);
};