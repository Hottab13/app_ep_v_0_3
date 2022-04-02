import { combineReducers } from 'redux';
import authUser from "./auth";
import userProfileData from "./user";
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  form: formReducer,
  authUser,
  userProfileData
});

export default reducer;
