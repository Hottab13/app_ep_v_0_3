import { combineReducers } from 'redux';
import authUser from "./auth";
import userData from "./user";
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  form: formReducer,
  authUser,
  userData
});

export default reducer;
