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
    back(state) {
      state.dateIndex += 1;
    },
  }
})

export const { add, back } = historySlice.actions;
export default historySlice.reducer;