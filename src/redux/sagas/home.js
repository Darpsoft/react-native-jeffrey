import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { showMessageError } from "@utils/request";
import { showLoader, hideLoader } from "@redux/actions";
import { UserServices } from "@services/User";
import { REQUEST_HOME_START } from "../constants";
import { requestHomeSuccess } from "../actions";
import { ToastAndroid } from "react-native";

export function* requestHome() {
  try {
    yield put(showLoader());

    const userServices = new UserServices();
    const requestBookins = yield userServices.getBookins();

    yield put(requestHomeSuccess({ data: requestBookins }));

    if (requestBookins.length > 0) {
      yield ToastAndroid.showWithGravityAndOffset("Se cargaron los datos con éxito.", ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50);
    } else {
      yield ToastAndroid.showWithGravityAndOffset("No hay datos.", ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50);
    }
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export default function* homeSaga() {
  yield takeLatest(REQUEST_HOME_START, requestHome);
}
