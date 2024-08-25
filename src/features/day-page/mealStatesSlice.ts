import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { Food, Meal, newMeal } from "../../model/Food";
import { newDay } from "./dateSlice";
import { exitEditMode } from "./editModeSlice";

export type MealEditState = "add" | "edit" | "name" | undefined;

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
      return _.filter(state, (_, index) => (index !== action.payload));
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
    replaceFoods(state, { payload: { mealIndex, food, replacedFoodIndices } }: PayloadAction<{ mealIndex: number; food: Food; replacedFoodIndices: number[]}>) {
      const meal = state[mealIndex].meal;
      _.pullAt(meal.foods, replacedFoodIndices);
      meal.foods.push(food);
      state[mealIndex].editState = undefined;
    },
    enterMealEditMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      resetAll(state);
      state[mealIndex].editState = "edit";
    },
    enterMealAddMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state[mealIndex].editState = "add";
    },
    enterMealNameMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state[mealIndex].editState = "name";
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
      .addCase(exitEditMode, (state) => {
        _.forEach(state, function(mealState) {
          mealState.editState = undefined;
        })
      })
  }
})

export const {
  addMeal, addSavedMeal, deleteMeal,
  addFood, updateFood, cancelAddFood, replaceFoods,
  enterMealEditMode, enterMealAddMode, enterMealNameMode, exitMealEditMode,
  enterFoodEditMode, exitFoodEditMode,
} = mealStatesSlice.actions;

export default mealStatesSlice.reducer;