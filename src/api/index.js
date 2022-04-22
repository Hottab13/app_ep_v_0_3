import { authAPI, userAPI, profileAPI, eventsAPI  } from "./api";
const FormData = require("form-data");

const parsObjFormData = (data) => {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key].constructor === Array) {
      let arr = data[key];
      for (let i = 0; i < arr.length; i++) {
        formData.append(`${key}[]`, arr[i]);
      }
    } else {
      formData.append(key, data[key])
    }
  })
  return formData;
}
export const getAuthTokenUser = async (auth) => {// дергаем токен по логину
  const respons = await authAPI.getAuthTokenUser(parsObjFormData(auth));
  debugger
  return respons;
};
export const getAuthData = async () => {// дергаем данные юзера по токену
  const respons = await userAPI.getAuthTokenUser();
  debugger
  return respons;
};
export const getUserData = async (userId) => {// дергаем данные юзера по id
  const respons = await userAPI.getUserData(userId);
  debugger
  return respons;
}; 
export const putUpdataUserData = async (userData,uploadPhotoAvaUser) => {// обновить данные юзера
  let formData = new FormData();

  Object.keys(userData).forEach((key) => {
    if (userData[key].constructor === Array) {
      let arr = userData[key];
      for (let i = 0; i < arr.length; i++) {
        formData.append(`${key}[]`, arr[i]);
      }
    } else {
      formData.append(key, userData[key])
    }
  })
  formData.append("image", uploadPhotoAvaUser);
  const respons = await profileAPI.updateUserData(formData,userData._id);
  debugger
  return respons;
};
export const getEvents = async () => {// дёргаем события
  const respons = await eventsAPI.getEvents();
  debugger
  return respons.data;
}; 
export const postNewEvent = async (id,eventData,file) => {// создаём событие
  let formData = new FormData();

  Object.keys(eventData).forEach((key) => {
    if (eventData[key].constructor === Array) {
      let arr = eventData[key];
      for (let i = 0; i < arr.length; i++) {
        formData.append(`${key}[]`, arr[i]);
      }
    } else {
      formData.append(key, eventData[key])
    }
  })
  formData.append("users[]", id);
  formData.append("ownerUser", id);
  formData.append("image", file);
  const respons = await eventsAPI.postEvent(formData);
  return  respons;
};
export const getEvent = async (eventId) => {// дёргаем профиль события
  const respons = await eventsAPI.getEventProfile(eventId);
  return  respons.data;
}; 
export const delEvent = async (eventId) => {// удаляем событие
  const respons = await eventsAPI.delEvent(eventId);
  debugger
  return  respons.data;
};
export const updateMemberEvent = async (newIdEvent,eventData) => {// обновление участников события
  const respons = await eventsAPI.updateMemberEvent(newIdEvent,parsObjFormData(eventData));
  return respons;
}; 
export const getMyEvents = async (id) => {// дёргаем мои события
  const respons = await eventsAPI.getMyEvents(id);
  return respons;
}; 
export const postRegistrationUser = async (registrationData) => {//регистрация юзера
  debugger
  const respons = await authAPI.postRegistrationUser(parsObjFormData(registrationData));
  debugger
  return respons;
}; 
export const postFiltrEvents = async (filtrData) => {//регистрация юзера
  debugger
  const respons = await eventsAPI.postFiltrEvents(parsObjFormData(filtrData));
  debugger
  return respons;
};