import {
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
  IS_TOGGLE_DEL_EV_FALSE,
  ADD_USER_EVENT,
  ADD_USER_ID_EVENT,
  DEL_USER_EVENT,
  DEL_USER_ID_EVENT,
  UPLOAD_PHOTO_AVA_EVENT,
  SUCCESS_UPDATE_MEMBER_EVENT
} from "../constants";

let initialState = {
  eventsData: [],
  newEvents: {
    imgAvatar: ""
  },
  getEventProfile: "",
  eventProfile: {
    ownerUser: "",
    name: "",
    //locationLat: "",
    //locationLon: "",
    address: "",
    city: "",
    type: "",
    dateOfTheEvent: "",
    ageRestrictions: "",
    amountMaximum: "",
    description: "",
    imgAvatar: "",
    users: [""]
  },
  isToggleDelEventProfile: false,
  isToggleLoading: false,
  message: "",
  isToggleErr: false,
  isToggleSuccess: false,
  eventUserName: {
    name: "",
    surname: ""
  },
  newIdEvent: "", // id события в котором юзер хочет участвовать
  uploadPhotoAvaEvent: "",
  addUsersEvent: { // массив юзеров принадлежащих к событию
    users: "",
    amountMaximum: ""
  },
  successUpdateMemberEvent: false
};

const events = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case SET_EVENTS:
      return {
        ...state,
        eventsData: [...payload],
        isToggleDelEventProfile:false
      }; 
      case EVENT_USER_NAME:
      return {
        ...state,
        eventUserName: {
          name:payload.name,
          surname:payload.surname
        },
      };
      case ERR_EVENT:
      debugger
      return {
        ...state,
        message: payload,
        isToggleErr:true
      };
      case CLEAR_TOGGLE:
      debugger
      return {
        ...state,
        message:"",
        isToggleErr:false,
        isToggleSuccess:false
      };
      case SUCCESS_EVENT:
        debugger
        return {
          ...state,
          message: payload,
          isToggleSuccess:true
        };
    case SET_NEW_EVENT:
      return {
        ...state,
        newEvents: {
          ...state.newEvents,
          ...payload
        },
        isToggleLoading:true
      }; 
    case GET_EVENT_PROFILE:
      return {
        ...state,
        getEventProfile: payload
      };
      case IS_TOGGLE_LOADING:
  debugger
      return {
        ...state,
        isToggleLoading: payload
      };
    case SET_EVENT_PROFILE:
      return {
        ...state,
        eventProfile: {
          ownerUser:payload.ownerUser,
          name:payload.name,
          //locationLat:payload.locationLat,
          //locationLon:payload.locationLon,
          address:payload.address,
          city:payload.city,
          type:payload.type,
          dateOfTheEvent:payload.dateOfTheEvent,
          ageRestrictions:payload.ageRestrictions,
          amountMaximum:payload.amountMaximum,
          description:payload.description,
          imgAvatar:payload.imgAvatar || "",
          users:payload.users
        },
      }; 
      case DEL_EVENT:
      return {
        ...state,
        eventProfile: {...payload},
        isToggleDelEventProfile:true
      };
      case IS_TOGGLE_DEL_EV_FALSE:
        return {
          ...state,
          isToggleDelEventProfile:false
        };
        case ADD_USER_EVENT:
        return {
          ...state,
          newIdEvent:payload
        }; 
        case DEL_USER_EVENT:
        return {
          ...state,
          newIdEvent:payload
        }; 
        case ADD_USER_ID_EVENT:
          debugger
        return {
          ...state,
          addUsersEvent: {
            ...state.addUsersEvent,
            users: [
              ...state.eventsData.find(id => id._id === state.newIdEvent).users,
              payload
            ],
            amountMaximum: state.eventsData.find(id => id._id === state.newIdEvent).amountMaximum - 1
          }
        };
        case DEL_USER_ID_EVENT:
          debugger
        return {
          ...state,
          addUsersEvent: {
            ...state.addUsersEvent,
            users: [
              ...state.eventsData.find(id => id._id === state.newIdEvent).users.filter(id => id !== payload)
            ],
            amountMaximum: state.eventsData.find(id => id._id === state.newIdEvent).amountMaximum + 1
          }
        };
        case UPLOAD_PHOTO_AVA_EVENT:
          debugger
        return {
          ...state,
          uploadPhotoAvaEvent:payload
        }; 
        case SUCCESS_UPDATE_MEMBER_EVENT:
          debugger
        return {
          ...state,
          successUpdateMemberEvent: !state.successUpdateMemberEvent
        };
    default:
      return state;
  };
};

export default events;