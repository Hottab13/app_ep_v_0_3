import React, { useEffect, useCallback  } from "react";
import classes from "./Profile.module.css";
import {PostInfo} from "./PostInfo/PostsInfo";
//import MyPostsConainer from "./MyPosts/MyPostsContainer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setUserId, getUserData } from "../../redux/actions/actionCreator"; 
import {uploadPhotoAva} from "../../redux/actions/actionCreator";
import {  message } from 'antd';

export const Profile = () => {
  const dispatch = useDispatch();
  const postUser = useSelector((state)=>state.userProfileData);
  const { userId } = useParams();

  const refreshProfile = () => {
    if (userId) {
      dispatch(setUserId(userId));
      dispatch(getUserData(userId));
    }
    //dispatch({type:AUTH_USER_DATA});
  }

  const uploadPhoto=(imgData)=>{
    dispatch(uploadPhotoAva(imgData));
  }
  useEffect(() => {
    refreshProfile();
  },[]);
 
  return (
    <div className={classes.content}>
      <PostInfo 
      isOwner={!userId}
      postUser={postUser.userData}
      imgAva={postUser}
      uploadPhoto={uploadPhoto}
      />
      {/*<MyPostsConainer />*/}
    </div>
  );
}

