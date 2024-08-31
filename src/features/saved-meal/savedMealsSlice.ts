import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Food, Meal } from "../../model/Food";

const MAX_SAVED_COUNT = 20;

interface SavedMeal {
  foods: Food[];
}

const savedMealsSlice = createSlice({
  name: "savedMeals",
  initialState: [] as SavedMeal[],
  reducers: {
    save(state, action: PayloadAction<Meal>) {
      const meal = { foods: action.payload.foods };
      const len = state.unshift(meal);
      if (len > MAX_SAVED_COUNT) {
        state.splice(MAX_SAVED_COUNT, len - MAX_SAVED_COUNT);
      }
      return state;
    },
    select(state, action: PayloadAction<number>) {
      const index = action.payload;
      const selected = state.splice(index, 1);
      state.unshift(selected[0]);
      return state;
    }
  }
})

export const { save, select } = savedMealsSlice.actions;
export default savedMealsSlice.reducer;