import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newDay } from "./dateSlice";
import { exitEditMode } from "./editModeSlice";
import { addMeal, deleteFood } from "./mealStatesSlice";

export type MealEditState = "add" | "edit" | undefined;

export interface PageOptions {
  mealOptions: MealOptions;
}

export interface MealOptions {
  editState: MealEditState;
  mealIndex: number;
  foodIndex: number;
  showMealSavedAlertIndex: number;
}

function newMealOptions(): MealOptions {
  return {
    editState: undefined,
    mealIndex: -1,
    foodIndex: -1,
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
        ...newMealOptions(),
        editState: "edit",
        mealIndex,
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
        ...state.mealOptions,
        ...action.payload,
      };
    },
    exitFoodEditMode(state) {
      state.mealOptions.foodIndex = -1;
    },
    exitFoodAddMode(state) {
      state.mealOptions.editState = undefined;
      state.mealOptions.foodIndex = -1;
    },
    showSavedMealAlert(state, action: PayloadAction<number>) {
      state.mealOptions.showMealSavedAlertIndex = action.payload;
    },
    hideSavedMealAlert(state) {
      state.mealOptions.showMealSavedAlertIndex = -1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newDay, () => initialState())
      .addCase(exitEditMode, () => initialState())
      .addCase(deleteFood, (state) => {
        state.mealOptions.foodIndex = -1;
      })
      .addCase(addMeal, () => {
        return {
          mealOptions: {
            ...newMealOptions(),
            editState: "add",
          },
        };
      })
  }
});

export const { 
  enterMealEditMode, enterMealAddMode, exitMealEditMode,
  enterFoodEditMode, exitFoodEditMode, exitFoodAddMode,
  showSavedMealAlert, hideSavedMealAlert,
} = pageOptionsSlice.actions;

export default pageOptionsSlice.reducer;