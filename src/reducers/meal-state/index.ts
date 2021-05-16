import _ from "lodash";
import { Action, AddFoodAction, EnterFoodEditModeAction, MealAction, UpdateFoodAction } from "../../actions";
import { MealEditState, MealState } from "../../model/AppState";
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

function editStateReducer(state: MealEditState, action: Action): MealEditState {
  switch (action.type) {
    case 'enter-meal-edit-mode':
      return "edit";
    case 'enter-meal-add-mode':
      return "add";
    case 'new-meal':
    case 'exit-meal-edit-mode':
    case 'cancel-add-food':
    case 'exit-edit-mode':
      return undefined;
    default:
      return state;
  }
}

function foodEditIndexReducer(state: number | undefined, action: Action) {
  switch (action.type) {
    case 'enter-food-edit-mode':
      return (action as EnterFoodEditModeAction).foodIndex;
    case 'exit-food-edit-mode':
      return undefined;
    default:
      return state;
  }
}

function mealStateReducer(state: MealState, action: Action): MealState {
  return {
    meal: mealReducer(state.meal, action),
    editState: editStateReducer(state.editState, action),
    foodEditIndex: foodEditIndexReducer(state.foodEditIndex, action),
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
      return _.concat(_.map(state, mealState => mealStateReducer(mealState, action)), newMealState());
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
