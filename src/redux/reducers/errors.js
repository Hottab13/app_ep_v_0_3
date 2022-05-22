import {
  SET_AUTH_LOGIN_ERROR,
  SET_REGISTRATION_ERROR,
  SET_AUTH_DATA_USER_ERROR,
  SET_EVENT_ERROR,
} from "../constants";

const initialState = {
  authLoginError: "",
  registrationError: "",
  authUserData: "",
  eventError: "",
};

const errors = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH_LOGIN_ERROR:
      debugger
      return {
        ...state,
        authLoginError: payload,
      };
    case SET_REGISTRATION_ERROR:
      debugger
      return {
        ...state,
        registrationError: payload,
      };
    case SET_AUTH_DATA_USER_ERROR:
      debugger
      return {
        ...state,
        authUserData: payload,
      };
    case SET_EVENT_ERROR:
      debugger
      return {
        ...state,
        eventError: payload,
      };
    default:
      return state;
  }
};

export default errors;
