import { takeEvery, put, call, select } from "redux-saga/effects";
import { isToggleLoadingAuth } from "../actions/authActionCreator";
import { getAuthTokenUser, postRegistrationUser } from "../../api/index";
import { setAuthUser } from "../../utils/setAuthToken";
import {
  AUTH_USER,
  IS_AUTH_TRUE,
  REGISTRATION_USER,
  SET_AUTH_LOGIN_ERROR,
  SET_REGISTRATION_ERROR,
  CLEAR_TOGGLE_AUTH,
  ERR_AUTH,
} from "../constants";
import {delay} from "../../utils/delay"

export function* hendlerAuthUser() {
  // auth user
  try {
    yield put(isToggleLoadingAuth(true));
    const { authData } = yield select(({ authUser }) => authUser);
    const res = yield call(getAuthTokenUser, authData);
    if (res.status === 200) {
      yield put(isToggleLoadingAuth(false));
      yield setAuthUser(res.data.accessToken); //save token 
      yield put({ type: IS_AUTH_TRUE }); // success user auth
    } else {
      yield put(isToggleLoadingAuth(false));
      yield put({ type: ERR_AUTH, payload: res.data.errorText });
      yield delay(5);
      yield put({ type: CLEAR_TOGGLE_AUTH });
    }
  } catch {
    yield put({
      type: SET_AUTH_LOGIN_ERROR,
      payload: "Ошибка, не удалось выполнить авторизацию!",
    });
  }
}
export function* hendlerRegistrationUser() {
  //registration user
  try {
    yield put(isToggleLoadingAuth(true));
    const { registrationData } = yield select(({ authUser }) => authUser);
    const res = yield call(postRegistrationUser, registrationData);
    if (res.status === 200) {
      yield put(isToggleLoadingAuth(false));
      yield setAuthUser(res.data.accessToken);
      yield put({ type: IS_AUTH_TRUE });
    } else {
      yield put(isToggleLoadingAuth(false));
      yield put({ type: ERR_AUTH, payload: res.data.errorText });
      yield delay(5);
      yield put({ type: CLEAR_TOGGLE_AUTH });
    }
  } catch {
    yield put({
      type: SET_REGISTRATION_ERROR,
      payload: "Ошибка, не удалось выполнить регистрацию!",
    });
  }
}

export function* watchAuthUser() {
  yield takeEvery(AUTH_USER, hendlerAuthUser);
}

export function* watchRegistrationUser() {
  yield takeEvery(REGISTRATION_USER, hendlerRegistrationUser);
}
