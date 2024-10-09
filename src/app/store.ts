import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import { loadState, saveState } from './localStorage';
import reducer from './reducers';
import { addSavedMeals } from '../features/suggestions/SavedMeals';

const persistedState = loadState();
export const store = configureStore({
  reducer,
  preloadedState: persistedState,
})

store.subscribe(_.throttle(() => {
  saveState(store.getState());
}, 1000));

addSavedMeals(_.get(persistedState, 'savedMeals'));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store