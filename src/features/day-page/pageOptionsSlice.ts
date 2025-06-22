import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { DayPage } from "../../model/diary";
import { DiaryTimeline } from "../../model/diaryHistory";
import { addMeal, deleteMeal, foodDeleted, newDay } from "./dayPageSlice";
import { exitEditMode } from "./editModeSlice";

export type MealEditState = "add" | "edit" | undefined;

export interface PageOptions {
  mealOptions: MealOptions;
  currentDate: string | "today";
  progress: {
    daysRemaining: number;
    totalDays: number;
  };
  hasHistory: boolean;
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

interface PartialRootState {
  pageOptions: PageOptions;
  today: DayPage;
}

export const back = createAsyncThunk(
  'pageOptions/back',
  async (_, { getState }) => {
    const state = getState() as PartialRootState;
    const { currentDate } = state.pageOptions;
    const dayBefore = diaryTimeline.dayBefore(currentDate);
    if (dayBefore) {
      return {...dayBefore, currentDate: dayBefore.day.date };
    } else {
      return { day: state.today, currentDate: "today" };
    }
  }
);

export const next = createAsyncThunk(
  'pageOptions/next',
  async (_, { getState }) => {
    const state = getState() as PartialRootState;
    const { currentDate } = state.pageOptions;
    const dayAfter = diaryTimeline.dayAfter(currentDate);
    if (dayAfter) {
      return { ...dayAfter, currentDate: dayAfter.day.date };
    } else {
      return { day: state.today, currentDate: "today" };
    }
  }
);

function initialState(): PageOptions {
  return {
    mealOptions: newMealOptions(),
    currentDate: "today",
    progress: {
      daysRemaining: 0,
      totalDays: 0,
    },
    hasHistory: false,
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
      .addCase(newDay.fulfilled, (state) => {
        state.mealOptions = newMealOptions();
        state.hasHistory = true;
      })
      .addCase(exitEditMode, (state) => {
        state.mealOptions = defaultMealOptions();
      })
      .addCase(foodDeleted, (state) => {
        if (state.mealOptions.editState === "edit") {
          state.mealOptions.foodIndex = -1;
        }
      })
      .addCase(addMeal.fulfilled, (state) => {
        state.mealOptions = newMealOptions();
      })
      .addCase(deleteMeal.fulfilled, (state) => {
        state.mealOptions = defaultMealOptions();
      })
      .addCase(back.fulfilled, (state, action) => {
        state.currentDate = action.payload.currentDate;
        if ('progress' in action.payload) {
          state.progress = action.payload.progress;
        }
      })
      .addCase(next.fulfilled, (state, action) => {
        state.currentDate = action.payload.currentDate;
        if ('progress' in action.payload) {
          state.progress = action.payload.progress;
        }
      });
    }
});

export const {
  enterMealEditMode, enterMealAddMode, exitMealEditMode,
  enterFoodEditMode, exitFoodEditMode, exitFoodAddMode,
  showSavedMealAlert, hideSavedMealAlert,
  goToToday,
} = pageOptionsSlice.actions;

export default pageOptionsSlice.reducer;