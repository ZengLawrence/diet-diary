import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import { SavedMeal } from "../features/saved-meal/SavedMeal";
import decompose from '../features/suggestions/parser/DecomposedFoodDescription';
import { addOrReplace } from '../features/suggestions/search/foodNameSearch';
import { PredefinedSuggestion } from '../features/suggestions/search/PredefinedSuggestion';
import { Food } from '../model/Food';
import { loadState, saveState } from './localStorage';
import reducer from './reducers';

const persistedState = loadState();
export const store = configureStore({
  reducer,
  preloadedState: persistedState,
})

store.subscribe(_.throttle(() => {
  saveState(store.getState());
}, 1000));

function isSingleFoodMeal(meal: SavedMeal): boolean {
  const { foods } = meal;
  return (_.size(foods) === 1) && (_.size(foods[0].description) > 1);
}

function toSuggestion(food: Food): PredefinedSuggestion {
  const { description, serving } = food;
  console.log(description);
  const { foodName, amount } = decompose(description);
  return {
    foodName,
    amount: _.toString(amount),
    serving
  }
}

const savedMeals: SavedMeal[] = _.get(persistedState, 'savedMeals');
_.filter(savedMeals, isSingleFoodMeal)
  .flatMap(meal => meal.foods)
  .map(toSuggestion)
  .forEach(suggestion =>
    addOrReplace(suggestion)
  );

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store