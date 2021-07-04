import { createSlice } from "@reduxjs/toolkit";
import { newDay } from "./dateSlice";

const initialState = true;

const editModeSlice = createSlice({
  name: "editMode",
  initialState,
  reducers: {
    enterEditMode(state) {
      return true;
    },
    exitEditMode(state) {
      return false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, () => true)
  }
})

export const { enterEditMode, exitEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;