import _ from "lodash";
import { Action, AddFoodAction, CancelAddFoodAction } from "../actions";
import { AppState, MealState } from "../model/AppState";
import { Meal } from "../model/Food";

function newMealState(): MealState {
  return {
    meal: {
      mealTime: new Date().toLocaleTimeString(),
      foods: [],
    },
    editState: "add",
  };
}

export const INITIAL_STATE: AppState = {
  mealStates: [newMealState()],
};

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

function mealStateReducer(state: MealState, action: { type: string }) {
  switch (action.type) {
    case 'add-food':
      return {
        ...state,
        meal: mealReducer(state.meal, action),
      };
    case 'cancel-add-food':
      const updatedState = _.clone(state);
      _.unset(updatedState, 'editState');
      return updatedState;
    default:
      return state;
  }
}

function updateMealState(mealStates: MealState[], addFoodAction: { type: string; mealIndex: number }) {
  const { mealIndex } = addFoodAction;
  const updatedMealStates = _.clone(mealStates);
  const updatedMeal = mealStateReducer(updatedMealStates[mealIndex], addFoodAction);
  updatedMealStates[mealIndex] = updatedMeal;
  return updatedMealStates;
}

export function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'new-meal':
      return {
        ...state,
        mealStates: [...state.mealStates, newMealState()],
      };
    case 'add-food':
      return {
        ...state,
        mealStates: updateMealState(state.mealStates, action as AddFoodAction)
      };
    case 'cancel-add-food':
      return {
        ...state,
        mealStates: updateMealState(state.mealStates, action as CancelAddFoodAction)
      };
    default:
      return state;
  }
}
