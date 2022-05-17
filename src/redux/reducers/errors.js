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
      return {
        ...state,
        authLoginError: payload,
      };
    case SET_REGISTRATION_ERROR:
      return {
        ...state,
        registrationError: payload,
      };
    case SET_AUTH_DATA_USER_ERROR:
      return {
        ...state,
        authUserData: payload,
      };
    case SET_EVENT_ERROR:
      return {
        ...state,
        eventError: payload,
      };
    default:
      return state;
  }
};

export default errors;
