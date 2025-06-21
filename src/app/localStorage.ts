import { PageOptions } from "../features/day-page/pageOptionsSlice";
import { DayPage } from "../model/diary";
import { RootState } from "./store";
import { loadHistory, saveHistory } from "./historyLocalStorage";
import { loadToday } from "./todayLocalStorage";

type DeprecatedDateIndex = Omit<RootState, 'pageOptions' | 'history'> & {
  pageOptions: Omit<PageOptions, 'currentDate'>;
  history: {
    days: DayPage[];
    dateIndex: number;
  },
  today: DayPage;
};

type MissingDayPage = Omit<RootState, 'dayPage'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDeprecatedDateIndex(state: any): state is DeprecatedDateIndex {
  return 'pageOptions' in state &&
    'history' in state &&
    'dateIndex' in state.history &&
    typeof state.history.dateIndex === 'number';;
}

function convert(state: DeprecatedDateIndex): MissingDayPage & { history: { days: DayPage[] } } {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMissingDayPage(state: any): state is MissingDayPage {
  return 'dayPage' in state === false;
}

function findHistoryDay(state: { history: { days: DayPage[] } }, date: string): DayPage | undefined {
  return state.history.days.find(day => day.date === date);
}

type MissingProgress = Omit<RootState, 'pageOptions'> & {
  pageOptions: Omit<PageOptions, 'progress'>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMissingProgress(state: any): state is MissingProgress {
  return 'pageOptions' in state && 'progress' in state.pageOptions === false;
}

type MissingHasHistory = Omit<RootState, 'pageOptions'> & {
  pageOptions: Omit<PageOptions, 'hasHistory'>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMissingHasHistory(state: any): state is MissingHasHistory {
  return 'pageOptions' in state && 'hasHistory' in state.pageOptions === false;
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
    const convertedState = convert(state);
    saveHistory(convertedState.history);
    const dayPage = findHistoryDay(convertedState, convertedState.pageOptions.currentDate) || state.today;
    return {...convertedState, dayPage};
  }
  if (isMissingDayPage(state)) {
    const history = loadHistory() || { days: [] };
    const historyDay = findHistoryDay({history}, state.pageOptions.currentDate);
    if (historyDay) {
      state.dayPage = historyDay;
    } else {
      const today = loadToday();
      if (today) {
        state.dayPage = today;
      }
    }
  }

  if (isMissingProgress(state)) {
    state.pageOptions.currentDate = "today";
    const history = loadHistory() || { days: [] };
    const totalDays = history.days.length;
    state.pageOptions.progress = {
      daysRemaining: totalDays,
      totalDays,
    };
  }

  if (isMissingHasHistory(state)) {
    const history = loadHistory() || { days: [] };
    state.pageOptions.hasHistory = history.days.length > 0;
  }

  if (state.pageOptions.currentDate === "today") {
    const today = loadToday();
    if (today) {
      state.dayPage = today;
    }
  }
  return state;
};

function saveReduxState(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

export const saveState = (state: RootState) => {
  saveReduxState(state);
};