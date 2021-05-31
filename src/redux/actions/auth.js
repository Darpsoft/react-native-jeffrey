import {
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_START,
  REGISTER_SUCCESS,
  SIGNOUT_START,
  SIGNOUT_SUCCESS,
  UPDATE_REDUX_AUTH_START,
  UPDATE_REDUX_AUTH_SUCCESS,
} from "@redux/constants";

export const loginStart = (payload) => ({
  type: LOGIN_START,
  payload,
});
export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const signOutStart = (payload) => ({
  type: SIGNOUT_START,
  payload,
});
export const signOutSuccess = (payload) => ({
  type: SIGNOUT_SUCCESS,
  payload,
});

export const registerStart = (payload) => ({
  type: REGISTER_START,
  payload,
});
export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const updateReduxAuthStart = (payload) => ({
  type: UPDATE_REDUX_AUTH_START,
  payload,
});
export const updateReduxAuthSuccess = (payload) => ({
  type: UPDATE_REDUX_AUTH_SUCCESS,
  payload,
});
