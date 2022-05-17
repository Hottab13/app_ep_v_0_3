import { fork, all } from "redux-saga/effects";
import { watchAuthUser, watchRegistrationUser } from "./auth";
import {
  watchAuthUserData,
  watchUserDataId,
  watchUploadPhotoUserAva,
} from "./user";
import {
  watchEvents,
  watchNewEvent,
  watchEventProfile,
  watchDelEvent,
  watchAddUserEvent,
  watchDelUserEvent,
  watchMyEvents,
  watchFiltrEvents,
} from "./event";

export default function* rootSaga() {
  yield all([
    fork(watchAuthUser),
    fork(watchAuthUserData),
    fork(watchUserDataId),
    fork(watchUploadPhotoUserAva),
    fork(watchEvents),
    fork(watchNewEvent),
    fork(watchEventProfile),
    fork(watchDelEvent),
    fork(watchAddUserEvent),
    fork(watchDelUserEvent),
    fork(watchMyEvents),
    fork(watchRegistrationUser),
    fork(watchFiltrEvents),
  ]);
}
