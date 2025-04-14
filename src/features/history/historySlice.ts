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
    },
    back(state) {
      state.dateIndex += 1;
    },
  }
})

export const { back } = historySlice.actions;
export default historySlice.reducer;