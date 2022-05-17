import { takeEvery, put, call, select } from "redux-saga/effects";
import { setUserData } from "../actions/userActionCreator";
import { isToggleLoading } from "../actions/actionCreator";
import { getAuthData, getUserData, putUpdataUserData } from "../../api/index";
import {
  AUTH_USER_DATA,
  SET_AUTH_DATA_USER_ERROR,
  IS_AUTH_TRUE,
  GET_USER_DATA_ID,
  UPLOAD_PHOTO_AVA_USER,
  SUCCESS_UPDATE_USER_DATA
} from "../constants";

export function* hendlerAuthData() {
  //get auth data user
  try {
    yield put({ type: IS_AUTH_TRUE });
    yield put(isToggleLoading(true));
    const res = yield call(getAuthData);
    if (res.status === 200) {
      yield put(setUserData(res.data));
      yield put(isToggleLoading(false));
    } else {
      yield put({
        type: SET_AUTH_DATA_USER_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_AUTH_DATA_USER_ERROR,
      payload: "Ошибка, не удалось загрузить данные пользователя!",
    });
  }
}
export function* hendlerUserDataId() {
  //get data user id
  try {
    yield put(isToggleLoading(true));
    const { user_id } = yield select(({ userProfileData }) => userProfileData);
    const { data } = yield call(getUserData, user_id);
    yield put(setUserData(data));
    yield put(isToggleLoading(false));
  } catch {
    yield put({
      type: SET_AUTH_DATA_USER_ERROR,
      payload: "Ошибка, не удалось загрузить данные пользователя!",
    });
  }
}
export function* hendlerUploadPhotoUserAva() {
  //upload new ava
  try {
    yield put(isToggleLoading(true));
    const userData = yield select(({ userProfileData }) => userProfileData);
    const res = yield call(
      putUpdataUserData,
      userData.userData,
      userData.uploadPhotoAvaUser
    );
    if (res.status === 200) {
      yield put({ type: SUCCESS_UPDATE_USER_DATA });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_AUTH_DATA_USER_ERROR,
      payload: "Ошибка, не удалось загрузить аватарку пользователя!",
    });
  }
}

export function* watchAuthUserData() {
  yield takeEvery(AUTH_USER_DATA, hendlerAuthData);
}
export function* watchUserDataId() {
  yield takeEvery(GET_USER_DATA_ID, hendlerUserDataId);
}
export function* watchUploadPhotoUserAva() {
  yield takeEvery(UPLOAD_PHOTO_AVA_USER, hendlerUploadPhotoUserAva);
}