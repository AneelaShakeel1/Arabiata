// import * as env from '~/global/env';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  appConfigSlice,
  userSlice,
  onboardingSlice,
  settingsSlice,
  cartSlice
} from '../slices';
import { persistStore, persistReducer } from 'redux-persist';

let Storage: any;

Storage = require('@react-native-async-storage/async-storage');

// if (env.IS_WEB === 'true') Storage = require('redux-persist/lib/storage');

// if (env.IS_WEB === false) {
//   Storage = require('@react-native-async-storage/async-storage');
// }

const rootReducer = combineReducers({
  appConfig: appConfigSlice.reducer,
  user: userSlice.reducer,
  onboarding: onboardingSlice.reducer,
  settings: settingsSlice.reducer,
  cart: cartSlice.reducer
});

const persistedRootReducer = persistReducer(
  {
    key: 'root',
    storage: Storage?.default,
    blacklist: ['appConfig'],
    whitelist: ['user'],
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedRootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  // .concat(api.middleware), // TODO i will enable this when i use codegen graphql
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;