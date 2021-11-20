import { createSlice } from "@reduxjs/toolkit";
import { exitEditMode } from "../day-page/editModeSlice";

const initialState = false;

const editTargetSlice = createSlice({
  name: "editTarget",
  initialState,
  reducers: {
    enterEditTarget() {
      return true;
    },
    exitEditTarget() {
      return false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(exitEditMode, () => false)
  }
})

export const { enterEditTarget, exitEditTarget } = editTargetSlice.actions;
export default editTargetSlice.reducer;