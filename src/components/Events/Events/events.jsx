import { Avatar, Button, Image, Input } from "antd";
import { Container, Row, Col } from 'react-grid-system';
import { AntDesignOutlined, AudioOutlined } from "@ant-design/icons";
//import Loader from '../Loader';
import { NavLink } from "react-router-dom";

const Events =({events})=>{


    return(<div>
{events.map(
        ({
          _id,
          users,
          name,
          location,
          address,
          city,
          type,
          finalData,
          ageRestrictions,
          amountMaximum,
          imgAvatarId,
          createdAt,
        }) => (
          <Row  style={{ marginTop: "12px" }}>
            <Col md={5} debug>
              <NavLink to={`events/` + _id}>
                <h1>{name || ""}</h1>
        </NavLink>
              <p>Тип:{type || ""}</p>
              <p>Возрастное ограничение:{ageRestrictions || ""}</p>
              <p>Мест:{amountMaximum || ""}</p>
              <p>Дата создания:{createdAt || ""}</p>
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
          )*/}
              </div>
            </Col>

            <Col md={4} debug>
              <p>Место:{address || ""}</p>
              <p>Дата:{finalData || ""}</p>
            </Col>

            <Col md={3} debug>
              <NavLink to={`profile/` + users || ""}>
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
            </Col>
          </Row>
        )
      )}</div>
    )
}
export default Events;