import { createSlice } from "@reduxjs/toolkit";

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
})

export const { show, hide } = showSavedMealsSlice.actions;
export default showSavedMealsSlice.reducer;