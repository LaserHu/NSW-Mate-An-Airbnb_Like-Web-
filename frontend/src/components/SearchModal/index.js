import React, { Component } from "react";
import { Button, DatePicker, Form, Icon, Input, InputNumber } from "antd";
import { DATE_PICKER_PLACE_HOLDER } from "../../assets/constants";
import moment from "moment";
import "./style.css";

const { RangePicker } = DatePicker;
const placeHolder = DATE_PICKER_PLACE_HOLDER;


class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Sydney",
      checkIn: "",
      checkOut: "",
      guests: 1
    };
  }

  handleSubmit = () => {
    this.props.history.push(`/search?location=${this.state.location}&guest=${this.state.guests}`)
  };

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleDateChange(value) {
    this.setState({ checkIn: value[0] });
    this.setState({ checkOut: value[1] });
  }

  handleGuestsChange(value) {
    this.setState({ guests: value });
  }

  disabledDate = current => {
    return current && current < moment().endOf("day") - 24 * 60 * 60 * 1000;
  };

  render() {
    return (
      <div className="Search-Outside">
        <div className="Search-Inside">
          <div className="Search-Card">
            <div className="Card-Container">
              <h2>Book unique places to stay and things to do.</h2>
              <Form>
                <Form.Item
                  label="Where"
                  style={{ marginBottom: "0px", width: "100%" }}
                >
                  <Input
                    placeholder="Sydney"
                    onChange={value => {
                      this.handleChange("location", value);
                    }}
                  />
                </Form.Item>
                <Form.Item label="When" style={{ marginBottom: "0px" }}>
                  <RangePicker
                    disabledDate={this.disabledDate}
                    showTime={{
                      hideDisabledOptions: true
                    }}
                    format="YYYY/MM/DD"
                    style={{ width: "100%" }}
                    placeholder={placeHolder}
                    onChange={value => {
                      this.handleDateChange(value);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Guests">
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    style={{ width: "100%" }}
                    onChange={value => {
                      this.handleGuestsChange(value);
                    }}
                  />
                </Form.Item>
                <div className="Button-Position">
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    htmlType="submit"
                  >
                    <Icon
                      type="search"
                      style={{ position: "relative", top: "-2px" }}
                    />
                    Search
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchModal;
