import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MealEditState = "add" | "edit" | undefined;

export interface PageOptions {
  mealState: MealState;
}

interface MealState {
  editState: MealEditState;
  mealIndex: number;
  foodIndex: number;
  showMealSavedAlertIndex: number;
}

function newMealState(): MealState {
  return {
    editState: undefined,
    mealIndex: -1,
    foodIndex: -1,
    showMealSavedAlertIndex: -1,
  };
}

function initialState(): PageOptions {
  return {
    mealState: newMealState(),
  };
}

const pageOptionsSlice = createSlice({
  name: "pageOptions",
  initialState: initialState(),
  reducers: {
    enterMealEditMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state.mealState = {
        ...newMealState(),
        editState: "edit",
        mealIndex,
      }
    },
    enterMealAddMode(state, { payload: { mealIndex } }: PayloadAction<{ mealIndex: number; }>) {
      state.mealState = {
        ...newMealState(),
        editState: "add",
        mealIndex,
      }
    },
    exitMealEditMode(state) {
      state.mealState = newMealState();
    },
    enterFoodEditMode(state, action: PayloadAction<{ mealIndex: number; foodIndex: number }>) {
      state.mealState = {
        ...state.mealState,
        ...action.payload,
      };
    },
    exitFoodEditMode(state) {
      state.mealState.foodIndex = -1;
    },
    exitFoodAddMode(state) {
      state.mealState.editState = undefined;
      state.mealState.foodIndex = -1;
    },
    showSavedMealAlert(state, action: PayloadAction<number>) {
      state.mealState.showMealSavedAlertIndex = action.payload;
    },
    hideSavedMealAlert(state) {
      state.mealState.showMealSavedAlertIndex = -1;
    },
  },
});

export const { 
  enterMealEditMode, enterMealAddMode, exitMealEditMode,
  enterFoodEditMode, exitFoodEditMode, exitFoodAddMode,
  showSavedMealAlert, hideSavedMealAlert,
} = pageOptionsSlice.actions;

export default pageOptionsSlice.reducer;