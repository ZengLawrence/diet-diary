import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { DayPage, Today } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import { Food } from "../../model/Food";
import * as showSavedMealsSlice from "./showSavedMealsSlice";
import { Target } from "../../model/Target";

const historyLocalStorage = new HistoryLocalStorage();
const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);
import { back, next } from "./pageOptionsSlice";

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

function getMeal(state: DayPage, index: number) {
  if (index < 0 || index >= state.meals.length) {
    throw new Error(`Invalid meal index: ${index}`);
  }
  return state.meals[index];
}

export function deleteMeal(mealIndex: number) {
  return (dispatch: Dispatch, getState: () => {dayPage: DayPage}) => {
    const meal = getMeal(getState().dayPage, mealIndex);
    const newDay = today.deleteMeal(meal);
    dispatch(dayPageSlice.actions.setDayPage(newDay));
    dispatch(dayPageSlice.actions.mealDeleted());
  }
}

export function addFood(payload: {mealIndex: number, food: Food}) {
  const { mealIndex, food } = payload;
  return (dispatch: Dispatch, getState: () => {dayPage: DayPage}) => {
    const state = getState().dayPage;
    const meal = getMeal(state, mealIndex);
    const newDay = today.addFood(meal, food);
    dispatch(dayPageSlice.actions.setDayPage(newDay));
    dispatch(dayPageSlice.actions.mealAdded());
  }
}

export function updateFood(payload: {mealIndex: number, foodIndex: number, food: Food}) {
  const { mealIndex, foodIndex, food } = payload;
  return (dispatch: Dispatch, getState: () => {dayPage: DayPage}) => {
    const state = getState().dayPage;
    const meal = getMeal(state, mealIndex);
    const foodToReplace = meal.foods[foodIndex];
    const newDay = today.updateFood(meal, foodToReplace, food);
    dispatch(dayPageSlice.actions.setDayPage(newDay));
  }
}

export function deleteFood(payload: {mealIndex: number, foodIndex: number}) {
  const { mealIndex, foodIndex } = payload;
  return (dispatch: Dispatch, getState: () => {dayPage: DayPage}) => {
    const state = getState().dayPage;
    const meal = getMeal(state, mealIndex);
    const food = meal.foods[foodIndex];
    const newDay = today.deleteFood(meal, food);
    dispatch(dayPageSlice.actions.setDayPage(newDay));
    dispatch(dayPageSlice.actions.foodDeleted());
  }
}

export function changeTarget(target: Target) {
  return (dispatch: Dispatch) => {
    const newDay = today.updateTarget(target);
    dispatch(dayPageSlice.actions.setDayPage(newDay));
  }
}

export function toggleUnlimitedFruit() {
  return (dispatch: Dispatch) => {
    const newDay = today.toggleUnlimitedFruit();
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
    foodDeleted(state) {
      // marker action to indicate that a food was deleted; no state change
      return state;
    },
    mealAdded(state) {
      // marker action to indicate that a meal was added; no state change
      return state;
    },
    mealDeleted(state) {
      // marker action to indicate that a meal was deleted; no state change
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(back.fulfilled, (_state, action) => {
      return action.payload.day;
    })
    .addCase(next.fulfilled, (_state, action) => {
      return action.payload.day;
    });
  },
});

export const { 
  setDayPage, 
  todayReset, foodDeleted , mealAdded, mealDeleted
} = dayPageSlice.actions;
export default dayPageSlice.reducer;