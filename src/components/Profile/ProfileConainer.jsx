import React, { useEffect } from "react";
import classes from "./Profile.module.css";
import { PostInfo } from "./PostInfo/PostsInfo";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { setUserId, getUserData } from "../../redux/actions/actionCreator";
import { AUTH_USER_DATA } from "../../redux/constants";
import { uploadPhotoAva } from "../../redux/actions/actionCreator";
import { getAccessToken } from "axios-jwt";

export const Profile = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authUser);
  const profileUser = useSelector((state) => state.userProfileData);
  const { userId } = useParams();
  const refreshProfile = () => {
    // проверяем id в браузере, если есть сетаем id в стор и дергаем данные этого юзера
    if (userId) {
      dispatch(setUserId(userId)); // требуется рефакторинг, сделать 1 диспатч, добавить прилоудер
      dispatch(getUserData(userId));
    }
    if (accessToken) dispatch({ type: AUTH_USER_DATA }); // если id нету, значит дергаем данные по токену
  };
  const uploadPhoto = (imgData) => {
    dispatch(uploadPhotoAva(imgData));
  };
  useEffect(() => {
    debugger;
    refreshProfile();
  }, [profileUser.successUpdateUserData]);
  if (!auth.isAuth) return <Navigate to={"/login"} />;
  return (
    <React.Fragment className={classes.content}>
      <PostInfo
        isOwner={!userId}
        profileUser={profileUser.userData}
        uploadPhoto={uploadPhoto}
      />
    </React.Fragment>
  );
};
