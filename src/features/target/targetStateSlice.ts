import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Gender } from "../../model/Target";
import { preferencesApi } from "../preference/api";

interface TargetState {
  gender: Gender,
}

const initialState: TargetState = {
  gender: preferencesApi.getGender(),
};

export const changeGender = createAsyncThunk(
  "targetState/changeGender",
  async (gender: Gender) => {
    return preferencesApi.setGender(gender);
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