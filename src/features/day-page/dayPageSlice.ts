import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { DayPage, Today } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import { Food } from "../../model/Food";
import * as showSavedMealsSlice from "./showSavedMealsSlice";

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

export function addSavedMeal(meal: { foods: Food[] }) {
  return (dispatch: Dispatch) => {
    const newDay = today.addSavedMeal(meal.foods);
    dispatch(dayPageSlice.actions.setDayPage(newDay));
    //TODO: should it be done in other way?
    dispatch(showSavedMealsSlice.hide())
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