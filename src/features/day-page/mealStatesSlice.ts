import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import diary from "../../model/diary";
import { Food, Meal, newMeal } from "../../model/Food";
import { newDay } from "./dateSlice";
import { MealEditState } from "./pageOptionsSlice";

export interface MealState {
  meal: Meal;
}

function newMealState(): MealState {
  return {
    meal: newMeal(),
  };
}

function removeFirstEmptyMeal(state: MealState[]) {
  const firstMeal = _.first(state);
  if (_.isEmpty(firstMeal?.meal.foods)) {
    state.shift();
  }
}

function addMealState(meal: Meal): MealState {
  return {
    meal,
  };
}

function initialState(): MealState[] {
  return _.map(diary.newDay().meals, addMealState);
}

const mealStatesSlice = createSlice({
  name: "mealStates",
  initialState: initialState(),
  reducers: {
    addMeal(state) {
      state.push(newMealState())
    },
    addSavedMeal(state, action: PayloadAction<{ foods: Food[]; }>) {
      const mealState = newMealState();
      const meal = { ...mealState.meal, foods: action.payload.foods }
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
    deleteFood(state, action: PayloadAction<{ mealIndex: number; foodIndex: number; }>) {
      const { mealIndex, foodIndex } = action.payload;
      state[mealIndex].meal.foods.splice(foodIndex, 1);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, () => [newMealState()])
  }
})

export const {
  addMeal, addSavedMeal, deleteMeal,
  addFood, updateFood, deleteFood,
} = mealStatesSlice.actions;

export default mealStatesSlice.reducer;