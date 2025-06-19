import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { DayPage } from "../../model/diary";
import { DiaryTimeline } from "../../model/diaryHistory";
import { setDayPage } from "./dayPageSlice";
import { exitEditMode } from "./editModeSlice";
import { addMeal, deleteFood, deleteMeal, todayReset } from "./todaySlice";

export type MealEditState = "add" | "edit" | undefined;

export interface PageOptions {
  mealOptions: MealOptions;
  currentDate: string | "today";
  progress: {
    daysRemaining: number;
    totalDays: number;
  };
}

export interface AddMealOptions {
  editState: "add";
  mealIndex: number;
}

export interface EditMealOptions {
  editState: "edit";
  mealIndex: number;
  foodIndex: number;
}

export interface DefaultMealOptions {
  editState: undefined;
  showMealSavedAlertIndex: number;
}

export type MealOptions = AddMealOptions | EditMealOptions | DefaultMealOptions;

function newMealOptions(): AddMealOptions {
  return {
    editState: "add",
    mealIndex: -1,
  };
}

function defaultMealOptions(): DefaultMealOptions {
  return {
    editState: undefined,
    showMealSavedAlertIndex: -1,
  };
}

export function isToday(date: string | "today"): date is "today" {
  return date === "today";
}

const diaryTimeline = new DiaryTimeline(new HistoryLocalStorage());
export function back() {
  return (dispatch: Dispatch, getState: () => { pageOptions: PageOptions; dayPage: DayPage; today: DayPage }) => {
    const state = getState();
    const { currentDate } = state.pageOptions;
    const dayBefore = diaryTimeline.dayBefore(currentDate);
    if (dayBefore) {
      dispatch(setDayPage(dayBefore.day));
      dispatch(pageOptionsSlice.actions.setCurrentDate(dayBefore.day.date));
      dispatch(pageOptionsSlice.actions.setProgress(dayBefore.progress));
    } else {
      dispatch(pageOptionsSlice.actions.setCurrentDate("today"));
      dispatch(setDayPage(state.today));
    }
  }
}

export function next() {
  return (dispatch: Dispatch, getState: () => { pageOptions: PageOptions; dayPage: DayPage; today: DayPage }) => {
    const state = getState();
    const { currentDate } = state.pageOptions;
    const dayAfter = diaryTimeline.dayAfter(currentDate);
    if (dayAfter) {
      dispatch(setDayPage(dayAfter.day));
      dispatch(pageOptionsSlice.actions.setCurrentDate(dayAfter.day.date));
      dispatch(pageOptionsSlice.actions.setProgress(dayAfter.progress));
    } else {
      dispatch(pageOptionsSlice.actions.setCurrentDate("today"));
      dispatch(setDayPage(state.today));
    }
  }
}

function initialState(): PageOptions {
  return {
    mealOptions: newMealOptions(),
    currentDate: "today",
    progress: {
      daysRemaining: 0,
      totalDays: 0,
    },
  };
}

const pageOptionsSlice = createSlice({
  name: "pageOptions",
  initialState: initialState(),
  reducers: {
    enterMealEditMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state.mealOptions = {
        editState: "edit",
        mealIndex,
        foodIndex: -1,
      }
    },
    enterMealAddMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state.mealOptions = {
        ...newMealOptions(),
        editState: "add",
        mealIndex,
      }
    },
    exitMealEditMode(state) {
      state.mealOptions = defaultMealOptions();
    },
    enterFoodEditMode(state, action: PayloadAction<{ mealIndex: number; foodIndex: number }>) {
      state.mealOptions = {
        editState: "edit",
        ...action.payload,
      };
    },
    exitFoodEditMode(state) {
      if (state.mealOptions.editState === "edit") {
        state.mealOptions.foodIndex = -1;
      }
    },
    exitFoodAddMode(state) {
      state.mealOptions = defaultMealOptions();
    },
    showSavedMealAlert(state, action: PayloadAction<number>) {
      state.mealOptions = {
        editState: undefined,
        showMealSavedAlertIndex: action.payload,
      }
    },
    hideSavedMealAlert(state) {
      state.mealOptions = defaultMealOptions();
    },
    setCurrentDate(state, action: PayloadAction<string | "today">) {
      state.currentDate = action.payload;
    },
    goToToday(state) {
      state.currentDate = "today";
    },
    setProgress(state, action: PayloadAction<{ daysRemaining: number; totalDays: number }>) {
      state.progress = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(todayReset, () => initialState())
      .addCase(exitEditMode, (state) => {
        state.mealOptions = defaultMealOptions();
      })
      .addCase(deleteFood, (state) => {
        if (state.mealOptions.editState === "edit") {
          state.mealOptions.foodIndex = -1;
        }
      })
      .addCase(addMeal, () => initialState())
      .addCase(deleteMeal, (state) => {
        state.mealOptions = defaultMealOptions();
      })
  }
});

export const {
  enterMealEditMode, enterMealAddMode, exitMealEditMode,
  enterFoodEditMode, exitFoodEditMode, exitFoodAddMode,
  showSavedMealAlert, hideSavedMealAlert,
  goToToday,
} = pageOptionsSlice.actions;

export default pageOptionsSlice.reducer;