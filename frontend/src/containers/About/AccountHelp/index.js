import React, { Component } from "react";
import "./style.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import FAQ from "../../../components/FAQ";
import { BrowserRouter as Router } from "react-router-dom";

import data from "./data.json";

const { SubMenu } = Menu;
const { Sider, Content } = Layout;
const accountdata = data.accountdata;
const gettingstarteddata = data.gettingstarted;

export default class AccountHelp extends Component {
  state = {
    id: "home",
    description: "",
    link: "",
    currentPath: ""
  };
  handleClick = e => {
    console.log("click ", e);
    for (let i = 0; i < accountdata.length; i += 1) {
      if (accountdata[i].key === e.key) {
        this.setState({
          description: accountdata[i].description,
          id: accountdata[i].key,
          question: accountdata[i].question,
          currentPath: "Account Help / " + accountdata[i].key
        });
      }
    }
    for (let i = 0; i < gettingstarteddata.length; i += 1) {
      if (gettingstarteddata[i].key === e.key) {
        this.setState({
          description: gettingstarteddata[i].description,
          id: gettingstarteddata[i].key,
          question: gettingstarteddata[i].question,
          currentPath: "Getting Started / " + gettingstarteddata[i].key
        });
      }
    }
  };

  render() {
    return (
      <Layout>
        <Layout style={{ padding: "80px" }}>
          <Layout style={{ padding: "0 24px 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item href="/about">Help</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.currentPath}</Breadcrumb.Item>
            </Breadcrumb>
          </Layout>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Router>
              <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                  mode="inline"
                  onClick={this.handleClick}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                >
                  <SubMenu
                    key="Getting Started"
                    title={
                      <span>
                        <Icon type="user" />
                        Getting Started
                      </span>
                    }
                  >
                    {gettingstarteddata.map(item => {
                      return (
                        <Menu.Item key={item.key}>{item.navBar}</Menu.Item>
                      );
                    })}
                  </SubMenu>
                  <SubMenu
                    key="Account Help"
                    title={
                      <span>
                        <Icon type="user" />
                        Account Help
                      </span>
                    }
                  >
                    {accountdata.map(item => {
                      return (
                        <Menu.Item key={item.key}>{item.navBar}</Menu.Item>
                      );
                    })}
                  </SubMenu>
                </Menu>
              </Sider>
              <Content
                style={{
                  background: "#fff",
                  padding: "0 24px",
                  margin: 0,
                  minHeight: 280
                }}
              >
                <div>
                  <FAQ
                    id={this.state.id}
                    description={this.state.description}
                    question={this.state.question}
                  />
                </div>
              </Content>
            </Router>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
