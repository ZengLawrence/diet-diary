import { createSlice } from "@reduxjs/toolkit";

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
  }
})

export const { enterEditTarget, exitEditTarget } = editTargetSlice.actions;
export default editTargetSlice.reducer;