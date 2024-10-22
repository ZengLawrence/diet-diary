import { createSlice } from "@reduxjs/toolkit";
import { newDay } from "../day-page/dateSlice";

const warningSlice = createSlice({
  name: "warning",
  initialState: {dismissWarning: false},
  reducers: {
    dismissWarning(state) {
      state.dismissWarning = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, (state) => {
        state.dismissWarning = false;
      })
  }
})

export const { dismissWarning } = warningSlice.actions;
export default warningSlice.reducer;