import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meal } from "../../model/Food";
import { SavedMeal } from "../../model/SavedMeal";
import savedMeals from "../../model/savedMeals";

const savedMealsSlice = createSlice({
  name: "savedMeals",
  initialState: [] as SavedMeal[],
  reducers: {
    save(state, action: PayloadAction<Meal>) {
      const meal = { foods: action.payload.foods };
      return savedMeals.save(state, meal);
    },
    select(state, action: PayloadAction<number>) {
      const index = action.payload;
      return savedMeals.selected(state, state[index]);
    },
    remove(state, action: PayloadAction<number>) {
      const index = action.payload;
      return savedMeals.remove(state, state[index]);
    }
  }
})

export const { save, select, remove } = savedMealsSlice.actions;
export default savedMealsSlice.reducer;