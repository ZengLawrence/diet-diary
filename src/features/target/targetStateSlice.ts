import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gender, getDefaultTarget, Target } from "../../model/Target";

interface TargetState {
  target: Target,
  gender: Gender,
  unlimitedFruit: boolean,
}

const initialState = {
  target: getDefaultTarget(),
  gender: "man" as Gender,
  unlimitedFruit: true,
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
    toggleUnlimitedFruit(state) {
      state.unlimitedFruit = !state.unlimitedFruit;
    },
  },
})

export const {
  changeTarget,
  changeGender,
  toggleUnlimitedFruit,
} = targetStateSlice.actions;
export default targetStateSlice.reducer;