import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Gender } from "../../model/Target";
import { preferencesApi } from "../preference/api";

interface TargetState {
  gender: Gender,
}

const initialState: TargetState = {
  gender: preferencesApi.getGender(),
};

export const changeGender = createAsyncThunk(
  "targetState/changeGender",
  (gender: Gender) => {
    return Promise.resolve(preferencesApi.setGender(gender));
  }
);

const targetStateSlice = createSlice({
  name: "targetState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeGender.fulfilled, (state, action) => {
      state.gender = action.payload;
    });
  }
});

export default targetStateSlice.reducer;