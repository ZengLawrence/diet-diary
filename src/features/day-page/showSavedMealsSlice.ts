import { createSlice } from "@reduxjs/toolkit";
import { addSavedMeal } from "./mealStatesSlice";
import { save } from "../saved-meal/savedMealsSlice";

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
    builder.addCase(addSavedMeal, (_state) => {
      return false;
    })
    .addCase(save, (_state) => {
      return true;
    });
  }
})

export const { show, hide } = showSavedMealsSlice.actions;
export default showSavedMealsSlice.reducer;