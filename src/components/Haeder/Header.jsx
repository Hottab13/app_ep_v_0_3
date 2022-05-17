//import classes from './Header.module.css';
import { NavLink, Navigate } from "react-router-dom";
//import { AppStateType } from "../../redux/ReduxStore";
import { Header } from "antd/lib/layout/layout";
import { Button, Menu, Drawer } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
///import { logOut } from "../../redux/AuthReducer";
import { Typography, Space } from "antd";
import { Row, Col } from "react-grid-system";
import { logOut } from "../../redux/actions/actionCreator";
import ava from "../../assets/images/ava.png";
import React, { useState } from "react";
import { clearAuthTokens } from "axios-jwt";

//const { Text } = Typography;

export const HeaderCont = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const { isAuth } = useSelector((state) => state.authUser);
  const userProfileData = useSelector((state)=>state.userProfileData)
  const logOutColbeck = () => {
    dispatch(logOut());
    clearAuthTokens();
  };
  return (
    <Header
      //className="site-layout-background"
      style={{ padding: 0, position: "fixed", zIndex: 1, width: "100%" }}
    >
      {/*className="header" */}
      <div className="logo" />
      <Row align="center" style={{ height: "67px" }}>
        <Col md={9}>
          {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
<Menu.Item key="3">nav 3</Menu.Item>
<UserSearchForm onFilterCheang={onFilterCheang} />
</Menu>*/}
        </Col>
        <Col md={1}>
          {isAuth ? <Avatar size={45} src={`data:image/jpg;base64,${userProfileData.userData.imgAvatar?.img_200_200}` || ava}>
            {userProfileData.userData.name}</Avatar> : ""}
        </Col>
        <Col md={2}>
          {isAuth ? (
            <div>
              {/* <Avatar size={60}>{login.name}</Avatar>
                    <Text type="success">{login.name} </Text> <Button type="primary" onClick={logOutColbeck}>
                      Выйти
                      </Button>title="User"
              <Menu defaultSelectedKeys={["1"]} mode="vertical" theme="dark">
                <SubMenu key="sub1" >
                  <Menu.Item key="1">О нас</Menu.Item>
                  <Menu.Item key="2">Настройки входа</Menu.Item>
                  <Menu.Item key="3" onClick={logOutColbeck}>
                    Выход
                  </Menu.Item>
                </SubMenu>
              </Menu>*/}
              <Button type="primary" onClick={showDrawer}>
                Меню
              </Button>
              <Drawer
                title="Меню настроек"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                <p>О нас</p>
                <p>Настройки входа</p>
                <p onClick={logOutColbeck}>Выход</p>
              </Drawer>
            </div>
          ) : (
            <NavLink to={`/login`}>
              <Button type="primary">Войти</Button>
            </NavLink>
          )}
        </Col>
      </Row>
    </Header>
  );
};
