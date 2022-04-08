import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import Paginator from "../common/FormControl/Paginater/Paginator";
import {getEvents} from "../../redux/actions/actionCreator";
import Events from "./Events/events";

const EventsContainer = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.eventsData);
  debugger;
  useEffect(() => {
    debugger;
    dispatch(getEvents());
  });
  /*const filter = useSelector((state: AppStateType) => state.nests.filter);
  const nests = useSelector((state: AppStateType) => state.nests.nests);
  const pagination = useSelector(
    (state: AppStateType) => state.nests.pagination
  );
  const loading = useSelector((state: AppStateType) => state.nests.isFetching);
  const dispatch = useDispatch();
  const handleTableChange = (paginationEdit: any) => {
    dispatch(getNests(paginationEdit, filter));
  };
  const onFilterCheang = (filter: FilterType) => {
    dispatch(getNests(pagination, filter));
  };*/
  return (
    <div>
    <Events
      events={events}/>
      </div>
  );
};
export default EventsContainer;