import React, { useEffect } from "react";
import classes from "./Profile.module.css";
import { EventProfile } from "./EventProfileInfo/EventProfileInfo.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import {
  getEventId,
  delEvent,
  uploadPhotoAva,
  setUserId,
} from "../../redux/actions/actionCreator";

export const EventProfileContainer = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userProfileData.userData._id);
  const event = useSelector((state) => state.events);
  const { eventId } = useParams();
  debugger;

  const hendlDelEvent = () => {
    debugger;
    dispatch(delEvent());
  };
  useEffect(() => {
    debugger;
    dispatch(getEventId(eventId));
  }, []);

  if (event.isToggleDelEventProfile) {
    debugger;
    return <Navigate to={"/events"} />;
  }
  return (
    <div className={classes.content}>
      <EventProfile
        isOwner={event.eventProfile.ownerUser === id}
        eventProfile={event.eventProfile}
        hendlDelEvent={hendlDelEvent}
        eventUserName={event.eventUserName}
      />
      {/*<MyPostsConainer />*/}
    </div>
  );
};
