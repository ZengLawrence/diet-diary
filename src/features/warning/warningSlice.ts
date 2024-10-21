import { createSlice } from "@reduxjs/toolkit";

const warningSlice = createSlice({
  name: "warning",
  initialState: {dismissWarning: false},
  reducers: {
    dismissWarning(state) {
      state.dismissWarning = true;
    }
  }
})

export const { dismissWarning } = warningSlice.actions;
export default warningSlice.reducer;