import {
  AUTH_USER,
  AUTH_USER_DATA,
  IS_AUTH_TRUE,
  SET_USER_DATA,
  SET_USER_AVA,
  GET_USER_DATA,
  SET_USER_ID
} from "../constants";

export const loginUser =(payload)=>({// данные авторизации
  type:AUTH_USER,
  payload
})
export const getAusUserData =()=>({ // дергать данные юзера по токену
  type:AUTH_USER_DATA,
})
export const getIsAuthTrue =()=>({// включить авторизацию
  type:IS_AUTH_TRUE,
}) 
export const setUserData =(payload)=>({ // сохарнить данные юзера в стейт
  type:SET_USER_DATA,
  payload
}) 
export const setUserAvatar =(payload)=>({ // засетать авку по id
  type:SET_USER_AVA,
  payload
})
export const getUserData =()=>({ //дернуть данные юзера по id по id
  type:GET_USER_DATA,
}) 
export const setUserId =(payload)=>({ //засетать id юзера по id
  type:SET_USER_ID,
  payload
})