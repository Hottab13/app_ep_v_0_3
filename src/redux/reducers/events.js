import{SET_EVENTS, SET_NEW_EVENT  } from"../constants";

let initialState = {
   eventsData:[],
   newEvents:{}
};

const events = (state = initialState, {type,payload}) => {
    switch (type) {
      case SET_EVENTS:
        debugger
        return {
          ...state,
          eventsData: [...state.eventsData, ...payload],
        }; 
        case SET_NEW_EVENT:
        debugger;
        return {
          ...state,
          newEvents: { ...state.newEvents,...payload 
          },
        };
     /* case SET_USER_AVA: //загрузить авку в стейт
        debugger;
        return {
          ...state,
          img_1000_1000: payload,
        };
      case SET_USER_ID: // загрузить данные юзера по id
        return {
          ...state,
          user_id: payload,
        };
      case UPLOAD_PHOTO_AVA_USER: // засетать новую фотку в стор
        debugger;
        return {
          ...state,
          uploadPhotoAvaUser: payload,
        };
      */
      default:
        return state;
    };
};

export default events;