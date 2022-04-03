import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//import Paginator from "../common/FormControl/Paginater/Paginator";
import {getEvents} from "../../redux/actions/actionCreator";
import { Avatar, Button, Image, Input } from "antd";
import { Container, Row, Col } from 'react-grid-system';
import { AntDesignOutlined, AudioOutlined } from "@ant-design/icons";
//import Loader from '../Loader';
import { Table, Tag, Space,Tooltip } from 'antd';

export const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state)=>state.events);
  debugger
useEffect(() => {
  debugger
    dispatch(getEvents());
}, []);
 
  /*const filter = useSelector((state: AppStateType) => state.nests.filter);
  const nests = useSelector((state: AppStateType) => state.nests.nests);
  const pagination = useSelector(
    (state: AppStateType) => state.nests.pagination
  );
  const loading = useSelector((state: AppStateType) => state.nests.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getUsersThunkCreator(currentPage, pageSaze, filter));
    dispatch(getNests(pagination, filter));
  }, []);

  const handleTableChange = (paginationEdit: any) => {
    dispatch(getNests(paginationEdit, filter));
  };
  const onFilterCheang = (filter: FilterType) => {
    dispatch(getNests(pagination, filter));
  };*/
  return (<div>
    {/*events.map(({u}) => (
    <Row key={u.id} style={{ marginTop: "12px" }}>
      <Col md={5} debug>
        <NavLink to={`profile/` + u.id}>
          <h1>{u.name}</h1>
        </NavLink>
        <p>Тип:{u.type}</p>
        <p>Возрастное ограничение:{u.ageRestrictions}</p>
        <p>Мест:{u.amountMaximum}</p>
        <div style={{ marginTop: "20px" }}>
          {/*u.followed ? (
          <Button
            disabled={followingInProgress.some(
              (id) => id === u.id
            )}
            onClick={() => {
              unfollowinFC(u.id);
            }}
          >
            Отписаться
          </Button>
        ) : (
          <Button
            type="primary"
            disabled={followingInProgress.some(
              (id) => id === u.id
            )}
            onClick={() => {
              followingFC(u.id);
            }}
          >
            Подписаться
          </Button>
          )}
        </div>
      </Col>

      <Col md={4} debug>
        <p>Место:{u.location}</p>
        <p>Дата:{u.date}</p>
        <p>Время:{u.time}</p>
      </Col>

      <Col md={3} debug>
        <NavLink to={`profile/` + u.user.id}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            src={
              u.photos.small != null ? u.photos.small : <AntDesignOutlined />
            }
          >
            {" "}
            {u.user.name}
          </Avatar>
        </NavLink>
      </Col>
    </Row>
          ))*/}</div>);
};
//export default Users style={{border:"1px solid #ccc", borderRadius: "2%"}}