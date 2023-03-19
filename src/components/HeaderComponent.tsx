import React from "react";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const navbar = [
  { label: "Home", link: "/" },
  { label: "ToDo List", link: "/todo" },
  { label: "Add Todo", link: "/todo/add" },
];

const HeaderComponent: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          {navbar.map((nav, i) => {
            return (
              <Menu.Item key={i}>
                <Link to={nav?.link}>{nav.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
    </Layout>
  );
};

export default HeaderComponent;
