import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppContextProvider } from "./modules/Context";
import { Layout } from "antd";
import HeaderComponent from "./components/HeaderComponent";
import ListComponent from "./components/Todo/ListComponent";
import FormComponent from "./components/Todo/FormComponent";

const { Content } = Layout;

function App() {
  return (
    <Router basename="/">
      <Layout>
        <HeaderComponent />
        <Layout>
          <Content>
            <AppContextProvider>
              <Routes>
                <Route path="/todo" element={<ListComponent />} />
                <Route path="/" element={<ListComponent />} />
                <Route path="/todo/add" element={<FormComponent />} />
                <Route path="/todo/edit/:id" element={<FormComponent />} />
              </Routes>
            </AppContextProvider>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
