import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {GET_EVENTS} from "../../redux/constants";
import {addUserEventAction, delUserEventAction} from "../../redux/actions/actionCreator";
import Events from "./Events/events";

const EventsContainer = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.eventsData); 
  const {eventProfile} = useSelector((state) => state.events);
  const {_id} = useSelector((state) => state.userProfileData.userData);
  const addUserEvent =(id)=>{
    dispatch(addUserEventAction(id))
  } 
  const delUserEvent =(id)=>{
    dispatch(delUserEventAction(id))
  } 
  useEffect(() => {
    debugger;
    dispatch({type:GET_EVENTS});
  },[eventProfile]);
  return (
    <React.Fragment>
      <Events
      delUserEvent={delUserEvent}
        addUserEvent={addUserEvent}
        u_id={_id}
        events={events} />
    </React.Fragment>
  );
};
export default EventsContainer;