import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayPage } from "../../model/diary";

export interface History {
  days: DayPage[],
  dateIndex: number,
}

const TODAY = -1;
const MAX_DAYS = 7;

const initialState: History = {
  days: [],
  dateIndex: TODAY,
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    add(state, action: PayloadAction<DayPage>) {
      state.days.unshift(action.payload);
      if (state.days.length > MAX_DAYS) {
        state.days = state.days.slice(0, MAX_DAYS);
      }
    },
  },
})

export const { add } = historySlice.actions;
export default historySlice.reducer;