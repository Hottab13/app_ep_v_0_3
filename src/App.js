import { useSelector, useDispatch } from "react-redux";
import { Login } from "./components/authLogin/Login.jsx";
import EventsContainer from "./components/Events/EventsContainer.jsx";
import { Profile } from "./components/Profile/ProfileConainer.jsx";
import { HeaderCont } from "./components/Haeder/Header.jsx";
import { AddEvent } from "./components/AddEvent/AddEvent";
import { Registration } from "./components/Registration/Registration.jsx";
import MyEventsContainer from "./components/MyEvents/MyEventsContainer.jsx";
import { EventProfileContainer } from "./components/EventProfile/EventProfileConainer.jsx";
import { AUTH_USER_DATA } from "./redux/constants";
import { getAccessToken } from "axios-jwt";
import React, { useEffect, useState } from "react";
//import './App.css';
import "antd/dist/antd.css";
import { Link, Route, Routes } from "react-router-dom";
import { Layout, Menu, Result, Spin } from "antd";
import {
  UserOutlined,
  ApartmentOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.authUser || {});
  useEffect(() => {
    if (accessToken) {
      dispatch({
        type: AUTH_USER_DATA,
      }); // получить данные профиля по токену
    }
  }, []);

  const [collapsed, setСollapsed] = useState(false);
  /*if (!initionalized) {
    return <Loader />;
  }*/
  const onCollapse = (collapsed) => {
    setСollapsed(collapsed);
  };
  console.log(collapsed);
  return (
    <Layout>
      <HeaderCont />
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" style={{ paddingTop: 60 }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/profile">Профиль</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/events">События</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ApartmentOutlined />}>
            <Link to="/my-events">Мои события</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
            <Link to="/add-event">Создать событие</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Spin spinning={auth.isToggleLoading} delay={500}>
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: 14, minHeight: 360 }}
            >
              <Routes>
                <Route exact path="/profile" element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/events" element={<EventsContainer />} />
                <Route
                  path="/events/:eventId"
                  element={<EventProfileContainer />}
                />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/my-events" element={<MyEventsContainer />} />
                <Route path="/registration" element={<Registration />} />
                <Route
                  path="*"
                  element={
                    <Result
                      status="404"
                      title="404"
                      subTitle="К сожалению, посещенная вами страница не существует."
                    />
                  }
                />
              </Routes>
            </div>
          </Content>
        </Spin>
        <Footer style={{ textAlign: "center" }}>
          EventsParty ©2022 Created by Alekseev.A
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
