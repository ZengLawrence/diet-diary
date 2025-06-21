import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { DayPage, Today } from "../../model/diary";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { DiaryHistory } from "../../model/diaryHistory";

const historyLocalStorage = new HistoryLocalStorage();
const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);

const todayLocalStorage = new TodayLocalStorage();
const today = new Today(todayLocalStorage, todayLocalStorage, diaryHistory);

export function newDay() {
  return (dispatch: Dispatch) => {
    const newDay = today.newDay();
    dispatch(dayPageSlice.actions.setDayPage(newDay));
    dispatch(dayPageSlice.actions.todayReset());
  };
}

export function addMeal() {
  return (dispatch: Dispatch) => {
    const newDay = today.addMeal();
    dispatch(dayPageSlice.actions.setDayPage(newDay));
  }
}

const dayPageSlice = createSlice({
  name: 'dayPage',
  initialState: today.newDay(),
  reducers: {
    setDayPage(_state, action: PayloadAction<DayPage>) {
      return action.payload;
    },
    todayReset(state) {
      // mark the day as reset; no state change
      return state;
    },
  },
});

export const { setDayPage, todayReset } = dayPageSlice.actions;
export default dayPageSlice.reducer;