import React, { Component } from "react";
import "./style.css";
import { Layout } from "antd";
import { Steps } from "antd";
import { Card } from "antd";

import { Link } from "react-router-dom";

import accountdata from "./data.json";

const { Step } = Steps;
const { Content } = Layout;
const gridStyle = {
  width: "25%",
  textAlign: "center"
};

const dummydata = accountdata;

export default class About extends Component {
  render() {
    return (
      <Layout>
        <Layout style={{ padding: "80px" }}>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Steps current={1} style={{ padding: "20px" }}>
                <Step title="Finished" description="This is a description." />
                <Step
                  title="In Progress"
                  subTitle="Left 00:00:08"
                  description="This is a description."
                />
                <Step title="Waiting" description="This is a description." />
              </Steps>
              <div>
                <Card title="Help Center">
                  <Card.Grid style={gridStyle}>
                    <Card title="How do I reset my password?" bordered={false}>
                      <Link
                        to={{
                          pathname: "/accounthelp/faq",
                          data: dummydata // your data array of objects
                        }}
                      >
                        Card content
                      </Link>
                    </Card>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <Card title="How do I create an account?" bordered={false}>
                      Card content
                    </Card>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <Card title="How do I make a booking?" bordered={false}>
                      Card content
                    </Card>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <Card title="Card title" bordered={false}>
                      Card content
                    </Card>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
