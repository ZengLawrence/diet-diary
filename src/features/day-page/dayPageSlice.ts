import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayPage } from "../../model/diary";
import { Food } from "../../model/Food";
import { Target } from "../../model/Target";
import { today } from "./api";
import { back, goToToday, next } from "./pageOptionsSlice";

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

export const deleteFood = createAsyncThunk<DayPage, { mealIndex: number, foodIndex: number }>(
  'dayPage/deleteFood',
  async (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    const food = meal.foods[payload.foodIndex];
    const newDay = today.deleteFood(meal, food);
    return newDay;
  }
);

export const changeTarget = createAsyncThunk<DayPage, Target>(
  'dayPage/changeTarget',
  async (target) => {
    return today.updateTarget(target);
  }
);

export const toggleUnlimitedFruit = createAsyncThunk<DayPage>(
  'dayPage/toggleUnlimitedFruit',
  async () => {
    return today.toggleUnlimitedFruit();
  }
);

const dayPageSlice = createSlice({
  name: 'dayPage',
  initialState: today.currentDay(), // initializer should not change state
  reducers: {
    refresh: (state, action: PayloadAction<DayPage>) => {
      if (state.date === action.payload.date) {
        return action.payload;
      }
      return state; // do not change state if the date is different
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
    })
    .addCase(deleteFood.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(changeTarget.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(toggleUnlimitedFruit.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(goToToday.fulfilled, (_state, action) => {
      return action.payload.day;
    });
  },
});

export const { refresh } = dayPageSlice.actions;
export default dayPageSlice.reducer;