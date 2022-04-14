import { Avatar,Statistic, Button, Image, Input } from "antd";
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { AntDesignOutlined, AudioOutlined } from "@ant-design/icons";
//import Loader from '../Loader';
import { NavLink } from "react-router-dom";
import moment from "moment";
const { Countdown } = Statistic;

const Events = ({ events, u_id, addUserEvent, delUserEvent }) => {
  return (<React.Fragment>
    {events.map(
      ({
        _id,
        users,
        name,
        location,
        address,
        city,
        type,
        dateOfTheEvent,
        ageRestrictions,
        amountMaximum,
        imgAvatarId,
        createdAt,
        ownerUser
      }) => (
        <Row style={{ marginTop: "12px" }} key={_id}>
          <Col md={4} debug>
            <NavLink to={`` + _id}>
              <h1>{name}</h1>
            </NavLink>
            <p>Тип:{type}</p>
            <p>Возрастное ограничение:{ageRestrictions + " +"}</p>
            <p>Оставшиеся места:{amountMaximum}</p>
            <h6><p>Событие создано:{moment.utc(createdAt).format('DD/MM/YYYY')}</p></h6>
            <div style={{ marginTop: "20px" }}>

            </div>
          </Col>

          <Col md={4} debug>
            <p>Место:{address}</p>
            <p>Начало события:{moment.utc(dateOfTheEvent[0]).format('DD/MM/YYYY')}</p>
            <p>Окончание события:{moment.utc(dateOfTheEvent[1]).format('DD/MM/YYYY')}</p>
            <Countdown title="Событие начнёться через: " value={dateOfTheEvent[0]} format="D Д HH:mm:ss" onFinish={console.log("Старт!")} />
          </Col>

          <Col md={4} debug>
            <NavLink to={`profile/` + users}>
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
                src={imgAvatarId ? imgAvatarId : <AntDesignOutlined />}
              >
                {" "}
              </Avatar>
            </NavLink>
            {u_id === ownerUser ? <Button
              type="primary"
              //disabled={u_id === ownerUser}
              onClick={null}
            >
              Удалить событие
            </Button> : users.find(u => u === u_id) ?
              <Button
                type="primary"
                //disabled={amountMaximum <= 0}
                onClick={()=>delUserEvent(_id)}
              >
                Отказаться
              </Button> :
              <Button
                type="primary"
                disabled={amountMaximum <= 0}
                onClick={()=>addUserEvent(_id)}
              >
                Участвовать
              </Button>
            }
            {users.map(
              (u) => (
                <p>Участник:{u}</p>
              )
            )}

          </Col>
        </Row>
      )
    )}</React.Fragment>
  )
}
export default Events;