import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  }
});

export const { updateSearchTerm } = savedMealStateSlice.actions;
export default savedMealStateSlice.reducer;