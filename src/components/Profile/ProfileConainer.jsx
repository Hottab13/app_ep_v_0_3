import React, { useEffect, useCallback  } from "react";
import classes from "./Profile.module.css";
import {PostInfo} from "./PostInfo/PostsInfo";
//import MyPostsConainer from "./MyPosts/MyPostsContainer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAccessToken } from "axios-jwt";
import { getAusUserData, getUserData, setUserId } from "../../redux/actions/actionCreator";

export const Profile = () => {
  const accessToken = getAccessToken()
  const dispatch = useDispatch();
const uploadPhotoAva =(file)=>{
  debugger
}
  const postUser = useSelector((state)=>state?.userData)
  const {img_1000_1000} =useSelector((state)=>state?.userData)
  let { userId } = useParams()
  const refreshProfile = () => {
    if (!userId) {
      if (accessToken) {
        dispatch(getAusUserData())
      }
    } else {
      dispatch(setUserId(userId))
    }
    dispatch(getUserData())
    
  }
  useEffect(() => {
    refreshProfile()
  }, []);
  return (
    <div className={classes.content}>
      <PostInfo 
      isOwner={!userId}
      postUser={postUser}
      img_1000_1000={img_1000_1000}
      uploadPhotoAva={uploadPhotoAva} />
      {/*<MyPostsConainer />*/}
    </div>
  );
}

