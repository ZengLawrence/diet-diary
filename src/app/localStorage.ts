import { PageOptions } from "../features/day-page/pageOptionsSlice";
import { RootState } from "./store";

type DeprecatedState = Omit<RootState, 'pageOptions' > & {
  pageOptions: Omit<PageOptions, 'currentDate'>;
};

function isDeprecatedState(state: any): state is DeprecatedState {
  return 'pageOptions' in state && 'currentDate' in state.pageOptions;
}

function convert(state: DeprecatedState): RootState {
  return {
    ...state,
    pageOptions: {
      ...state.pageOptions,
      currentDate: "today", // Default to "today" for deprecated states
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    if (isDeprecatedState(state)) {
      return convert(state);
    }
    return state;
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};