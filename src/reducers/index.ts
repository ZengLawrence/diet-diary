import _ from "lodash";
import { Action, AddFoodAction } from "../actions";
import { AppState } from "../model/AppState";
import { Food, Meal } from "../model/Food";

function newMeal(): Meal {
  return {
    mealTime: new Date().toLocaleTimeString(),
    foods: [],
  };
}

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

export function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'new-meal':
      return {
        ...state,
        meals: [...state.meals, newMeal()],
        editState: "add"
      };
    case 'add-food':
      const addFoodAction = action as AddFoodAction;
      const { mealIndex } = addFoodAction;
      const meals = _.clone(state.meals);
      const updatedMeal = mealReducer(meals[mealIndex], addFoodAction);
      meals[mealIndex] = updatedMeal;
      return {
        ...state,
        meals
      };
    default:
      return state;
  }
}
