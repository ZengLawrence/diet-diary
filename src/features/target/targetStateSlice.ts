import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gender } from "../../model/Target";

interface TargetState {
  gender: Gender,
}

const initialState: TargetState = {
  gender: "man",
};

const targetStateSlice = createSlice({
  name: "targetState",
  initialState,
  reducers: {
    changeGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },
  },
})

export const {
  changeGender,
} = targetStateSlice.actions;
export default targetStateSlice.reducer;