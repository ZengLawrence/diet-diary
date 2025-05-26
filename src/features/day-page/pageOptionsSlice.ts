import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { exitEditMode } from "./editModeSlice";
import { addMeal, deleteFood, deleteMeal } from "./mealStatesSlice";
import { newDay } from "./todaySlice";

export type MealEditState = "add" | "edit" | undefined;

export interface PageOptions {
  mealOptions: MealOptions;
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

function initialState(): PageOptions {
  return {
    mealOptions: newMealOptions(),
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
      state.mealOptions = newMealOptions();
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
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, () => initialState())
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
} = pageOptionsSlice.actions;

export default pageOptionsSlice.reducer;