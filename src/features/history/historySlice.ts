import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayPage } from "../../model/diary";

export interface History {
  days: DayPage[],
}

const MAX_DAYS = 7;

export function getDaysRemaining(history: History, currentDate: string): { daysRemaining: number, totalDays: number } {
  const totalDays = history.days.length;
  const dateIndex = history.days.findIndex(day => day.date === currentDate);
  if (dateIndex === -1) {
    return { daysRemaining: 0, totalDays };
  }
  const daysRemaining = totalDays - (dateIndex + 1);
  return { daysRemaining, totalDays };
}

const initialState: History = {
  days: [],
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