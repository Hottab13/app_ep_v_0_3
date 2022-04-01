import { authAPI, userAPI  } from "./api"

export const getAuthTokenUser = async (auth) => {// дергаем токен по логину
  const respons = await authAPI.getAuthLogin(auth);
  debugger
  return await respons.data
};

export const getAuthData = async () => {// дергаем данные юзера по токену
  const respons = await userAPI.getAuthTokenUser()
  debugger
  return respons
}

export const getUserAvatar = async (imgAvatarId) => {// дерагем авку по id 
  const respons = await userAPI.getUserAvatar(imgAvatarId)
  const img_1000_1000 = respons.data.img_1000_1000.data.data;
  return await img_1000_1000
}

export const getUserData = async (userId) => {// дергаем данные юзера по id
  const respons = await userAPI.getUserData(userId);
  debugger
  return await respons
};