import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meal } from "../../model/Food";

const savedMealsSlice = createSlice({
  name: "savedMeals",
  initialState: [] as Meal[],
  reducers: {
    save(state, action: PayloadAction<Meal>) {
      state.unshift(action.payload);
    }
  }
})

export const { save } = savedMealsSlice.actions;
export default savedMealsSlice.reducer;