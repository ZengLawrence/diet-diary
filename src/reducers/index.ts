import _ from "lodash";
import { Action, AddFoodAction } from "../actions";
import { AppState, MealState } from "../model/AppState";
import { Food, Meal } from "../model/Food";

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

function mealReducer(state: Meal, action: { type: string; food: Food; }) {
  switch (action.type) {
    case 'add-food':
      return {
        ...state,
        foods: [...state.foods, action.food],
      };
    default:
      return state;
  }
}

function mealStateReducer(state: MealState, action: { type: string }) {
  switch (action.type) {
    case 'add-food':
      const addFoodAction = action as AddFoodAction;
      return {
        ...state,
        meal: mealReducer(state.meal, addFoodAction),
      };
    default:
      return state;
  }
}

export function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'new-meal':
      return {
        ...state,
        mealStates: [...state.mealStates, newMealState()],
      };
    case 'add-food':
      const addFoodAction = action as AddFoodAction;
      const { mealIndex } = addFoodAction;
      const mealStates = _.clone(state.mealStates);
      const updatedMeal = mealStateReducer(mealStates[mealIndex], addFoodAction);
      mealStates[mealIndex] = updatedMeal;
      return {
        ...state,
        mealStates
      };
    default:
      return state;
  }
}
