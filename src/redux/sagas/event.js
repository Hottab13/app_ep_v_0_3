import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  setEvents,
  setEventProfile,
  isToggleLoading,
  errEvent,
  successEvent,
  clearToggle,
  eventUserName,
} from "../actions/actionCreator";
import {
  getUserData,
  getEvents,
  postNewEvent,
  getEvent,
  delEvent,
  updateMemberEvent,
  getMyEvents,
  postFiltrEvents,
} from "../../api/index";
import {
  GET_EVENTS,
  SET_NEW_EVENT,
  GET_EVENT_PROFILE,
  DEL_EVENT,
  IS_TOGGLE_DEL_EV_FALSE,
  ADD_USER_EVENT,
  ADD_USER_ID_EVENT,
  DEL_USER_EVENT,
  DEL_USER_ID_EVENT,
  SUCCESS_UPDATE_MEMBER_EVENT,
  GET_MY_EVENTS,
  FILTR_EVENTS,
  SET_EVENT_ERROR,
} from "../constants";
import { delay } from "../../utils/delay";

export function* hendlerEvents() {
  // get events
  try {
    yield put(isToggleLoading(true));
    const res = yield call(getEvents);
    if (res.status === 200) {
      yield put(setEvents(res.data));
      yield put(isToggleLoading(false));
    } else {
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось загрузить события!",
    });
  }
}
export function* hendlerNewEvent() {
  //create event
  try {
    const { _id } = yield select(
      ({ userProfileData }) => userProfileData.userData
    );
    const event = yield select(({ events }) => events);
    const res = yield call(
      postNewEvent,
      _id,
      event.newEvents,
      event.uploadPhotoAvaEvent
    );
    if (res.status === 200) {
      yield put(isToggleLoading(false));
      yield put(successEvent(res.statusText));
      yield delay(5);
      yield put(clearToggle());
    } else {
      yield put(isToggleLoading(false));
      yield put(errEvent(res.data.errorText));
      yield delay(5);
      yield put(clearToggle());
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось создать событие!",
    });
  }
}
export function* hendlerEventProfile() {
  //profile events
  try {
    yield put(isToggleLoading(true));
    const { getEventProfile } = yield select(({ events }) => events);
    const res = yield call(getEvent, getEventProfile);
    const { data } = yield call(getUserData, res.ownerUser);
    if (res.status === 200) {
      yield put(eventUserName(data));
      yield put(setEventProfile(res));
      yield put(isToggleLoading(false));
    } else {
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось загрузить профиль события!",
    });
  }
}
export function* hendlerDelEvent() {
  //del event
  try {
    yield put(isToggleLoading(true));
    const { getEventProfile } = yield select(({ events }) => events);
    const res = yield call(delEvent, getEventProfile);
    if (res.status === 200) {
      yield put({ type: IS_TOGGLE_DEL_EV_FALSE });
      yield put(isToggleLoading(false));
    } else {
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось удалить событие!",
    });
  }
}
export function* hendlerAddUserEvent() {
  //add user event
  try {
    yield put(isToggleLoading(true));
    const { newIdEvent } = yield select(({ events }) => events); // id events
    const { _id } = yield select(
      ({ userProfileData }) => userProfileData.userData
    ); // id user
    yield put({ type: ADD_USER_ID_EVENT, payload: _id }); // add user id in arr events
    const { addUsersEvent } = yield select(({ events }) => events); // new data arr events
    const res = yield call(updateMemberEvent, newIdEvent, addUsersEvent); //update events
    if (res.status === 200) {
      yield put({ type: SUCCESS_UPDATE_MEMBER_EVENT });
      yield put(isToggleLoading(false));
    } else {
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось добавить пользователя к событию!",
    });
  }
}
export function* hendlerDelUserEvent() {
  //del user event
  try {
    yield put(isToggleLoading(true));
    const { newIdEvent } = yield select(({ events }) => events); // id event
    const { _id } = yield select(
      ({ userProfileData }) => userProfileData.userData
    ); // id user
    yield put({ type: DEL_USER_ID_EVENT, payload: _id }); // del user id is arr events
    const { addUsersEvent } = yield select(({ events }) => events); // get data update arr events
    const res = yield call(updateMemberEvent, newIdEvent, addUsersEvent); //update event
    if (res.status === 200) {
      yield put(isToggleLoading(false));
      yield put({ type: SUCCESS_UPDATE_MEMBER_EVENT });
    } else {
      yield put(isToggleLoading(false));
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось удалить пользователя из события!",
    });
  }
}
export function* hendlerMyEvents() {
  //user events
  try {
    yield put(isToggleLoading(true));
    const { _id } = yield select(
      ({ userProfileData }) => userProfileData.userData
    ); // id user
    const res = yield call(getMyEvents, _id); //get user events
    if (res.status === 200) {
      yield put(setEvents(res.data));
      yield put(isToggleLoading(false));
    } else {
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось получить мои события!",
    });
  }
}
export function* hendlerFiltrEvents() {
  // filter events
  try {
    yield put(isToggleLoading(true));
    const { filtrEvents } = yield select(({ events }) => events);
    const res = yield call(postFiltrEvents, filtrEvents);
    if (res.status === 200) {
      if (!res.data || res.data.length === 0) {
        const events = yield call(getEvents);
        yield put(setEvents(events.data));
        yield put(isToggleLoading(false));
      } else {
        yield put(setEvents(res.data));
        yield put(isToggleLoading(false));
      }
    } else {
      yield put({
        type: SET_EVENT_ERROR,
        payload: res.data.errorText,
      });
      yield put(isToggleLoading(false));
    }
  } catch {
    yield put({
      type: SET_EVENT_ERROR,
      payload: "Ошибка, не удалось выполнить фильтрацию!",
    });
  }
}

export function* watchEvents() {
  //загрузить события
  yield takeEvery(GET_EVENTS, hendlerEvents);
}
export function* watchNewEvent() {
  //создать событие
  yield takeEvery(SET_NEW_EVENT, hendlerNewEvent);
}
export function* watchEventProfile() {
  //получить событие по id
  yield takeEvery(GET_EVENT_PROFILE, hendlerEventProfile);
}
export function* watchDelEvent() {
  //удалить событие
  yield takeEvery(DEL_EVENT, hendlerDelEvent);
}
export function* watchAddUserEvent() {
  //добавить нового участника события
  yield takeEvery(ADD_USER_EVENT, hendlerAddUserEvent);
}
export function* watchDelUserEvent() {
  //удалить участника события
  yield takeEvery(DEL_USER_EVENT, hendlerDelUserEvent);
}
export function* watchMyEvents() {
  //дёрнуть мои события
  yield takeEvery(GET_MY_EVENTS, hendlerMyEvents);
}
export function* watchFiltrEvents() {
  //фильтр событий
  yield takeEvery(FILTR_EVENTS, hendlerFiltrEvents);
}
