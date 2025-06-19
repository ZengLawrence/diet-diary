import { createSlice } from "@reduxjs/toolkit";
import { todayReset } from "./todaySlice";

const initialState = true;

const editModeSlice = createSlice({
  name: "editMode",
  initialState,
  reducers: {
    enterEditMode() {
      return true;
    },
    exitEditMode() {
      return false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(todayReset, () => true)
  }
})

export const { enterEditMode, exitEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;