import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { History } from "../history/historySlice";
import { setDayPage } from "./dayPageSlice";
import { exitEditMode } from "./editModeSlice";
import { addMeal, deleteFood, deleteMeal, todayReset } from "./todaySlice";

export type MealEditState = "add" | "edit" | undefined;

export interface PageOptions {
  mealOptions: MealOptions;
  currentDate: string | "today";
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

export function back() {
  return (dispatch: Dispatch, getState: () => { pageOptions: PageOptions; history: History }) => {
    const state = getState();
    const { currentDate } = state.pageOptions;
    const history = state.history;
    const dateIndex = history.days.findIndex(date => date.date === currentDate);
    if (dateIndex + 1 < history.days.length) {
      const previousDate = history.days[dateIndex + 1];
      dispatch(setDayPage(previousDate))
      dispatch(pageOptionsSlice.actions.setCurrentDate(previousDate.date));
    }
  }
}

export function next() {
  return (dispatch: Dispatch, getState: () => { pageOptions: PageOptions; history: History }) => {
    const state = getState();
    const { currentDate } = state.pageOptions;
    const history = state.history;
    const dateIndex = history.days.findIndex(date => date.date === currentDate);
    if (dateIndex - 1 >= 0) {
      const nextDate = history.days[dateIndex - 1];
      dispatch(setDayPage(nextDate));
      dispatch(pageOptionsSlice.actions.setCurrentDate(nextDate.date));
    } else {
      dispatch(pageOptionsSlice.actions.setCurrentDate("today"));
    }
  }
}

function initialState(): PageOptions {
  return {
    mealOptions: newMealOptions(),
    currentDate: "today",
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