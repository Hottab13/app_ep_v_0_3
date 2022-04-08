import {
  AUTH_USER,
  AUTH_USER_DATA,
  IS_AUTH_TRUE,
  SET_USER_DATA,
  SET_USER_AVA,
  GET_USER_DATA,
  SET_USER_ID,
  UPLOAD_PHOTO_AVA_USER,
  SET_USER_PHOTO_ID,
  GET_EVENTS,
  SET_EVENTS,
  SET_NEW_EVENT,
  GET_EVENT_PROFILE,
  SET_EVENT_PROFILE,
  DEL_EVENT,
  IS_TOGGLE_LOADING,
  ERR_EVENT,
  SUCCESS_EVENT,
  CLEAR_TOGGLE,
  EVENT_USER_NAME,
  LOGIN_OUT,
  IS_TOGGLE_LOADING_AUTH,
  ERR_AUTH,
  CLEAR_TOGGLE_AUTH
} from "../constants";

export const loginUser =(payload)=>({// данные авторизации
  type:AUTH_USER,
  payload
});
export const getAusUserData =()=>({ // дергать данные юзера по токену
  type:AUTH_USER_DATA,
});
export const getIsAuthTrue =()=>({// включить авторизацию
  type:IS_AUTH_TRUE,
}); 
export const setUserData =(payload)=>({ // сохарнить данные юзера в стейт
  type:SET_USER_DATA,
  payload
}); 
export const setUserAvatar =(payload)=>({ // засетать авку по id
  type:SET_USER_AVA,
  payload
});
export const getUserData =()=>({ //дернуть данные юзера по id по id
  type:GET_USER_DATA,
}); 
export const setUserId =(payload)=>({ //засетать id юзера по id
  type:SET_USER_ID,
  payload
});
export const uploadPhotoAva =(payload)=>({ //загрузить авку
  type:UPLOAD_PHOTO_AVA_USER,
  payload
}); 
export const setUserPhotoId =(payload)=>({ //засетать новое id
  type:SET_USER_PHOTO_ID,
  payload
}); 
export const getEvents =()=>({ //дёрнуть события
  type:GET_EVENTS,
}); 
export const setEvents =(payload)=>({ //дёрнуть события
  type:SET_EVENTS,
  payload
}); 
export const setNewEvent =(payload)=>({ //создать новое событие
  type:SET_NEW_EVENT,
  payload,
}); 
export const getEventId =(payload)=>({ //дёрнуть профиль события
  type:GET_EVENT_PROFILE,
  payload,
}); 
export const setEventProfile =(payload)=>({ //засетать данные события профиля
  type:SET_EVENT_PROFILE,
  payload,
}); 
export const delEvent =(payload)=>({ //удалить событие
  type:DEL_EVENT,
  payload,
}); 
export const isToggleLoading =(payload)=>({ //переключатель загрузки
  type:IS_TOGGLE_LOADING,
  payload,
}); 
export const errEvent =(payload)=>({ //ошибка с ответом
  type:ERR_EVENT,
  payload,
}); 
export const successEvent =(payload)=>({ //успех с ответом
  type:SUCCESS_EVENT,
  payload,
}); 
export const clearToggle =()=>({ //очистить проверку
  type:CLEAR_TOGGLE,
}); 
export const eventUserName =(payload)=>({ //очистить проверку
  type:EVENT_USER_NAME,
  payload
}); 
export const logOut =()=>({ //разлогиниться
  type:LOGIN_OUT,
});
export const isToggleLoadingAuth =(payload)=>({ //откл прелоудер
  type:IS_TOGGLE_LOADING_AUTH,
  payload
});
export const errAuth =(payload)=>({ //ошибка и её сообщение
  type:ERR_AUTH,
  payload
}); 
export const clearToggleAuth =()=>({ //ошибка и её сообщение
  type:CLEAR_TOGGLE_AUTH
});