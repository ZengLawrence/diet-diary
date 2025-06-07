import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newDay } from "../day-page/todaySlice";
import { DayPage } from "../../model/diary";

export interface History {
  days: DayPage[],
  dateIndex: number,
}

const TODAY = -1;

export function isToday(index: number) {
  return index == TODAY;
}

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
    back(state) {
      if (state.dateIndex + 1 < state.days.length) {
        state.dateIndex += 1;
      }
    },
    next(state) {
      if (state.dateIndex - 1 >= TODAY) {
        state.dateIndex -= 1;
      }
    },
    goToToday(state) {
      state.dateIndex = TODAY;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, (state) => { state.dateIndex = TODAY });
  }
})

export const { add, back, next, goToToday } = historySlice.actions;
export default historySlice.reducer;