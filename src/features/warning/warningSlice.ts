import { createSlice } from "@reduxjs/toolkit";
import { newDay } from "../day-page/dateSlice";

interface WarningState {
  dismissWarning: boolean;
  showCanNotAddNewDayWarning: boolean;
}

const initialState: WarningState = {
  dismissWarning: false,
  showCanNotAddNewDayWarning: false,
};

const warningSlice = createSlice({
  name: "warning",
  initialState,
  reducers: {
    dismissWarning(state) {
      state.dismissWarning = true;
    },
    toggleCanNotAddNewDayWarning(state) {
      state.showCanNotAddNewDayWarning = !state.showCanNotAddNewDayWarning;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, (state) => {
        state.dismissWarning = false;
        state.showCanNotAddNewDayWarning = false;
      })
  }
})

export const { dismissWarning, toggleCanNotAddNewDayWarning } = warningSlice.actions;
export default warningSlice.reducer;