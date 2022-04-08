import {
    AUTH_USER,
    IS_AUTH_TRUE,
    LOGIN_OUT,
    IS_TOGGLE_LOADING_AUTH,
    ERR_AUTH,
    CLEAR_TOGGLE_AUTH
} from "../constants"

let initialState = {
    login: "",
    pass: "",
    isAuth: false,
    isToggleLoading: false,
    message: "",
    isToggleErr: false,
}

const authUser = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case AUTH_USER:
            debugger
            return {
                ...state,
                login: payload.login,
                    pass: payload.pass,
                    isToggleLoading: true
            };
        case IS_AUTH_TRUE:
            debugger
            return {
                ...state,
                isAuth: true
            };
        case CLEAR_TOGGLE_AUTH:
            debugger
            return {
                ...state,
                isToggleErr: false
            };
        case ERR_AUTH:
            debugger
            return {
                ...state,
                message: payload,
                    isToggleErr: true
            };
        case IS_TOGGLE_LOADING_AUTH:
            debugger
            return {
                ...state,
                isToggleLoading: false
            };
        case LOGIN_OUT:
            debugger
            return {
                ...state,
                login: "",
                    pass: "",
                    isAuth: false
            };
        default:
            return state
    }
}

export default authUser