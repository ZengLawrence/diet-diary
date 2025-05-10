import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Food, Meal } from "../../model/Food";
import savedMeals from "../../model/savedMeals";

interface SavedMeal {
  foods: Food[];
}

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
      const selected = state.splice(index, 1);
      state.unshift(selected[0]);
      return state;
    },
    remove(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.splice(index, 1);
      return state;
    }
  }
})

export const { save, select, remove } = savedMealsSlice.actions;
export default savedMealsSlice.reducer;