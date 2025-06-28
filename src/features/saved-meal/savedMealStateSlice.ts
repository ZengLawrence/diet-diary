import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hide } from "../day-page/showSavedMealsSlice";
import { addSavedMeal } from "../day-page/dayPageSlice";

interface SavedMealState {
  searchTerm: string;
}

const savedMealStateSlice = createSlice({
  name: "searchTerm",
  initialState: { searchTerm: "" } as SavedMealState,
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hide, (state) => {
      state.searchTerm = "";
    })
    .addCase(addSavedMeal.fulfilled, (state) => {
      state.searchTerm = "";
    });
  }
});

export const { updateSearchTerm } = savedMealStateSlice.actions;
export default savedMealStateSlice.reducer;