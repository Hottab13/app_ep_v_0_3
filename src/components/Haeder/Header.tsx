//import classes from './Header.module.css';
import { NavLink } from "react-router-dom";
//import { AppStateType } from "../../redux/ReduxStore";
import { Header } from "antd/lib/layout/layout";
import { Button, Menu, Drawer } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/AuthReducer";
import { Typography, Space } from "antd";
import { UserSearchForm } from "../Nests/Nests";
import { FilterType, getNests } from "../../redux/NestsReducer";
import { Row, Col } from "react-grid-system";
import ava from "../../assets/images/ava.png";
import React, { useState } from 'react';


const { SubMenu } = Menu;

const { Text } = Typography;
export type DispatchPropsType = {
  logOut: () => void;
};

export const HeaderCont: React.FC = (props) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  //const login = useSelector((state: AppStateType) => state.auth );
  //const img=useSelector((state:AppStateType)=>state.postsPage.photo_1000)
  const dispatch = useDispatch();
  const logOutColbeck = () => {
    dispatch(logOut());
  };
  /*const onFilterCheang = (filter: FilterType) => {
    dispatch(getNests(filter));
  };*/
  return (
    <Header
      className="site-layout-background"
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
        
          {/*login.isAuth ? <Avatar size={40} src={`data:image/jpg;base64,${img}` || ava}>
            {login.name}</Avatar> : ""*/}
        </Col>
        <Col md={2}>
          {/*login.isAuth ? (
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
           
          ) : (
            <NavLink to={`/login`}>
              <Button type="primary">Войти</Button>
            </NavLink>
          )
        </Col>
      </Row>
    </Header>
  );
          };
/*
<header className={classes.heder}>
            <div><h4>ГНЕЗДОСЕТЬ</h4></div>
            <div className={classes.login}>
                {isAuth ?
                <div>{props.login} - <button onClick={props.logOut}>Выйти</button></div> 
                :<NavLink to={`/login`}>Login:</NavLink>}
            </div>
    </header> */