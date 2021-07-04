import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_TARGET, Target } from "../../model/Target";

const initialState = DEFAULT_TARGET;

const targetSlice = createSlice({
  name: "target",
  initialState,
  reducers: {
    changeTarget(state, action: PayloadAction<Target>) {
      return action.payload;
    }
  }
})

export const { changeTarget } = targetSlice.actions;
export default targetSlice.reducer;