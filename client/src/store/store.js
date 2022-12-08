import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { globalReducer, userReducer } from './reducers';

const reducer = combineReducers({
  globalStore: globalReducer,
  userStore: userReducer,
});

export const store = configureStore({ reducer });
