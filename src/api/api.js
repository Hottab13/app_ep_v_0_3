import Axios from "axios";
import { applyAuthTokenInterceptor, getAccessToken } from 'axios-jwt';
import {hendlErr} from "../utils/hendlErr"
const accessToken = getAccessToken();

const instance = Axios.create({
  withCredentials:true,// отправлять куки
  //baseURL: "http://188.225.42.218:4741/api",
  baseURL: "http://localhost:4741/api",
  responseType: "json",
  headers: {
    'Accept': 'application/json',
    //'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    'Authorization': accessToken ? `${accessToken}`:" ",
  },
});

export const authAPI = {
  getAuthLogin(auth) {
    debugger
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
  /*getUserAvatar(imgId) {
    return instance
      .get(`img/${imgId}`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },*/
};
export const profileAPI = {
  updateUserData(formData,id) {
    // обновить данные юзера
    debugger
    return instance
      .put(`edit-user/${id}`,formData )
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
  getEventProfile(eventId) {
    //дёрнуть профиль события
    return instance
      .get(`event/${eventId}`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
   postEvent(formData) {
    debugger
    //создать событие
    return  instance
      .post(`add-event/`,formData)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
  delEvent(eventId) {
    //удаляем событие
    return instance
      .delete(`event/${eventId}`)
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
  updateEventData(newIdEvent,eventData) {
    debugger
    //обновить событие надо сделать тут
    return instance
      .put(`edit-event/${newIdEvent}`, {
        ownerUser: eventData.ownerUser,
        name: eventData.name,
        locationLat:"54.19484846374912",
        locationLon:"45.182281439192195",
        address: eventData.address,
        city: eventData.city,
        type: eventData.type,
        dateOfTheEvent: eventData.dateOfTheEvent,
        ageRestrictions: eventData.ageRestrictions,
        amountMaximum: eventData.amountMaximum,
        description:eventData.description,
        imgAvatarId:eventData.imgAvatarId,
        users:eventData.users
      })
      .then((res) => res)
      .catch((err) => hendlErr(err));
  },
};
