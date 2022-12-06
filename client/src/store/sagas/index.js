import { all } from 'redux-saga/effects';

import { userSagaWatcher } from './userSaga';

export function* rootSaga() {
//   yield all([userSagaWatcher(), candidateSagaWatcher()]);
  yield all([userSagaWatcher()]);
}
