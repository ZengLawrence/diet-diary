import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../model/Food";
import { Target } from "../../model/Target";

export interface DayHistory {
  date: string,
  target: Target & { unlimitedFruit: boolean }
  meals: Meal[],
}

interface History {
  days: DayHistory[],
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
    add(state, action: PayloadAction<DayHistory>) {
      state.days.unshift(action.payload);
      if (state.days.length > MAX_DAYS) {
        state.days = state.days.slice(0, MAX_DAYS);
      }
    },
    atStart(state) {
      if (state.days.length > 0) {
        state.dateIndex = state.days.length - 1;
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
  }
})

export const { add, atStart, back, next } = historySlice.actions;
export default historySlice.reducer;