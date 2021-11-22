import { createSlice } from "@reduxjs/toolkit";
import { exitEditMode } from "../day-page/editModeSlice";

const initialState = { editTarget: false };

const targetStateSlice = createSlice({
  name: "editTarget",
  initialState,
  reducers: {
    enterEditTarget(state) {
      state.editTarget = true;
    },
    exitEditTarget(state) {
      state.editTarget = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(exitEditMode, (state) => {
      state.editTarget = false
    })
  }
})

export const { enterEditTarget, exitEditTarget } = targetStateSlice.actions;
export default targetStateSlice.reducer;