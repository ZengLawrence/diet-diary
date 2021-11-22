import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_TARGET, Gender, Target } from "../../model/Target";
import { exitEditMode } from "../day-page/editModeSlice";

interface TargetState {
  editTarget: boolean,
  target: Target,
  gender: Gender,
}

const initialState = {
  editTarget: false,
  target: DEFAULT_TARGET,
  gender: "man" as Gender,
} as TargetState;

const targetStateSlice = createSlice({
  name: "targetState",
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
    changeGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
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
  changeTarget,
  changeGender,
} = targetStateSlice.actions;
export default targetStateSlice.reducer;