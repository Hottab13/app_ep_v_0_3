import {
  GET_USER_DATA_ID,
  SET_USER_ID,
  UPLOAD_PHOTO_AVA_USER,
  SET_EVENTS,
  SET_NEW_EVENT,
  GET_EVENT_PROFILE,
  SET_EVENT_PROFILE,
  DEL_EVENT,
  IS_TOGGLE_LOADING,
  ERR_EVENT,
  SUCCESS_EVENT,
  CLEAR_TOGGLE,
  EVENT_USER_NAME,
  LOGIN_OUT,
  ADD_USER_EVENT,
  DEL_USER_EVENT,
  UPLOAD_PHOTO_AVA_EVENT,
  REGISTRATION_USER,
  FILTR_EVENTS,
} from "../constants";

export const getUserData = () => ({
  //get user data id
  type: GET_USER_DATA_ID,
});
export const setUserId = (payload) => ({
  //set user id
  type: SET_USER_ID,
  payload,
});
export const setEvents = (payload) => ({
  //set events
  type: SET_EVENTS,
  payload,
});
export const setNewEvent = (payload) => ({
  //crate new event
  type: SET_NEW_EVENT,
  payload,
});
export const getEventId = (payload) => ({
  //get data event id
  type: GET_EVENT_PROFILE,
  payload,
});
export const setEventProfile = (payload) => ({
  //set data event
  type: SET_EVENT_PROFILE,
  payload,
});
export const delEvent = (payload) => ({
  //del event
  type: DEL_EVENT,
  payload,
});
export const isToggleLoading = (payload) => ({
  //is toggle loading
  type: IS_TOGGLE_LOADING,
  payload,
});
export const errEvent = (payload) => ({
  //err event
  type: ERR_EVENT,
  payload,
});
export const successEvent = (payload) => ({
  //success create event
  type: SUCCESS_EVENT,
  payload,
});
export const clearToggle = () => ({
  //clear toggle
  type: CLEAR_TOGGLE,
});
export const eventUserName = (payload) => ({
  //event user name
  type: EVENT_USER_NAME,
  payload,
});
export const logOut = () => ({
  //log out
  type: LOGIN_OUT,
});
export const addUserEventAction = (payload) => ({
  //add user event
  type: ADD_USER_EVENT,
  payload,
});
export const delUserEventAction = (payload) => ({
  //del user event
  type: DEL_USER_EVENT,
  payload,
});
export const uploadPhotoAvaEvent = (payload) => ({
  //upload photo new ava event
  type: UPLOAD_PHOTO_AVA_EVENT,
  payload,
});
export const uploadPhotoAva = (payload) => ({
  //upload photo new ava user
  type: UPLOAD_PHOTO_AVA_USER,
  payload,
});
export const registrationUser = (payload) => ({
  //registration user
  type: REGISTRATION_USER,
  payload,
});
export const filtrEvents = (payload) => ({
  //filter events
  type: FILTR_EVENTS,
  payload,
});
