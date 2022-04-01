import{SET_USER_DATA, SET_USER_AVA, SET_USER_ID } from"../constants"

let initialState = {
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
    img_1000_1000:"",
    user_id:""
}

const userData = (state = initialState, {type,payload}) => {
    switch (type) {
        case SET_USER_DATA:
            return {
                ...state,
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
            };
        case SET_USER_AVA:
            debugger
            return {
                ...state,
                img_1000_1000: payload
            };
            case SET_USER_ID:
            return {
                ...state,
                user_id: payload
            };
        default:
            return state
    }
}

export default userData