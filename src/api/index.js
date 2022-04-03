import { authAPI, userAPI, profileAPI, eventsAPI  } from "./api";

export const getAuthTokenUser = async (auth) => {// дергаем токен по логину
  const respons = await authAPI.getAuthLogin(auth);
  return await respons.data;
};

export const getAuthData = async () => {// дергаем данные юзера по токену
  const respons = await userAPI.getAuthTokenUser();
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
  debugger
  return await respons.data;
}; 
export const putUpdataUserData = async (userData) => {// загружаем новое фото
  const respons = await profileAPI.updateUserData(userData);
  debugger
  return await respons;
};
export const getEvents = async () => {// дёргаем события
  const respons = await eventsAPI.getEvents();
  debugger
  return await respons.data;
};