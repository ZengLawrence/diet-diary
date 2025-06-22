import { createSlice } from "@reduxjs/toolkit";
import { newDay } from "./dayPageSlice";

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
      .addCase(newDay.fulfilled, () => true)
  }
})

export const { enterEditMode, exitEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;