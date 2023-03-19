import React from "react";
import { Layout, Menu, theme } from "antd";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { key: 1, label: "Home" },
            { key: 2, label: "To Do List" },
          ]}
        />
      </Header>
    </Layout>
  );
};

export default HeaderComponent;
