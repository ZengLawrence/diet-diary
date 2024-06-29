import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meal } from "../../model/Food";

const MAX_SAVED_COUNT = 20;

const savedMealsSlice = createSlice({
  name: "savedMeals",
  initialState: [] as Meal[],
  reducers: {
    save(state, action: PayloadAction<Meal>) {
      const len = state.unshift(action.payload);
      if (len > MAX_SAVED_COUNT) {
        state.splice(MAX_SAVED_COUNT, len - MAX_SAVED_COUNT);
      }
      return state;
    }
  }
})

export const { save } = savedMealsSlice.actions;
export default savedMealsSlice.reducer;