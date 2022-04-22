import { Avatar,Statistic, Button, Image, Pagination } from "antd";
import React,{useState,Fragment} from 'react';
import { Container, Row, Col } from 'react-grid-system'; 
import { _arrayBufferToBase64 } from '../../../utils/arrayBufferToBase64';
import { AntDesignOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import {Filtr} from "./Filter/Filter"
const { Countdown } = Statistic;

const dateInRange = (start, end) => {
  const date = new Date();
  return moment.utc(start).format('DD/MM/YYYY').valueOf()
    <= moment.utc(date).format('DD/MM/YYYY').valueOf()
    && moment.utc(date).format('DD/MM/YYYY').valueOf()
    <= moment.utc(end).format('DD/MM/YYYY').valueOf()
}

const Events = ({ events, u_id, addUserEvent, delUserEvent, isToggleLoading, error }) => {
  const numEachPage = 6;
  const [minValue, setMinValPage] = useState(0);
  const [maxValue, setMaxValPage] = useState(6);
  const handleChange = (value) => {
    setMinValPage((value - 1) * numEachPage)
    setMaxValPage(value * numEachPage)
  }
  if (!events || events.length === 0) {
    return error ? <h2>{error}</h2> : null;
  }
  return (<Fragment>
    <Container fluid>
    <Filtr />
      <Row align="start" style={{ marginTop: "12px" }} >
        {events.slice(minValue, maxValue).map(
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
            imgAvatar,
            createdAt,
            ownerUser
          }) => (
            <Col md={4} key={_id} style={{ padding: "5px" }} debug>
              <Row  >
                <Col md={7} >
                  <Link to={`` + _id}>
                    <h1>{name}</h1>
                  </Link>
                  <Countdown
                  style={dateInRange(dateOfTheEvent[0],dateOfTheEvent[1])?{backgroundColor: "#87d068" }:{}}
                    title={dateInRange(dateOfTheEvent[0],dateOfTheEvent[1])?
                      "Событие началось: " :
                      "Событие начнёться через: "}
                    value={dateInRange(dateOfTheEvent[0],dateOfTheEvent[1])?
                      dateOfTheEvent[1]:dateOfTheEvent[0]}
                    format="D Д HH:mm:ss"
                    onFinish={console.log("Старт!")} />
                </Col>
                <Col md={5} >
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
                    src={`data:image/jpg;base64,${_arrayBufferToBase64(imgAvatar?.img_200_200?.data?.data)}` || <AntDesignOutlined />}
                  />
                  {u_id === ownerUser ? <Button
                    type="primary"
                    size="small"
                    //disabled={u_id === ownerUser}
                    onClick={null}
                  >
                    Удалить
                  </Button> : users.find(u => u === u_id) ?
                    <Button
                      type="primary"
                      size="small"
                      disabled={isToggleLoading | dateInRange(dateOfTheEvent[0],dateOfTheEvent[1])}
                      onClick={() => delUserEvent(_id)}
                    >
                      Отказаться
                    </Button> :
                    <Button
                      type="primary"
                      size="small"
                      disabled={amountMaximum <= 0 | isToggleLoading |dateInRange(dateOfTheEvent[0],dateOfTheEvent[1])}
                      onClick={() => addUserEvent(_id)}
                    >
                      Участвовать
                    </Button>
                  }
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  Места:<b>{amountMaximum}</b>
                </Col>
                <Col md={4}>
                  Участники: <b>{users.length}</b>
                </Col>
                <Col md={5}>
                  Ограничения:<b>{ageRestrictions + " +"}</b>
                </Col>
              </Row>
              {/*users.map(
              (u) => (
                <p>Участник:{u}</p>
              )
              )*/}
              <Row>
                <Col md={6}>
                  <h6>Тип:{type}<br />
                    Адресс:{city + "," + address}</h6>
                </Col>
                <Col md={6}>
                  <h6>Дата:{moment.utc(dateOfTheEvent[0]).format('DD/MM/YYYY')} - {moment.utc(dateOfTheEvent[1]).format('DD/MM/YYYY')}<br />
                    Событие создано:{moment.utc(createdAt).format('DD/MM/YYYY')}</h6>
                </Col>
              </Row>
            </Col>

          )
        )}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          onChange={handleChange}
          total={events.length} //total number of card data available
        />
      </Row>
    </Container>
  </Fragment>
  )
}
export default Events;