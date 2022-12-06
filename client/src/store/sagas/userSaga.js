import { put, call, takeEvery } from 'redux-saga/effects';
import { USER } from '../actions/actionTypes';
//* в сагах put === dispatch
//* call для вызова асинхронной логики в сагах (fetch)

import { setLoadingAC } from '../actions/globalActions';
import { userSigninAC, userSigninErrAC } from '../actions/userActions';

const getUser = async (signal) => {
  const response = await fetch('http://localhost:6622/api/auth', {
    credentials: 'include',
    signal,
  });
  return response.json();
};

const authUser = async (form) => {
  const url = form.name ? 'http://localhost:6622/api/auth/signup' : 'http://localhost:6622/api/auth/signin';
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  return response.json();
};

//* worker
function* authUserSaga(action) {
  const { payload } = action;
  try {
    const result = yield call(authUser, payload);
    yield put(userSigninAC(result));
  } catch (error) {
    yield put(userSigninErrAC(error));
  }
}

function* getUserSaga(action) {
  const { payload } = action;
  try {
    const result = yield call(getUser, payload);
    yield put(userSigninAC(result.user));
    yield put(setLoadingAC(false));
  } catch (error) {
    yield put(userSigninErrAC(error));
  }
}

//* watcher
export function* userSagaWatcher() {
  yield takeEvery(USER.USER_SIGNIN_START, getUserSaga);
  yield takeEvery(USER.USER_AUTH_START, authUserSaga);
}
