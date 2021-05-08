import _ from "lodash";
import { Action, AddFoodAction, FoodAction, MealAction } from "../actions";
import { AppState, MealState } from "../model/AppState";
import { Meal } from "../model/Food";

function currentTime() {
  return new Date().toLocaleTimeString();
}

function newMealState(): MealState {
  return {
    meal: {
      mealTime: currentTime(),
      foods: [],
    },
    editState: "add",
  };
}

function deleteMeal(state: AppState, action: MealAction) {
  const mealIndexToDelete = action.mealIndex;
  const mealStates = _.filter(state.mealStates, (_, index) => (index !== mealIndexToDelete));
  return {
    ...state,
    mealStates,
  }
}

function today() {
  return new Date().toLocaleDateString();
}

export function initialState(): AppState {
  return {
    date: today(),
    mealStates: [newMealState()],
    editMode: true,
  };
}

function mealReducer(state: Meal, action: Action) {
  switch (action.type) {
    case 'add-food':
      const addFoodAction = action as AddFoodAction;
      return {
        ...state,
        foods: [...state.foods, addFoodAction.food],
      };
    default:
      return state;
  }
}

function clearMealEditStatus(state: MealState) {
  if (state.editState) {
    const updatedState = _.clone(state);
    _.unset(updatedState, 'editState');
    return updatedState;
  } else {
    return state;
  }
}

function mealStateReducer(state: MealState, action: { type: string }) {
  switch (action.type) {
    case 'add-food':
      return {
        ...state,
        meal: mealReducer(state.meal, action),
      };
    case 'cancel-add-food':
    case 'exit-edit-mode':
      return clearMealEditStatus(state);
    default:
      return state;
  }
}

function updateMealState(mealStates: MealState[], foodAction: FoodAction) {
  const { mealIndex } = foodAction;
  const updatedMealStates = _.clone(mealStates);
  const updatedMeal = mealStateReducer(updatedMealStates[mealIndex], foodAction);
  updatedMealStates[mealIndex] = updatedMeal;
  return updatedMealStates;
}

function clearMealEditState(mealStates: MealState[], action: Action) {
  return _.map(mealStates, state => mealStateReducer(state, action));
}

export function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'new-day':
      return initialState();
    case 'new-meal':
      return {
        ...state,
        mealStates: _.concat(_.map(state.mealStates, clearMealEditStatus), newMealState()),
      };
    case 'delete-meal':
      return deleteMeal(state, action as MealAction);
    case 'enter-edit-mode':
      return {
        ...state,
        editMode: true,
      }
    case 'exit-edit-mode':
      return {
        ...state,
        editMode: false,
        mealStates: clearMealEditState(state.mealStates, action),
      }
    case 'add-food':
    case 'cancel-add-food':
      return {
        ...state,
        mealStates: updateMealState(state.mealStates, action as FoodAction)
      };
    default:
      return state;
  }
}
