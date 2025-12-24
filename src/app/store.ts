import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import { loadState, saveState } from './localStorage';
import reducer from './reducers';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const persistedState = loadState();
export const store = configureStore({
  reducer,
  preloadedState: persistedState,
})
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

store.subscribe(_.throttle(() => {
  saveState(store.getState());
}, 1000));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store