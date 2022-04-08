import { authAPI, userAPI, profileAPI, eventsAPI  } from "./api";

export const getAuthTokenUser = async (auth) => {// дергаем токен по логину
  const respons = await authAPI.getAuthLogin(auth);
  debugger
  return await respons;
};

export const getAuthData = async () => {// дергаем данные юзера по токену
  const respons = await userAPI.getAuthTokenUser();
  debugger
  return await respons;
};

export const getUserAvatar = async (imgAvatarId) => {// дерагем авку по id 
  const respons = await userAPI.getUserAvatar(imgAvatarId);
  const img_1000_1000 = respons.data.img_1000_1000.data.data;
  return await img_1000_1000;
};

export const getUserData = async (userId) => {// дергаем данные юзера по id
  const respons = await userAPI.getUserData(userId);
  return await respons;
}; 
export const postUserAva = async (file) => {// загружаем новое фото
  const respons = await profileAPI.savePhoto(file);
  return await respons.data;
}; 
export const putUpdataUserData = async (userData) => {// загружаем новое фото
  const respons = await profileAPI.updateUserData(userData);
  return await respons;
};
export const getEvents = async () => {// дёргаем события
  const respons = await eventsAPI.getEvents();
  return await respons.data;
}; 
export const postNewEvent = async (id,eventData) => {// создаём событие
  const respons = await eventsAPI.postEvent(id,eventData);
  return await respons;
};
export const getEvent = async (eventId) => {// дёргаем профиль события
  const respons = await eventsAPI.getEventProfile(eventId);
  return await respons.data;
}; 
export const delEvent = async (eventId) => {// удаляем событие
  const respons = await eventsAPI.delEvent(eventId);
  debugger
  return await respons.data;
};