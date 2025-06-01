import { Meal } from "../model/Food";
import { Gender, Target } from "../model/Target";
import { RootState } from "./store";

type DeprecatedTargetState = {
  target: Target;
  gender: Gender;
  unlimitedFruit: boolean;
};

type DeprecatedRootState = Pick<RootState,
  'editMode' | 'summaryType' | 'savedMeals' | 'showSavedMeals' | 'warning' | 'savedMealState' | 'customTargets' |
  'history' | 'pageOptions'> & { date: string; mealStates: { meal: Meal }[]; targetState: DeprecatedTargetState };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDeprecatedState(state: any): state is DeprecatedRootState {
  return state && typeof state === 'object' &&
    'editMode' in state &&
    'summaryType' in state &&
    'savedMeals' in state &&
    'showSavedMeals' in state &&
    'warning' in state &&
    'savedMealState' in state &&
    'customTargets' in state &&
    'history' in state &&
    'pageOptions' in state &&
    'date' in state &&
    'mealStates' in state &&
    'targetState' in state &&
    'target' in state.targetState &&   
    'unlimitedFruit' in state.targetState && 
    'gender' in state.targetState;
}

function convert(state: DeprecatedRootState): RootState {
  const convertedState = {
    summaryType: state.summaryType,
    editMode: state.editMode,
    targetState: {
      gender: state.targetState.gender,
    },
    savedMeals: state.savedMeals,
    showSavedMeals: state.showSavedMeals,
    warning: state.warning,
    savedMealState: state.savedMealState,
    customTargets: state.customTargets,
    history: state.history,
    pageOptions: state.pageOptions,
    today: {
      date: state.date,
      target: {
        ...state.targetState.target,
        unlimitedFruit: state.targetState.unlimitedFruit,
      },
      meals: state.mealStates.map(ms => ms.meal),
    },
  };
  return convertedState;
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