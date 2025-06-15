import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newDay } from "../day-page/todaySlice";

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
    setShowCanNotAddNewDayWarning(state, action: PayloadAction<boolean>) {
      state.showCanNotAddNewDayWarning = action.payload;
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

export const { dismissWarning, setShowCanNotAddNewDayWarning } = warningSlice.actions;
export default warningSlice.reducer;