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
  EVENT_USER_NAME
} from "../constants";

let initialState = {
  eventsData: [],
  newEvents: {},
  getEventProfile: "",
  eventProfile: {
    ownerUser: "",
    name: "",
    locationLat: "",
    locationLon: "",
    address: "",
    city: "",
    type: "",
    dateOfTheEvent:"",
    ageRestrictions: "",
    amountMaximum: "",
    description: "",
    imgAvatarId: "",
    users: ""
  },
  delEventProfile:false,
  isToggleLoading:false,
  message:"",
  isToggleErr:false,
  isToggleSuccess:false,
eventUserName:{
  name:"",
  surname:""
}
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
          locationLat:payload.locationLat,
          locationLon:payload.locationLon,
          address:payload.address,
          city:payload.city,
          type:payload.type,
          dateOfTheEvent:payload.dateOfTheEvent,
          ageRestrictions:payload.ageRestrictions,
          amountMaximum:payload.amountMaximum,
          description:payload.description,
          imgAvatarId:payload.imgAvatarId,
          users:payload.users
        },
        delEventProfile:false
      }; 
      case DEL_EVENT:
      return {
        ...state,
        eventProfile: {...payload},
        delEventProfile:true
      };
    default:
      return state;
  };
};

export default events;