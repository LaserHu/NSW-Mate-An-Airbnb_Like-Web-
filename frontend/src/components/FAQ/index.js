import React, { Component } from "react";
import "./style.css";

import { Link } from "react-router-dom";

import accountdata from "./data.json";

const dummydata = accountdata;

export default class FAQ extends Component {
  constructor(props) {
    super(props);
    const faq_id = this.props.id;
    this.state = {
      id: faq_id,
      description: [
        "Here we will answer the majority of your questions of our web portal to help you best use it to plan your travels in NSW."
      ],
      question: "Welcome to the Help Page"
    };
  }
  shouldComponentUpdate(props) {
    if (this.props.id === this.state.id) {
      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: this.props.id });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      id: props.id,
      description: props.description,
      question: props.question
    });
  }
  getObject = faqId => {
    for (let i = 0; i < dummydata.length; i++) {
      if (dummydata[i] === faqId) {
        return dummydata[i];
      }
    }
  };
  render() {
    console.log(this.state.description);
    return (
      <div className="City-Container">
        <h3 style={{ marginBottom: 16 }}>{this.state.question}</h3>
        {this.state.description.map(data => {
          if (typeof data !== "string") {
            return <Link to={data.to}>{data.linkText}</Link>;
          }
          if (data === "\n") {
            return <br />;
          }
          return <span>{data}</span>;
        })}
      </div>
    );
  }
}
