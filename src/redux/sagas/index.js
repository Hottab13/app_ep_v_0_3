import {
  takeEvery,
  put,
  call,
  fork,
  select,
  all
} from 'redux-saga/effects';
import {
  AUTH_USER,
  AUTH_USER_DATA,
  GET_USER_DATA,
  UPLOAD_PHOTO_AVA_USER,
  GET_EVENTS,
  SET_NEW_EVENT,
  GET_EVENT_PROFILE,
  DEL_EVENT,
  IS_AUTH_TRUE
} from '../constants';
import {
  getIsAuthTrue,
  setUserData,
  setUserAvatar,
  setUserPhotoId,
  setEvents,
  setEventProfile,
  isToggleLoading,
  errEvent,
  successEvent,
  clearToggle,
  eventUserName,
  isToggleLoadingAuth,
  errAuth,
  clearToggleAuth
} from '../actions/actionCreator';
import {
  getAuthTokenUser,
  getAuthData,
  getUserData,
  getUserAvatar,
  postUserAva,
  putUpdataUserData,
  getEvents,
  postNewEvent,
  getEvent,
  delEvent
} from '../../api/index';
import {
  setAuthUser
} from '../../utils/setAuthToken';
import {
  _arrayBufferToBase64
} from '../../utils/arrayBufferToBase64';

const delay =(time)=> new Promise((resolve, reject)=>{
  setTimeout(resolve,time *1000)
})

export function* hendlerAuthUser() {// аунтификация
  try {
    const auth = yield select(({authUser})=>authUser);
    debugger
    const res = yield call(getAuthTokenUser, auth);
    debugger
    if(res.status===200){
      debugger
      yield put(isToggleLoadingAuth(false))// отключить прелоудер
      yield setAuthUser(res.data.accessToken);// сохраняем токен в куки
      //yield put(getIsAuthTrue());// делаем стор авторизованным 
      yield put({type: IS_AUTH_TRUE});// делаем стор авторизованным
    }else{
      debugger
      yield put(isToggleLoadingAuth(false))
      yield put(errAuth(res.data.errorText))
      yield delay(5)
      yield put(clearToggleAuth())
    }

  } catch {
   // yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}
export function* hendlerAuthData() {//дергаем авторизованного юзера
  try {
    const {data} = yield call(getAuthData);
    yield put(setUserData(data));
    const img_1000_1000 = yield call(getUserAvatar,data.imgAvatarId );
    yield put(setUserAvatar(_arrayBufferToBase64(img_1000_1000)));
  } catch {
    //yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}
export function* hendlerUserData() {//дергаем данные юзера по id
  try {
    const {user_id} = yield select(({userProfileData})=>userProfileData);
    const {data} = yield call(getUserData,user_id);
    yield put(setUserData(data));
  } catch {
    yield
  }
}
export function* hendlerUploadPhotoUserAva() {//загружаем новую авку
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
export function* hendlerEvents() {//дергаем массив событий
  try {
    const events = yield call(getEvents);
    yield put(setEvents(events))
  } catch {
    yield
  }
}
export function* hendlerNewEvent() {//добавляем новое событие
  try {
    const {_id} = yield select(({userProfileData})=>userProfileData.userData);
    const {newEvents} = yield select(({events})=>events);
    debugger
    const res = yield call(postNewEvent,_id,newEvents);// надо сделать сообщение успешного создания
    if(res.status===200){
      debugger
      yield put(isToggleLoading(false))
      yield put(successEvent(res.statusText))
      yield delay(5)
      yield put(clearToggle())
    }else{
      debugger
      yield put(isToggleLoading(false))
      yield put(errEvent(res.data.errorText))
      yield delay(5)
      yield put(clearToggle())
    }
  } catch {
    debugger
  }
}
export function* hendlerEventProfile() {//дёргаем профиль события
  try {
    const {getEventProfile} = yield select(({events})=>events);
    debugger
    const res = yield call(getEvent,getEventProfile);
    debugger
    const {data} = yield call(getUserData,res.ownerUser);
    yield put(eventUserName(data))
     debugger
    yield put(setEventProfile(res))
debugger
  } catch {
    yield
  }
}
export function* hendlerDelEvent() {//удаляем событие
  try {
    const {getEventProfile} = yield select(({events})=>events);
    debugger
    const res = yield call(delEvent,getEventProfile);
    debugger
debugger
  } catch {
    yield
  }
}

export function* watchAuthUser() {
  yield takeEvery(AUTH_USER, hendlerAuthUser ); 
}
export function* watchAuthUserData() {
  yield takeEvery(AUTH_USER_DATA,hendlerAuthData );
}
export function* watchUserData() {
  yield takeEvery(GET_USER_DATA, hendlerUserData);
}
export function* watchUploadPhotoUserAva() {
  yield takeEvery(UPLOAD_PHOTO_AVA_USER, hendlerUploadPhotoUserAva);
}
export function* watchEvents() {
  yield takeEvery(GET_EVENTS, hendlerEvents); 
}
export function* watchNewEvent() {
  yield takeEvery(SET_NEW_EVENT, hendlerNewEvent);
}
export function* watchEventProfile() {
  yield takeEvery(GET_EVENT_PROFILE, hendlerEventProfile);//дёрнуть ивент по id
}
export function* watchDelEvent() {
  yield takeEvery(DEL_EVENT, hendlerDelEvent);
}

export default function* rootSaga() {
  yield all([
    fork (watchAuthUser),
    fork (watchAuthUserData),
    fork (watchUserData), 
    fork (watchUploadPhotoUserAva), 
    fork (watchEvents), 
    fork (watchNewEvent),
    fork (watchEventProfile),
    fork (watchDelEvent),
  ])
}
