import _ from "lodash";
import { Action, AddFoodAction, EnterFoodEditModeAction, MealAction, UpdateFoodAction } from "../../actions";
import { MealState } from "../../model/AppState";
import { Meal } from "../../model/Food";

function currentTime() {
  return new Date().toLocaleTimeString();
}

export function newMealState(): MealState {
  return {
    meal: {
      mealTime: currentTime(),
      foods: [],
    },
    editState: "add",
  };
}

function updateFood(meal: Meal, action: UpdateFoodAction) {
  const foods = _.clone(meal.foods);
  foods[action.foodIndex] = action.food;
  return {
    ...meal,
    foods,
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
    case "update-food":
      return updateFood(state, action as UpdateFoodAction);
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

function mealStateReducer(state: MealState, action: Action): MealState {
  switch (action.type) {
    case 'add-food':
    case "update-food":
      return {
        ...state,
        meal: mealReducer(state.meal, action),
      };
    case 'enter-meal-edit-mode':
      return {
        ...state,
        editState: "edit",
      };
    case 'enter-meal-add-mode':
      return {
        ...state,
        editState: "add",
      };
    case 'enter-food-edit-mode':
      const enterFoodEditModeAction = action as EnterFoodEditModeAction;
      return {
        ...state,
        foodEditIndex: enterFoodEditModeAction.foodIndex,
      };
    case 'exit-food-edit-mode':
      const updatedState = _.clone(state);
      _.unset(updatedState, 'foodEditIndex');
      return updatedState;
    case 'cancel-add-food':
    case 'exit-meal-edit-mode':
    case 'exit-edit-mode':
      return clearMealEditStatus(state);
    default:
      return state;
  }
}

function updateMealState(mealStates: MealState[], action: MealAction) {
  const { mealIndex } = action;
  const updatedMealStates = _.clone(mealStates);
  const updatedMeal = mealStateReducer(updatedMealStates[mealIndex], action);
  updatedMealStates[mealIndex] = updatedMeal;
  return updatedMealStates;
}

export function mealStatesReducer(state: MealState[], action: Action) {
  switch (action.type) {
    case 'new-day':
      return [newMealState()];
    case 'new-meal':
      return _.concat(_.map(state, clearMealEditStatus), newMealState());
    case 'delete-meal':
      return _.filter(state, (_, index) => (index !== (action as MealAction).mealIndex));
    default:
      if (_.has(action, 'mealIndex')) {
        return updateMealState(state, action as MealAction);
      } else {
        return state;
      }
  }
}
