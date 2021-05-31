import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { putOptionsWithoutToken, showMessageError } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions";
import { LOGIN_START, REGISTER_START, UPDATE_REDUX_AUTH_START } from "@redux/constants";
import { database } from "@database";
import Config from "react-native-config";

export function* Login({ payload: { email, password } }) {
  try {
    yield put(showLoader());

    const url = `${Config.URL_API}/rest/user/${email}`;
    const options = putOptionsWithoutToken({}, "PUT", { App: "APP_BCK", Password: password });
    const requestLogin = yield call(request, url, options);

    // Se quito porque no tengo los niveles de usuarios
    // const userTypeName = requestLogin.userRole.userRole;
    const userTypeName = "ADMIN";

    // En este caso solo se utilizará en token {sessionTokenBck}
    yield all([put(loginSuccess({ tokenUser: requestLogin.sessionTokenBck, dataUser: { ...requestLogin, userTypeName, app: "APP_BCK" } }))]);
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export function* Register() {
  const storage = yield select((state) => state);
  try {
    yield put(showLoader());
    yield all([put(hideLoader())]);
  } catch (err) {
    yield put(hideLoader());
    yield showMessageError(err);
  }
}

export function* UpdateReduxAuth({ payload: { resolve, reject } }) {
  const auth = yield database.auth.get("object");
  try {
    // Save data in old reducer
    yield Object.keys(auth).length > 0 && put(loginSuccess(auth));
    yield resolve("Se obtuvieron los datos con éxito");
  } catch (err) {
    yield reject(err);
    yield showMessageError(err);
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_START, Login);
  yield takeLatest(REGISTER_START, Register);
  yield takeLatest(UPDATE_REDUX_AUTH_START, UpdateReduxAuth);
}
