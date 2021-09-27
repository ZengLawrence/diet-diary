import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer } from "react";
import { Food, newFood } from "../../model/Food";
import { initSelectable, Selectable } from "../../model/Selectable";
import { calcFoodsServingSummary, positiveServing } from "../../model/servingFunction";

const renamedFoodSlice = createSlice({
  name: "renamedFood",
  initialState: {
    sources: [] as (Food & Selectable)[],
    target: newFood(),
  },
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.target.name = action.payload;
    },
    selectFood(state, action: PayloadAction<number>) {
      state.sources[action.payload].selected = true;
      state.target = combine(state.sources);
    },
    unselectFood(state, action: PayloadAction<number>) {
      state.sources[action.payload].selected = false;
      state.target = combine(state.sources);
    },
  }
})
const { updateName, selectFood, unselectFood } = renamedFoodSlice.actions;
const renamedFood = renamedFoodSlice.reducer;

const errorsSlice = createSlice({
  name: "errors",
  initialState: {
    foodName: false,
    selectCount: 0,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateName, (state, action) => { 
        state.foodName = (_.size(action.payload) === 0);
      })
      .addCase(selectFood, state => {
        state.foodName = false;
        state.selectCount++;
      })
      .addCase(unselectFood, state => {
        state.selectCount--;
      })
  }
})
const errors = errorsSlice.reducer;

const reducer = combineReducers({
  renamedFood,
  errors,
})

const selected = (foods: (Food & Selectable)[]) =>
  _.filter(foods, { selected: true });

const combineName = (foods: (Food & Selectable)[]) =>
  _.join(_.map(selected(foods), "name"), ", ");

const combine = (foods: (Food & Selectable)[]) => ({
  name: combineName(foods),
  serving: positiveServing(calcFoodsServingSummary(selected(foods))),
})

const initialState = (foods: Food[]) => {
  const sources = _.map(foods, food => initSelectable(food, true));
  const selectCount = _.size(selected(sources));

  return {
    renamedFood: {
      sources,
      target: combine(sources),
    },
    errors: {
      foodName: false,
      selectCount,
    }
  }
}

const checkValidity = (errors: {foodName: boolean; selectCount: number}) => {
  const failed =  errors.foodName || errors.selectCount < 2;
  return !failed;
}

export default function useNameFoodFormReducer(initialFoods: Food[], onSaveFood: (food: Food, replacedFoodIndices: number[]) => void) {

  const [state, dispatch] = useReducer(reducer, initialState(initialFoods));
  const handleSelectFoodChanged = (index: number, selected: boolean) => selected ? dispatch(selectFood(index)) : dispatch(unselectFood(index));
  const handleFoodNameChanged = (name: string) => dispatch(updateName(name));

  const handleSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { target, sources } = state.renamedFood;
    if (checkValidity(state.errors)) {
      onSaveFood(target, _.map(sources, (food, index) => food.selected ? index : -1));
    }
  }

  const fns = {
    handleSelectFoodChanged,
    handleFoodNameChanged,
    handleSubmitted,
  }

  return [state,fns] as [typeof state, typeof fns];
}