import { takeEvery, put, call, fork, select } from 'redux-saga/effects';
import { AUTH_USER, AUTH_USER_DATA, GET_USER_DATA, UPLOAD_PHOTO_AVA_USER, GET_EVENTS, SET_NEW_EVENT } from '../constants';
import { getIsAuthTrue, setUserData, setUserAvatar, setUserPhotoId, setEvents } from '../actions/actionCreator';
import { getAuthTokenUser, getAuthData, getUserData, getUserAvatar, postUserAva, putUpdataUserData,getEvents, postNewEvent } from '../../api/index';
import { setAuthUser } from '../../utils/setAuthToken';
import { _arrayBufferToBase64 } from '../../utils/arrayBufferToBase64';

export function* hendlerAuthWorker() {// аунтификация
  try {
    const auth = yield select(({authUser})=>authUser);
    const {accessToken} = yield call(getAuthTokenUser, auth);
    if(accessToken){
      yield setAuthUser(accessToken);// сохраняем токен в куки
      yield put(getIsAuthTrue());// делаем стор авторизованным
    }
  } catch {
   // yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}
export function* hendlerAuthDataWorker() {//дергаем авторизованного юзера
  try {
    const {data} = yield call(getAuthData);
    yield put(setUserData(data));
    const img_1000_1000 = yield call(getUserAvatar,data.imgAvatarId );
    yield put(setUserAvatar(_arrayBufferToBase64(img_1000_1000)));
  } catch {
    //yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}
export function* hendlerUserDataWorker() {//дергаем данные юзера по id
  try {
    const {user_id} = yield select(({userProfileData})=>userProfileData);
    const {data} = yield call(getUserData,user_id);
    yield put(setUserData(data));
  } catch {
    yield
  }
}
export function* hendlerUserUploadWorker() {//загружаем новую авку
  try {
    const {uploadPhotoAvaUser} = yield select(({userProfileData})=>userProfileData);
    const {idImg} = yield call(postUserAva,uploadPhotoAvaUser);
    yield put(setUserPhotoId(idImg))
    const {userData} = yield select(({userProfileData})=>userProfileData);
    const {data} = yield call(putUpdataUserData,userData);
  } catch {
    yield
  }
}
export function* hendlerGetEventsWorker() {//дергаем массив событий
  try {
    const events = yield call(getEvents);
    yield put(setEvents(events))
  } catch {
    yield
  }
}
export function* hendlerNewEventWorker() {//добавляем новое событие
  try {
    const {userData} = yield select(({userProfileData})=>userProfileData);
    const {newEvents} = yield select(({events})=>events);
    debugger
    const res = yield call(postNewEvent,userData._id,newEvents);
debugger
    
  } catch {
    yield
  }
}

export  function* hendlerAuthDataWatcher(){
  yield fork(hendlerAuthDataWorker);
}
export  function* hendlerAuthWatcher(){
  yield fork(hendlerAuthWorker);
}
export  function* hendlerUserDataWatcher(){
  yield fork(hendlerUserDataWorker);
}
export  function* hendlerUserUploadWatcher(){
  yield fork(hendlerUserUploadWorker);
}
export  function* hendlerGetEventsWatcher(){
  yield fork(hendlerGetEventsWorker);
}
export  function* hendlerNewEventWatcher(){
  yield fork(hendlerNewEventWorker);
}

export function* watchClickSaga() {
  yield takeEvery(AUTH_USER, hendlerAuthWatcher ); 
  yield takeEvery(AUTH_USER_DATA,hendlerAuthDataWatcher );
  yield takeEvery(GET_USER_DATA, hendlerUserDataWatcher);
  yield takeEvery(UPLOAD_PHOTO_AVA_USER, hendlerUserUploadWatcher);
  yield takeEvery(GET_EVENTS, hendlerGetEventsWatcher); 
  yield takeEvery(SET_NEW_EVENT, hendlerNewEventWatcher);
}

export default function* rootSaga() {
  yield watchClickSaga();
}
