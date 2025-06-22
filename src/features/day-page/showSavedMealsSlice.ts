import { createSlice } from "@reduxjs/toolkit";
import { addSavedMeal } from "./dayPageSlice";

const showSavedMealsSlice = createSlice({
  name: "showSavedMeals",
  initialState: false,
  reducers: {
    show() {
      return true;
    },
    hide() {
      return false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addSavedMeal.fulfilled, () => {
      return false;
    });
  }
})

export const { show, hide } = showSavedMealsSlice.actions;
export default showSavedMealsSlice.reducer;