import _ from "lodash";
import { Action, EnterFoodEditModeAction, MealAction } from "../../actions";
import { MealEditState, MealState, newMealState } from "../../model/MealState";
import { mealReducer } from "./mealReducer";

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

function updateMealState(mealState: MealState, index: number, action: MealAction) {
  if (index === action.mealIndex) {
    return mealStateReducer(mealState, action);
  } else {
    return mealState;
  }
}

export function mealStatesReducer(state: MealState[] = [newMealState()], action: Action) {
  switch (action.type) {
    case 'new-day':
      return [newMealState()];
    case 'new-meal':
      return _.concat(_.map(state, mealState => mealStateReducer(mealState, action)), newMealState());
    case 'delete-meal':
      return _.filter(state, (_, index) => (index !== (action as MealAction).mealIndex));
    default:
      if (_.has(action, 'mealIndex')) {
        return _.map(state, (mealState, index) => updateMealState(mealState, index, action as MealAction));
      } else {
        return _.map(state, mealState => mealStateReducer(mealState, action));
      }
  }
}
