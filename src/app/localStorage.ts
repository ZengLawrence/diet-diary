import { PageOptions } from "../features/day-page/pageOptionsSlice";
import { DayPage } from "../model/diary";
import { RootState } from "./store";

type DeprecatedDateIndex = Omit<RootState, 'pageOptions' | 'history' > & {
  pageOptions: Omit<PageOptions, 'currentDate'>;
  history: {
    days: DayPage[];
    dateIndex: number;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDeprecatedState(state: any): state is DeprecatedDateIndex {
  return 'pageOptions' in state &&
         'history' in state &&
         'dateIndex' in state.history &&
         typeof state.history.dateIndex === 'number';;
}

function convert(state: DeprecatedDateIndex): RootState {
  return {
    ...state,
    pageOptions: {
      ...state.pageOptions,
      currentDate: "today", // Default to "today" for deprecated states
    },
    history: {
      days: state.history.days,
    },
  };
}

function _loadState(): RootState | null {
  const state = localStorage.getItem('state');
  if (state === null) {
    return null;
  }
  return JSON.parse(state);
}

function loadHistory(): RootState['history'] | null {
  const history = localStorage.getItem('history');
  if (history === null) {
    return null;
  }
  return JSON.parse(history);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  try {
    const state = _loadState();
    if (state === null) {
      return undefined;
    }
    if (isDeprecatedState(state)) {
      return convert(state);
    }
    const history = loadHistory();
    if (history === null) {
      return state;
    }
    state.history = history;
    return state;
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return undefined;
  }
};

function removeHistory(state: RootState): Omit<RootState, 'history'> {
  const { history, ...rest } = state;
  return rest;
}

function saveStateWithOutHistory(state: RootState): void {
  const stateWithoutHistory = removeHistory(state);
  try {
    const serializedState = JSON.stringify(stateWithoutHistory);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

function saveHistory(history: RootState['history']): void {
  try {
    const serializedHistory = JSON.stringify(history);
    localStorage.setItem('history', serializedHistory);
  } catch {
    // ignore write errors
  }
}

export const saveState = (state: RootState) => {
  saveStateWithOutHistory(state);
  saveHistory(state.history);
};