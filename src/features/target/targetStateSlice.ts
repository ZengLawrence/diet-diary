import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gender } from "../../model/Target";
import { preferencesApi } from "../preference/api";

interface TargetState {
  gender: Gender,
}

const initialState: TargetState = {
  gender: preferencesApi.getGender(),
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