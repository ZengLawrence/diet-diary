import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_TARGET, Target } from "../../model/Target";
import { exitEditMode } from "../day-page/editModeSlice";

const initialState = {
  editTarget: false,
  target: DEFAULT_TARGET,
};

const targetStateSlice = createSlice({
  name: "editTarget",
  initialState,
  reducers: {
    enterEditTarget(state) {
      state.editTarget = true;
    },
    exitEditTarget(state) {
      state.editTarget = false;
    },
    changeTarget(state, action: PayloadAction<Target>) {
      state.target = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exitEditMode, (state) => {
      state.editTarget = false
    })
  }
})

export const {
  enterEditTarget, exitEditTarget,
  changeTarget
} = targetStateSlice.actions;
export default targetStateSlice.reducer;