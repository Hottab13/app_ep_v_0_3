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
  IS_AUTH_TRUE,
  IS_TOGGLE_DEL_EV_FALSE,
  ADD_USER_EVENT,
  ADD_USER_ID_EVENT,
  DEL_USER_EVENT,
  DEL_USER_ID_EVENT,
  SUCCESS_UPDATE_MEMBER_EVENT,
  SUCCESS_UPDATE_USER_DATA,
  GET_MY_EVENTS
} from '../constants';
import {
  setUserData,
  setEvents,
  setEventProfile,
  isToggleLoading,
  errEvent,
  successEvent,
  clearToggle,
  eventUserName,
  isToggleLoadingAuth,
  errAuth,
  clearToggleAuth,
} from '../actions/actionCreator';
import {
  getAuthTokenUser,
  getAuthData,
  getUserData,
  putUpdataUserData,
  getEvents,
  postNewEvent,
  getEvent,
  delEvent,
  updateMemberEvent,
  getMyEvents
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
    debugger
    const auth = yield select(({authUser})=>authUser);
    debugger
    const res = yield call(getAuthTokenUser, auth);
    debugger
    if(res.status===200){
      debugger
      yield put(isToggleLoadingAuth(false))
      yield put(isToggleLoading(false))// отключить прелоудер
      yield setAuthUser(res.data.accessToken);// сохраняем токен в куки
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
    yield put({type:IS_AUTH_TRUE});
    yield put(isToggleLoadingAuth(true))
    const {data} = yield call(getAuthData);
    yield put(setUserData(data));
    yield put(isToggleLoadingAuth(false))
  } catch {
    //yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}
export function* hendlerUserData() {//дергаем данные юзера по id
  try {
    yield put(isToggleLoadingAuth(true))
    const {user_id} = yield select(({userProfileData})=>userProfileData);
    const {data} = yield call(getUserData,user_id);
    yield put(setUserData(data));
    yield put(isToggleLoadingAuth(false))
  } catch {
    yield
  }
}
export function* hendlerUploadPhotoUserAva() {//загружаем новую авку
  try {
    yield put(isToggleLoadingAuth(true))
    const userData = yield select(({userProfileData})=>userProfileData);
    const res = yield call(putUpdataUserData,userData.userData,userData.uploadPhotoAvaUser);
    debugger
    if(res.status===200){
      debugger
      yield put({ type: SUCCESS_UPDATE_USER_DATA});
    }
    yield put(isToggleLoadingAuth(false))
  } catch {
    yield
  }
}
export function* hendlerEvents() {//дергаем массив событий
  try {
    yield put(isToggleLoadingAuth(true))
    const events = yield call(getEvents);
    yield put(setEvents(events))
    yield put(isToggleLoadingAuth(false))
  } catch {
    yield
  }
}
export function* hendlerNewEvent() {//добавляем новое событие
  try {
    const {_id} = yield select(({userProfileData})=>userProfileData.userData);
    const event = yield select(({events})=>events); 
    debugger
    const res = yield call(postNewEvent,_id,event.newEvents,event.uploadPhotoAvaEvent);// надо сделать сообщение успешного создания
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
    yield put(isToggleLoadingAuth(true))
    const {getEventProfile} = yield select(({events})=>events);
    debugger
    const res = yield call(getEvent,getEventProfile);
    debugger
    const {data} = yield call(getUserData,res.ownerUser);
    yield put(eventUserName(data))
     debugger
    yield put(setEventProfile(res))
    yield put(isToggleLoadingAuth(false))
debugger
  } catch {
    yield
  }
}
export function* hendlerDelEvent() {//удаляем событие
  try {
    yield put(isToggleLoadingAuth(true))
    const {getEventProfile} = yield select(({events})=>events);
    debugger
    const res = yield call(delEvent,getEventProfile);
    debugger
    yield put(isToggleLoadingAuth(false)) 
    yield put({type:IS_TOGGLE_DEL_EV_FALSE})
  } catch {
    yield
  }
}
export function* hendlerAddUserEvent() {//добавляем юзера к событию
  try {
    yield put(isToggleLoadingAuth(true))
    const {newIdEvent} = yield select(({events})=>events);// дергаем id выбранного события
    const {_id} = yield select(({userProfileData})=>userProfileData.userData);// дёргаем id юзера
    //const res = yield call(getEvent,newIdEvent);//дергаем данные события с API
    //yield put(setEventProfile(res))// сетаем в стейт данные
    yield put({ type: ADD_USER_ID_EVENT, payload:_id});// добавляем id юзера в массив юзеров события
    const {addUsersEvent} = yield select(({events})=>events);// дергаем данные обнавлённого события
    const res_data = yield call(updateMemberEvent,newIdEvent,addUsersEvent);//обновляем событие
    if(res_data.status===200){
      debugger
      yield put({ type: SUCCESS_UPDATE_MEMBER_EVENT});
    }
    debugger
    yield put(isToggleLoadingAuth(false)) 
    //yield put({type:IS_TOGGLE_DEL_EV_FALSE})
  } catch {
    yield
  }
} 
export function* hendlerDelUserEvent() {//удаляем юзера из событию
  try {
    yield put(isToggleLoadingAuth(true))
    const {newIdEvent} = yield select(({events})=>events);// дергаем id выбранного события
    const {_id} = yield select(({userProfileData})=>userProfileData.userData);// дёргаем id юзера
    //const res = yield call(getEvent,newIdEvent);//дергаем данные события с API
    //yield put(setEventProfile(res))// сетаем в стейт
    yield put({ type: DEL_USER_ID_EVENT, payload:_id});// удаляем id юзера из массива событий
    const {addUsersEvent} = yield select(({events})=>events);// дергаем данные обнавлённого события
    debugger
    const res_data = yield call(updateMemberEvent,newIdEvent,addUsersEvent);//обновляем событие
    if(res_data.status===200){
      debugger
      yield put({ type: SUCCESS_UPDATE_MEMBER_EVENT});
    }
    debugger
    yield put(isToggleLoadingAuth(false)) 
  } catch {
    yield
  }
} 
export function* hendlerMyEvents() {//дергаем мои события
  try {
    yield put(isToggleLoadingAuth(true))
    const {_id} = yield select(({userProfileData})=>userProfileData.userData);// дёргаем id юзера
    debugger
    const res_data = yield call(getMyEvents,_id);//дёргаем мои события
    debugger
    if(res_data.status===200){
      debugger
      yield put(setEvents(res_data.data))
    }
    yield put(isToggleLoadingAuth(false)) 
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
export function* watchAddUserEvent() {// добавить нового участника события
  yield takeEvery(ADD_USER_EVENT, hendlerAddUserEvent);
} 
export function* watchDelUserEvent() {// удалить участника события
  yield takeEvery(DEL_USER_EVENT, hendlerDelUserEvent);
} 
export function* watchMyEvents() {// дёрнуть мои события
  yield takeEvery(GET_MY_EVENTS, hendlerMyEvents);
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
    fork (watchAddUserEvent),
    fork (watchDelUserEvent),
    fork (watchMyEvents),
  ])
}
