import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import diary, { DayPage } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import { Food } from "../../model/Food";
import { Target } from "../../model/Target";

const diaryHistoryStorage = new HistoryLocalStorage();
const diaryHistory = new DiaryHistory(diaryHistoryStorage, diaryHistoryStorage);

function getMeal(state: DayPage, index: number) {
  if (index < 0 || index >= state.meals.length) {
    throw new Error(`Invalid meal index: ${index}`);
  }
  return state.meals[index];
}

export function newDay() {
  return (dispatch: Dispatch, getState: () => {today: DayPage}) => {
    const previousDate = getState().today;
    const newDay = diary.newDay(previousDate);
    dispatch(todaySlice.actions.replaceState(newDay));
    dispatch(todaySlice.actions.todayReset());
    diaryHistory.add(previousDate);
  };
}

const todaySlice = createSlice({
  name: "date",
  initialState: diary.newDay(),
  reducers: {
    replaceState(_state, action: PayloadAction<DayPage>) {
      return action.payload;
    },
    changeTarget(state, action: PayloadAction<Target>) {
      return diary.updateTarget(state, action.payload);
    },
    toggleUnlimitedFruit(state) {
      return diary.toggleUnlimitedFruit(state);
    },
    addMeal(state) {
      return diary.addMeal(state);
    },
    addSavedMeal(state, action: PayloadAction<{ foods: Food[]; }>) {
      return diary.addSavedMeal(state, action.payload.foods);
    },
    deleteMeal(state, action: PayloadAction<number>) {
      const meal = getMeal(state, action.payload);
      return diary.deleteMeal(state, meal);
    },
    addFood(state, action: PayloadAction<{ mealIndex: number; food: Food }>) {
      const { mealIndex, food } = action.payload;
      const meal = getMeal(state, mealIndex);
      return diary.addFood(state, meal, food);
    },
    updateFood(state, action: PayloadAction<{ mealIndex: number; foodIndex: number; food: Food }>) {
      const { mealIndex, foodIndex, food } = action.payload;
      const meal = getMeal(state, mealIndex);
      const foodToReplace = meal.foods[foodIndex];
      return diary.updateFood(state, meal, foodToReplace, food);
    },
    deleteFood(state, action: PayloadAction<{ mealIndex: number; foodIndex: number; }>) {
      const { mealIndex, foodIndex } = action.payload;
      const meal = getMeal(state, mealIndex);
      const food = meal.foods[foodIndex];
      return diary.deleteFood(state, meal, food);
    },
    todayReset(state) {
      // marker action to indicate that the state should be reset to the initial state
      return state;
    },
  }
})

export const { 
  changeTarget, toggleUnlimitedFruit,
  addMeal, addSavedMeal, deleteMeal,
  addFood, updateFood, deleteFood,
  todayReset,
 } = todaySlice.actions;
export default todaySlice.reducer;