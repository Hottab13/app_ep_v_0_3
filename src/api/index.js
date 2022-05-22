import { authAPI, userAPI, profileAPI, eventsAPI } from "./api";
import { parsObjFormData, parsFilter } from "../utils/parsObjFormData";

export const getAuthTokenUser = async (auth) => {
  // get token
  const respons = await authAPI.getAuthTokenUser(parsObjFormData(auth));
  return respons;
};
export const getAuthData = async () => {
  // get user data is token
  const respons = await userAPI.getAuthTokenUser();
  return respons;
};
export const getUserData = async (userId) => {
  // get user data is id
  const respons = await userAPI.getUserData(userId);
  debugger;
  return respons;
};
export const putUpdataUserData = async (userData, uploadPhotoAvaUser) => {
  // update user data
  let formData = new FormData();

  Object.keys(userData).forEach((key) => {
    if (userData[key].constructor === Array) {
      let arr = userData[key];
      for (let i = 0; i < arr.length; i++) {
        formData.append(`${key}[]`, arr[i]);
      }
    } else {
      formData.append(key, userData[key]);
    }
  });
  formData.append("image", uploadPhotoAvaUser);
  const respons = await profileAPI.updateUserData(formData, userData._id);
  return respons;
};
export const getEvents = async () => {
  // get events
  const respons = await eventsAPI.getEvents();
  return respons;
};
export const postNewEvent = async (id, eventData, file) => {
  // create event
  let formData = new FormData();
  Object.keys(eventData).forEach((key) => {
    if (eventData[key].constructor === Array) {
      let arr = eventData[key];
      for (let i = 0; i < arr.length; i++) {
        formData.append(`${key}[]`, arr[i]);
      }
    } else {
      formData.append(key, eventData[key]);
    }
  });
  formData.append("users[]", id);
  formData.append("ownerUser", id);
  formData.append("image", file);
  const respons = await eventsAPI.postEvent(formData);
  return respons;
};
export const getEvent = async (eventId) => {
  // get data event
  const respons = await eventsAPI.getEventProfile(eventId);
  return respons.data;
};
export const delEvent = async (eventId) => {
  // del event
  const respons = await eventsAPI.delEvent(eventId);
  return respons.data;
};
export const updateMemberEvent = async (newIdEvent, eventData) => {
  // update members events
  const respons = await eventsAPI.updateMemberEvent(
    newIdEvent,
    parsObjFormData(eventData)
  );
  return respons;
};
export const getMyEvents = async (id) => {
  // get user event
  const respons = await eventsAPI.getMyEvents(id);
  return respons;
};
export const postRegistrationUser = async (registrationData) => {
  //registration user
  const respons = await authAPI.postRegistrationUser(
    parsObjFormData(registrationData)
  );
  return respons;
};
export const postFiltrEvents = async (filtrData) => {
  // filter event
  const respons = await eventsAPI.postFiltrEvents(parsFilter(filtrData));
  return respons;
};
