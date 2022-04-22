import {
  SET_USER_DATA,
  SET_USER_ID,
  UPLOAD_PHOTO_AVA_USER,
  SUCCESS_UPDATE_USER_DATA,
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
    imgAvatar: "",
    createdAt: "",
    updatedAt: "",
    password: "",
  },
  user_id: "", //хранилище id юзера
  uploadPhotoAvaUser: "", // хранилище новой фотки
  successUpdateUserData: false, // перменная успеха обновления данных
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
          imgAvatar: payload.imgAvatar,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
          password: payload.password,
        },
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
    case SUCCESS_UPDATE_USER_DATA: // успех обновления
      debugger;
      return {
        ...state,
        successUpdateUserData: !state.successUpdateUserData,
      };
    default:
      return state;
  }
};

export default userProfileData;
