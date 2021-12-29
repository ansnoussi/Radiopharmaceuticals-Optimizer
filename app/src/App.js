import React, { useState } from "react";

import "./styles/App.css";
import "./styles/index.css";
import "antd/dist/antd.css";

import { Layout, Menu } from "antd";
import { ExperimentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Infos from "./Pages/Infos";
import RPOptimizer from "./Pages/RPOptimizer";


import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";




const { Content, Footer } = Layout;

const App = () => {
  const [sideMenuKey, setSideMenuKey] = useState(1);
  const { currentTheme } = useThemeSwitcher();

  const MyMenu = (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      onSelect={(selection) => {
        setSideMenuKey(parseInt(selection.key, 10));
      }}
    >
      <Menu.Item key="1" icon={<ExperimentOutlined />}>
        RP Optimizer
      </Menu.Item>
      <Menu.Item key="2" icon={<InfoCircleOutlined />}>
        Infos
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <NavBar menu={MyMenu} />
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar menu={MyMenu} />
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, backgroundColor : currentTheme === 'dark' ? '#121212' : 'white' }}
            >
              {sideMenuKey === 1 ? (
                <RPOptimizer />
              ) : sideMenuKey === 2 ? (
                <Infos />
              ) : null}
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            RP optimizer {new Date().getFullYear()} Created by Anis Snoussi &
            Walid Snoussi <br />
            Version Ref :{" "}
            {process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA
              ? process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA.substring(0, 8)
              : "no-ref"}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
