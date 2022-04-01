import{AUTH_USER, IS_AUTH_TRUE } from"../constants"

let initialState = {
        login:"",
        pass:"",
        isAuth:false
}

const authUser = (state = initialState, {type, payload}) => {
    switch (type) {
        case AUTH_USER:
            debugger
            return {
                ...state, 
                    login:payload.login,
                    pass:payload.pass,
              };
              case IS_AUTH_TRUE:
                  debugger
            return {
                ...state, 
                isAuth:true
              };
        default:
            return state
    }
}

export default authUser