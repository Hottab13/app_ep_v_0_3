import { AUTH_USER, SET_USER_DATA, IS_TOGGLE_LOADING_AUTH } from "../constants";

export const loginUser = (payload) => ({
  // auth user
  type: AUTH_USER,
  payload,
});
export const isToggleLoadingAuth = (payload) => ({
  // loading auth
  type: IS_TOGGLE_LOADING_AUTH,
  payload,
});
export const setUserData = (payload) => ({
  // set user data
  type: SET_USER_DATA,
  payload,
});
