import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../model/Food";

export interface DayHistory {
  date: string,
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

export const { back } = historySlice.actions;
export default historySlice.reducer;