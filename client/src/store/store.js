import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import saga from 'redux-saga';

import { rootSaga } from './sagas/index';
import { globalReducer, userReducer } from './reducers';

const sagaMiddleware = saga();

const reducer = combineReducers({
  globalStore: globalReducer,
  userStore: userReducer,
});

export const store = configureStore({
  reducer,
  middleware: (prevMw) => [...prevMw({ serializableCheck: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
