import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './slices/formSlice';
import storage from 'redux-persist/lib/storage';    // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  person: formSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['person'],   // reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>; 

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);