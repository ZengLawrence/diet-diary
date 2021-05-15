import _ from "lodash";
import { Action, AddFoodAction, EnterFoodEditModeAction, MealAction, UpdateFoodAction } from "../actions";
import { AppState, MealState } from "../model/AppState";
import { Meal } from "../model/Food";
import { DEFAULT_GOAL } from "../model/Goal";

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
    goal: DEFAULT_GOAL,
  };
}

function updateFood(meal: Meal, action: UpdateFoodAction) {
  const foods = _.clone(meal.foods);
  foods[action.foodIndex] = action.food;
  return {
    ...meal,
    foods,
  }
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
      const updatedState = _.clone(state)
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
    case 'enter-meal-edit-mode':
    case 'enter-meal-add-mode':
    case 'exit-meal-edit-mode':
    case 'enter-food-edit-mode':
    case 'exit-food-edit-mode':
    case 'add-food':
    case 'cancel-add-food':
    case 'update-food':
      return {
        ...state,
        mealStates: updateMealState(state.mealStates, action as MealAction),
      };
    default:
      return state;
  }
}
