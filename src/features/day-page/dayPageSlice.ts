import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DayPage } from "../../model/DayPage";
import type { Food } from "../../model/Food";
import type { Target } from "../../model/Target";
import { diary, savedFoods, today } from "./api";
import { back, goToToday, next } from "./pageOptionsSlice";

export const newDay = createAsyncThunk<DayPage>(
  'dayPage/newDay',
  () => {
    return Promise.resolve(diary.newDay());
  }
);

export const addMeal = createAsyncThunk<DayPage>(
  'dayPage/addMeal',
  () => {
    return Promise.resolve(today.addMeal());
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
  (mealIndex, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, mealIndex);
    return Promise.resolve(today.deleteMeal(meal));
  }
);

export const addFood = createAsyncThunk<DayPage, { mealIndex: number, food: Food }>(
  'dayPage/addFood',
  (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    return Promise.resolve(today.addFood(meal, payload.food));
  }
);

export const updateFood = createAsyncThunk<DayPage, { mealIndex: number, foodIndex: number, food: Food }>(
  'dayPage/updateFood',
  (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    const foodToReplace = meal.foods[payload.foodIndex];
    return Promise.resolve(today.updateFood(meal, foodToReplace, payload.food));
  }
);

export const deleteFood = createAsyncThunk<DayPage, { mealIndex: number, foodIndex: number }>(
  'dayPage/deleteFood',
  (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    const food = meal.foods[payload.foodIndex];
    return Promise.resolve(today.deleteFood(meal, food));
  }
);

// TODO find a better place for this
export const saveFood = createAsyncThunk<{ mealIndex: number, foodIndex: number }, { mealIndex: number, foodIndex: number }>(
  'dayPage/saveFood',
  (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    const food = meal.foods[payload.foodIndex];
    savedFoods.add(food);
    return Promise.resolve(payload);
  }
);

// TODO find a better place for this
export const deleteSavedFood = createAsyncThunk<{ mealIndex: number, foodIndex: number }, { mealIndex: number, foodIndex: number }>(
  'dayPage/deleteSavedFood',
  (payload, { getState }) => {
    const state = getState() as { dayPage: DayPage };
    const meal = getMeal(state.dayPage, payload.mealIndex);
    const food = meal.foods[payload.foodIndex];
    savedFoods.remove(food);
    return Promise.resolve(payload);
  }
);

export const changeTarget = createAsyncThunk<DayPage, Target>(
  'dayPage/changeTarget',
  (target) => {
    return Promise.resolve(today.updateTarget(target));
  }
);

export const toggleUnlimitedFruit = createAsyncThunk<DayPage>(
  'dayPage/toggleUnlimitedFruit',
  () => {
    return Promise.resolve(today.toggleUnlimitedFruit());
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
      .addCase(saveFood.fulfilled, (state) => {
        // no state change
        return state;
      })
      .addCase(deleteSavedFood.fulfilled, (state) => {
        // no state change
        return state;
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