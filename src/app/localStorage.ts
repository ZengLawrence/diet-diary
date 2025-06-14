import { PageOptions } from "../features/day-page/pageOptionsSlice";
import { DayPage } from "../model/diary";
import { RootState } from "./store";
import { loadHistory, saveHistory } from "./historyLocalStorage";
import { loadToday, saveToday } from "./todayLocalStorage";

type DeprecatedDateIndex = Omit<RootState, 'pageOptions' | 'history'> & {
  pageOptions: Omit<PageOptions, 'currentDate'>;
  history: {
    days: DayPage[];
    dateIndex: number;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDeprecatedDateIndex(state: any): state is DeprecatedDateIndex {
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

function _loadState(): RootState | DeprecatedDateIndex | null {
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
  const state = _loadState();
  if (state === null) {
    return undefined;
  }
  if (isDeprecatedDateIndex(state)) {
    return convert(state);
  }
  const history = loadHistory();
  if (history === undefined) {
    return state;
  }
  state.history = history;
  const today = loadToday();
  if (today === undefined) {
    return state;
  }
  state.today = today;
  return state;
};

type RootStateWithoutHistory = Omit<RootState, 'history'>;

function removeHistory(state: RootState): RootStateWithoutHistory {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { history: _unused, ...rest } = state;
  return rest;
}

type ReduxState = Omit<RootStateWithoutHistory, 'today'>;

function removeToday(state: RootStateWithoutHistory): ReduxState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { today: _unused, ...rest } = state;
  return rest;
}

function reduxState(state: RootState): ReduxState {
  return removeToday(removeHistory(state));
}

function saveReduxState(state: ReduxState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

export const saveState = (state: RootState) => {
  saveReduxState(reduxState(state));
  saveHistory(state.history);
  saveToday(state.today);
};