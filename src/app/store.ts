import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash';
import reducer from '../reducers/reducers'
import { loadState, saveState } from './localStorage';
// ...

const persistedState = loadState();
export const store = configureStore({
  reducer,
  preloadedState: persistedState,
})

store.subscribe(_.throttle(() => {
  saveState(store.getState());
}, 1000));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store