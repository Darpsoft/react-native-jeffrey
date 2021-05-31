import { all } from "redux-saga/effects";
import auth from "./auth";
import home from "./home";

export default function* rootSaga() {
  yield all([auth(), home()]);
}
