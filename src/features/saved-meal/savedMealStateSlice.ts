import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSavedMeal } from "../day-page/mealStatesSlice";

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
    builder.addCase(addSavedMeal, (state) => {
      state.searchTerm = "";
    });
  }
});

export const { updateSearchTerm } = savedMealStateSlice.actions;
export default savedMealStateSlice.reducer;