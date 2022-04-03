import {
  SET_USER_DATA,
  SET_USER_AVA,
  SET_USER_ID,
  UPLOAD_PHOTO_AVA_USER,
  SET_USER_PHOTO_ID,
} from "../constants";

let initialState = {
  userData: {
    _id: "",
    email: "",
    name: "",
    surname: "",
    sex: "",
    age: "",
    status: "",
    aboutMe: "",
    imgAvatarId: "",
    createdAt: "",
    updatedAt: "",
  },
  img_1000_1000: "",
  user_id: "",
  uploadPhotoAvaUser: "",
};

const userProfileData = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: {
          _id: payload._id,
          email: payload.email,
          name: payload.name,
          surname: payload.surname,
          sex: payload.sex,
          age: payload.age,
          status: payload.status,
          aboutMe: payload.aboutMe,
          imgAvatarId: payload.imgAvatarId,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
        },
      };
    case SET_USER_AVA: //загрузить авку в стейт
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
    case SET_USER_PHOTO_ID:
      debugger;
      return {
        ...state,
        userData: { ...state.userData, imgAvatarId: payload },
      };
    default:
      return state;
  }
};

export default userProfileData;
