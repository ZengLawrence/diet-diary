import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { Food, Meal, newMeal } from "../../model/Food";
import { newDay } from "./dateSlice";
import { exitEditMode } from "./editModeSlice";

export type MealEditState = "add" | "edit" | undefined;

export interface MealState {
  meal: Meal;
  editState?: MealEditState;
  foodEditIndex?: number;
}

function newMealState(): MealState {
  return {
    meal: newMeal(),
    editState: "add",
  };
}

function removeFirstEmptyMeal(state: MealState[]) {
  const firstMeal = _.first(state);
  if (_.isEmpty(firstMeal?.meal.foods)) {
    state.shift();
  }
}

const initialState = [newMealState()];

const reset = (mealState: MealState) => mealState.editState = undefined;

const resetAll = (state: MealState[]) => _.forEach(state, reset);

const mealStatesSlice = createSlice({
  name: "mealStates",
  initialState,
  reducers: {
    addMeal(state) {
      resetAll(state);
      state.push(newMealState())
    },
    addSavedMeal(state, action: PayloadAction<{ foods: Food[]; }>) {
      resetAll(state);
      const mealState = newMealState();
      const meal = {...mealState.meal, foods: action.payload.foods}
      mealState.meal = meal;
      removeFirstEmptyMeal(state);
      state.push(mealState);
    },
    deleteMeal(state, action: PayloadAction<number>) {
      const i = action.payload;
      state.splice(i, 1);
      return state;
    },
    addFood(state, action: PayloadAction<{ mealIndex: number; food: Food }>) {
      const { mealIndex, food } = action.payload;
      state[mealIndex].meal.foods.push(food);
    },
    updateFood(state, action: PayloadAction<{ mealIndex: number; foodIndex: number; food: Food }>) {
      const { mealIndex, foodIndex, food } = action.payload;
      state[mealIndex].meal.foods[foodIndex] = food;
    },
    cancelAddFood(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state[mealIndex].editState = undefined;
    },
    enterMealEditMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      resetAll(state);
      state[mealIndex].editState = "edit";
    },
    enterMealAddMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state[mealIndex].editState = "add";
    },
    exitMealEditMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state[mealIndex].editState = undefined;
    },
    enterFoodEditMode(state, action: PayloadAction<{ mealIndex: number; foodIndex: number }>) {
      const { mealIndex, foodIndex } = action.payload;
      state[mealIndex].foodEditIndex = foodIndex;
    },
    exitFoodEditMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state[mealIndex].foodEditIndex = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, () => [newMealState()])
      .addCase(exitEditMode, (state) => resetAll(state));
  }
})

export const {
  addMeal, addSavedMeal, deleteMeal,
  addFood, updateFood, cancelAddFood,
  enterMealEditMode, enterMealAddMode, exitMealEditMode,
  enterFoodEditMode, exitFoodEditMode,
} = mealStatesSlice.actions;

export default mealStatesSlice.reducer;