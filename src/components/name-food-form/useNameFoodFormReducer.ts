import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer } from "react";
import { Food, newFood } from "../../model/Food";
import { initSelectable, Selectable } from "../../model/Selectable";
import { calcFoodsServingSummary, positiveServing } from "../../model/servingFunction";

const renamedFoodSlice = createSlice({
  name: "renamedFood",
  initialState: newFood(),
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  }
})
const { updateName } = renamedFoodSlice.actions;
const renamedFood = renamedFoodSlice.reducer;

const foodsSlice = createSlice({
  name: "foods",
  initialState: [] as (Food & Selectable)[],
  reducers: {
    selectFood(state, action: PayloadAction<number>) {
      state[action.payload].selected = true;
    },
    unselectFood(state, action: PayloadAction<number>) {
      state[action.payload].selected = false;
    },
  }
})
const { selectFood, unselectFood } = foodsSlice.actions;
const foods = foodsSlice.reducer;

interface ValidationError {
  foodName?: boolean;
  selectedNone?: boolean;
}

const errorsSlice = createSlice({
  name: "errors",
  initialState: {} as ValidationError,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateName,
        (state, action) => { state.foodName = (_.size(action.payload) === 0) })
  }
})
const errors = errorsSlice.reducer;

const reducer = combineReducers({
  renamedFood,
  foods,
  errors,
})

const combine = (foods: Food[]) => ({
  name: _.join(_.map(foods, "name"), ", "),
  serving: positiveServing(calcFoodsServingSummary(foods)),
})

const initialState = (foods: Food[]) => ({
  renamedFood: combine(foods),
  foods: _.map(foods, food => initSelectable(food, true)),
  errors: {}
})

export default function useNameFoodFormReducer(initialFoods: Food[]) {

  const [state, dispatch] = useReducer(reducer, initialState(initialFoods));
  const handleSelectFoodChanged = (index: number, selected: boolean) => selected ? dispatch(selectFood(index)) : dispatch(unselectFood(index));

  return {
    state,
    fns: {
      handleSelectFoodChanged,
    }
  }
}