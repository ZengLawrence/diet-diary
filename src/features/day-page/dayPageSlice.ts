import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { DayPage, Today } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import { Food } from "../../model/Food";
import { Target } from "../../model/Target";
import { back, next } from "./pageOptionsSlice";

const historyLocalStorage = new HistoryLocalStorage();
const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);

const todayLocalStorage = new TodayLocalStorage();
const today = new Today(todayLocalStorage, todayLocalStorage, diaryHistory);

export const newDay = createAsyncThunk<DayPage>(
  'dayPage/newDay',
  async () => {
    return today.newDay();
  }
);

export const addMeal = createAsyncThunk<DayPage>(
  'dayPage/addMeal',
  async () => {
    const newDay = today.addMeal();
    return newDay;
  }
);

export const addSavedMeal = createAsyncThunk<DayPage, { foods: Food[] }>(
  'dayPage/addSavedMeal',
  async (meal) => {
    return today.addSavedMeal(meal.foods);
  }
);

function getMeal(state: DayPage, index: number) {
  if (index < 0 || index >= state.meals.length) {
    throw new Error(`Invalid meal index: ${index}`);
  }
  return state.meals[index];
}

export const deleteMeal = createAsyncThunk<DayPage, number>(
  'dayPage/deleteMeal',
  async (mealIndex, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, mealIndex);
    return today.deleteMeal(meal);
  }
);

export const addFood = createAsyncThunk<DayPage, { mealIndex: number, food: Food }>(
  'dayPage/addFood',
  async (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    return today.addFood(meal, payload.food);
  }
);

export const updateFood = createAsyncThunk<DayPage, { mealIndex: number, foodIndex: number, food: Food }>(
  'dayPage/updateFood',
  async (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    const foodToReplace = meal.foods[payload.foodIndex];
    return today.updateFood(meal, foodToReplace, payload.food);
  }
);

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
  initialState: today.currentDay(), // initializer should not change state
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
  },
  extraReducers: (builder) => {
    builder.addCase(back.fulfilled, (_state, action) => {
      return action.payload.day;
    })
    .addCase(next.fulfilled, (_state, action) => {
      return action.payload.day;
    })
    .addCase(newDay.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(addMeal.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(addSavedMeal.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(deleteMeal.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(addFood.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(updateFood.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export const { 
  todayReset, foodDeleted
} = dayPageSlice.actions;
export default dayPageSlice.reducer;