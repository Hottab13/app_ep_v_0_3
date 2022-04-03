import Axios from "axios";
import { applyAuthTokenInterceptor, getAccessToken } from 'axios-jwt';
import {hendlErr} from "../utils/hendlErr"
const accessToken = getAccessToken();

const instance = Axios.create({
  withCredentials:true,// отправлять куки
  baseURL: "http://188.225.42.218:4741/api",
  responseType: "json",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'Authorization': accessToken ? `${accessToken}` : "",
  },
});

export const authAPI = {
  getAuthLogin(auth) {
    // аунтификация по логину
    return instance
      .post(`login/`, {
        email: auth.login,
        password: auth.pass,
      })
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
};

export const userAPI = {
  getAuthTokenUser() {
    // аунтификация по токену
    return instance
      .get(`token/`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
  getUserData(userId) {
    // дёрнуть данные юзера по id
    return instance
      .get(`user/${userId}`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
  getUserAvatar(imgId) {
    return instance
      .get(`img/${imgId}`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
};
export const profileAPI = {
  //загрузить новую авку юзера
  savePhoto(file) {
    return instance
      .post(`add-img/`, file)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
  updateUserData(userData) {
    // обновить данные юзера
    return instance
      .put(`edit-user/${userData._id}`, {
        imgAvatarId: userData.imgAvatarId,
        email: userData.email,
        surname: userData.surname,
        sex: userData.sex,
        age: userData.age,
        status: userData.status,
        aboutMe: userData.aboutMe,
        name: userData.name,
        age: userData.age,
      })
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
};

export const eventsAPI = {
  getEvents() {
    //дёрнуть массив событий
    return instance
      .get(`events/`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
  postEvent(id, eventData) {
    //создать событие
    debugger
    return instance
      .get(`events/`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
};
