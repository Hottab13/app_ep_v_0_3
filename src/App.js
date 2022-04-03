import { useSelector, useDispatch } from "react-redux";
//import News from './components/news/news';
import { Login } from "./components/authLogin/Login.jsx";
import { Events } from "./components/Events/EventsContainer.jsx";
import { Profile }  from "./components/Profile/ProfileConainer.jsx";
import { getAusUserData } from "./redux/actions/actionCreator";
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
 /* const accessToken = getAccessToken()
  const dispatch = useDispatch();
  const { latestNews, popularNews } = useSelector(store => store?.news || {});
  const { latestNewsError, popularNewsError } = useSelector(store => store?.errors || {});
  //const { _id } = useSelector((store) => store?.userData || {});*/
  /*useEffect(() => {
    if (accessToken) {
      dispatch(getAusUserData())
    }
  }, []);*/
  
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
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Routes>
              {/*<Route exact path="/" render={() => <ProfileContainer /> />
              <Route path="/dialogs" render={() => <DialogsContainer /> />
              <Route path="/frends" component={Frends} />
              <Route path="/settings" component={Settings} />
              <Route path="/nests" render={() => <Nests />} />
    <Route path="/addnest" render={() => <AddNest />} />*/}
              <Route exact path="/" element={<Profile />} />
              <Route
                path="/profile/:userId"
                element={<Profile />}
                //component={_id}
                />
              <Route path="/login" element={<Login />} /> 
              <Route path="/events" element={<Events />} />
              < Route
                path="*"
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="К сожалению, посещенная вами страница не существует." />
                }
              />
            </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>EventsParty ©2022 Created by Alekseev.A</Footer>
    </Layout>
  </Layout>
  )
};

export default App;
/*<div>
      <button onClick={handleNews}>Get News</button>
      <News news={latestNews} error={latestNewsError} title="Latest News" />
      <News news={popularNews} error={popularNewsError} title="Popular News" />
    </div>*/