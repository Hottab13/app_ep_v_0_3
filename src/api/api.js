import Axios from "axios";
import { applyAuthTokenInterceptor, getAccessToken } from 'axios-jwt';
const accessToken = getAccessToken()
const instance = Axios.create({
  withCredentials:true,// отправлять куки
  baseURL: "http://188.225.42.218:4741/api",
  responseType: "json",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': accessToken ? `${accessToken}` : "",
  },
});
const instanceImg = Axios.create({
  withCredentials:true,// отправлять куки
  baseURL: "http://188.225.42.218:4741/api",
  responseType: "json",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'Authorization': accessToken ? `${accessToken}` : "",
   // Authorization: 'Bearer ' + token
  },
});

export const authAPI = {
  getAuthLogin(auth) {
    return instance
      .post(`login/`, {
        email:auth.login,
        password:auth.pass,
      })
      .then((res) => res)
      .catch((err) => {
        if (err.response) {
          console.log("клиент получил ответ об ошибке (5xx, 4xx)");
          console.log(err.response);
        } else if (err.request) {
          console.log(
            "клиент так и не получил ответа, или запрос так и не ушел "
          );
          console.log(err.request);
        } else {
          console.log("неизвестная причина");
        }
      });
  },
 
};

export const userAPI = {
  getAuthTokenUser() {
    return instance
      .get(`token/`)
      .then((res) => res)
      .catch((err) => {
        if (err.response) {
          console.log("клиент получил ответ об ошибке (5xx, 4xx)");
          console.log(err.response);
        } else if (err.request) {
          console.log(
            "клиент так и не получил ответа, или запрос так и не ушел "
          );
          console.log(err.request);
        } else {
          console.log("неизвестная причина");
        }
      });
  },
  getUserData(userId) {
    debugger
      return instance
        .get(`user/${userId}`)
        .then((res) => res)
        .catch((err) => {
          if (err.response) {
            console.log("клиент получил ответ об ошибке (5xx, 4xx)");
            console.log(err.response);
          } else if (err.request) {
            console.log(
              "клиент так и не получил ответа, или запрос так и не ушел "
            );
            console.log(err.request);
          } else {
            console.log("неизвестная причина");
          }
        });
    },
    getUserAvatar(imgId) {
      return instance
        .get(`img/${imgId}`)
        .then((res) => res)
        .catch((err) => {
          if (err.response) {
            console.log("клиент получил ответ об ошибке (5xx, 4xx)");
            console.log(err.response);
            alert(err.response.data.detail);
          } else if (err.request) {
            console.log(
              "клиент так и не получил ответа, или запрос так и не ушел "
            );
            console.log(err.request);
          } else {
            console.log("неизвестная причина");
          }
        });
    },
};
export const profileAPI = {
  savePhoto(file) {
    debugger
    return instanceImg
      .post(`add-img/`,file)
      .then((res) => res)
      .catch((err) => {
        if (err.response) {
          console.log("клиент получил ответ об ошибке (5xx, 4xx)");
          console.log(err.response);
        } else if (err.request) {
          console.log(
            "клиент так и не получил ответа, или запрос так и не ушел "
          );
          console.log(err.request);
        } else {
          console.log("неизвестная причина");
        }
      });
  },
  updateIdImg(name,surname) {
    debugger
    return instance
      /*.put(`edit-user/${userType.id}`,{
        imgAvatarId: userType.imgAvatarId,
        email:userType.email,
        surname:userType.surname,
        sex:userType.sex,
        age:userType.age,
        status:userType.status,
        aboutMe:userType.aboutMe
      }
      )
      .then((res) => res)
      .catch((err) => {
        if (err.response) {
          console.log("клиент получил ответ об ошибке (5xx, 4xx)");
          console.log(err.response);
        } else if (err.request) {
          console.log(
            "клиент так и не получил ответа, или запрос так и не ушел "
          );
          console.log(err.request);
        } else {
          console.log("неизвестная причина");
        }
      });*/
  },
};