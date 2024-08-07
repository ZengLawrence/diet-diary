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
    }
  }
})

export const { save } = savedMealsSlice.actions;
export default savedMealsSlice.reducer;