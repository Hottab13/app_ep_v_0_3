import React, { useEffect, useCallback  } from "react";
import classes from "./Profile.module.css";
import {PostInfo} from "./PostInfo/PostsInfo";
//import MyPostsConainer from "./MyPosts/MyPostsContainer";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { setUserId, getUserData } from "../../redux/actions/actionCreator"; 
import { AUTH_USER_DATA} from "../../redux/constants";
import {uploadPhotoAva} from "../../redux/actions/actionCreator";
import {  message, Spin } from 'antd';

export const Profile = () => {
  debugger
  const dispatch = useDispatch();
  //const auth = useSelector((state)=>state.authUser);
  const profileUser = useSelector((state)=>state.userProfileData);
  const { userId } = useParams();

  //if(authUser.isAuth) return <Navigate to={"/login"}/>
  const refreshProfile = () => {// проверяем id в браузере, если есть сетаем id в стор и дергаем данные этого юзера
    if (userId) {
      dispatch(setUserId(userId));// требуется рефакторинг, сделать 1 диспатч, добавить прилоудер
      dispatch(getUserData(userId));
    }
    // dispatch({type:AUTH_USER_DATA});// если id нету, значит дергаем данные по токену
  }
  const uploadPhoto=(imgData)=>{
    dispatch(uploadPhotoAva(imgData)); 
  }
  useEffect(() => {
    refreshProfile();
  },[profileUser]);
  return (
    <div className={classes.content}>
        <PostInfo
          isOwner={!userId}
          profileUser={profileUser.userData}
          uploadPhoto={uploadPhoto}
        />
    </div>
  );
}

