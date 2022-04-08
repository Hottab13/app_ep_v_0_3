import { useSelector, useDispatch } from "react-redux";
//import News from './components/news/news';
import { Login } from "./components/authLogin/Login.jsx";
import EventsContainer  from "./components/Events/EventsContainer.jsx";
import { Profile }  from "./components/Profile/ProfileConainer.jsx"; 
import { HeaderCont }  from "./components/Haeder/Header.jsx";
import { AddEvent }  from "./components/AddEvent/AddEvent"; 
import { EventProfileContainer }  from "./components/EventProfile/EventProfileConainer.jsx";
import { getAusUserData, getIsAuthTrue } from "./redux/actions/actionCreator";
import {AUTH_USER_DATA, IS_AUTH_TRUE} from "./redux/constants"
import { getAccessToken } from "axios-jwt";
import React, { useEffect, useState } from "react";
//import './App.css';
import "antd/dist/antd.css";
import {
  Link,
  Route,
  Routes
} from "react-router-dom";
import { Layout, Menu, Result } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const accessToken = getAccessToken()
  const dispatch = useDispatch();
 // const { latestNews, popularNews } = useSelector(store => store?.news || {});
  //const { latestNewsError, popularNewsError } = useSelector(store => store?.errors || {});
  //const { _id } = useSelector((store) => store?.userData || {});*/
  useEffect(() => {
    debugger
    if (accessToken) {
      debugger
      //dispatch(getAusUserData()); type:AUTH_USER_DATA
      dispatch({type:AUTH_USER_DATA});// получить данные профиля по токену
      dispatch({type:IS_AUTH_TRUE});//включить авторизацию
      //dispatch(getIsAuthTrue());
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
      <HeaderCont/>
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
        <div className="logo"  style={{ paddingTop: 60 }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/profile">Профиль</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/events">События</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/add-event">Создать событие</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<EventsContainer />} />
              <Route path="/events/:eventId" element={<EventProfileContainer />} /> 
              <Route path="/add-event" element={<AddEvent />} />
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
        <Footer style={{ textAlign: "center" }}>
          EventsParty ©2022 Created by Alekseev.A
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
/*<div>
      <button onClick={handleNews}>Get News</button>
      <News news={latestNews} error={latestNewsError} title="Latest News" />
      <News news={popularNews} error={popularNewsError} title="Popular News" />
    </div>*/