import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../model/Food";
import { Target } from "../../model/Target";
import { newDay } from "../day-page/dateSlice";

export interface DayHistory {
  date: string,
  target: Target & { unlimitedFruit: boolean }
  meals: Meal[],
}

export interface History {
  days: DayHistory[],
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
    add(state, action: PayloadAction<DayHistory>) {
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