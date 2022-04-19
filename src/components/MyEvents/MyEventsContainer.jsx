import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {GET_MY_EVENTS} from "../../redux/constants";
import {addUserEventAction, delUserEventAction} from "../../redux/actions/actionCreator";
import Events from "../Events/Events/events";

const MyEventsContainer = () => {
  const dispatch = useDispatch();
  const {isToggleLoading} = useSelector((state) => state.authUser); 
  const events = useSelector((state) => state.events.eventsData); 
  const {successUpdateMemberEvent} = useSelector((state) => state.events);
  const {_id} = useSelector((state) => state.userProfileData.userData);
  const addUserEvent =(id)=>{
    dispatch(addUserEventAction(id))
  } 
  const delUserEvent =(id)=>{
    dispatch(delUserEventAction(id))
  } 
  useEffect(() => {
    debugger;
    dispatch({type:GET_MY_EVENTS});
  },[]);
  return (
    <React.Fragment>
      <Events
      delUserEvent={delUserEvent}
        addUserEvent={addUserEvent}
        u_id={_id}
        events={events} 
        isToggleLoading={isToggleLoading}/>
    </React.Fragment>
  );
};
export default MyEventsContainer;