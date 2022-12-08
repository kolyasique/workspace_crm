import { USER } from './actionTypes';

export const startUserSigninAC = (signal) => ({ type: USER.USER_SIGNIN_START, payload: signal });
export const startUserAuthAC = (form) => ({ type: USER.USER_AUTH_START, payload: form });
export const userSigninAC = (user) => ({ type: USER.USER_SIGNIN, payload: user });
export const userSigninErrAC = (err) => ({ type: USER.USER_SIGNIN_ERROR, payload: err });
export const userSignoutAC = (user) => ({ type: USER.USER_SIGNOUT, payload: user });
