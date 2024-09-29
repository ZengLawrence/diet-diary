import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_TARGET, Gender, Target } from "../../model/Target";

interface TargetState {
  target: Target,
  gender: Gender,
}

const initialState = {
  target: DEFAULT_TARGET,
  gender: "man" as Gender,
} as TargetState;

const targetStateSlice = createSlice({
  name: "targetState",
  initialState,
  reducers: {
    changeTarget(state, action: PayloadAction<Target>) {
      state.target = action.payload;
    },
    changeGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },
  },
})

export const {
  changeTarget,
  changeGender,
} = targetStateSlice.actions;
export default targetStateSlice.reducer;