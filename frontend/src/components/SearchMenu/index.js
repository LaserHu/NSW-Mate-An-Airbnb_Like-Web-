import React, { Component } from "react";
import {
  Menu,
  Icon,
  InputNumber,
  Form,
  DatePicker,
  Slider,
  Rate,
  Row,
  Col,
  Button,
  Switch,
  AutoComplete
} from "antd";
import { DATE_PICKER_PLACE_HOLDER } from "../../assets/constants";

import locations from "./locations.json";

const location_list = locations;

const { RangePicker } = DatePicker;
const placeHolder = DATE_PICKER_PLACE_HOLDER;

const menuKeys = ["guests", "date", "location", "price", "rating"];

export default class SearchMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: "",
      priceMin: 20,
      priceMax: 190,
      guest: this.props.query.num_guests,
      location: this.props.query.city
    };
    this.priceMin = 20;
    this.priceMax = 190;
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangePriceMin = this.onChangePriceMin.bind(this);
    this.onChangePriceMax = this.onChangePriceMax.bind(this);
    this.onChangeGuest = this.onChangeGuest.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleGuestMinus = this.handleGuestMinus.bind(this);
    this.handleGuestPlus = this.handleGuestPlus.bind(this);
    this.showMap = this.showMap.bind(this);
  }

  onChangePrice(value) {
    if (value !== null) {
      this.setState({ priceMin: value[0], priceMax: value[1] });
    }
  }
  onChangePriceMin(value) {
    if (value !== null) {
      this.setState({ priceMin: value });
    }
  }
  onChangePriceMax(value) {
    if (value !== null) {
      this.setState({ priceMax: value });
    }
  }

  onChangeRating(value) {
    console.log("rating", value);
  }
  onAfterChange(value) {
    console.log("changed", value);
  }

  onChangeGuest(value) {
    console.log(value);
    if (value !== "") {
      this.setState({ guest: value });
    }
  }

  handleGuestMinus(value) {
    this.setState({ guest: parseInt(this.state.guest) - 1 });
  }
  handleGuestPlus(value) {
    this.setState({ guest: parseInt(this.state.guest) + 1 });
  }

  handleSelect = e => {
    /*var settingsMenu = document.getElementById("settings")*/
    let elem;
    if (typeof e === "boolean" || e.key === "ignore") {
      for (let item in menuKeys) {
        elem = document.getElementById("settings-" + menuKeys[item]);
        elem.style.display = "none";
      }
      return;
    }
    if (e.key === this.state.currentKey) {
      elem = document.getElementById("settings-" + e.key);
      if (elem.style.display === "block") {
        elem.style.display = "none";
      }
      this.setState({ currentKey: "" });
    } else {
      for (let item in menuKeys) {
        elem = document.getElementById("settings-" + menuKeys[item]);
        elem.style.display = "none";
      }
      this.setState({ currentKey: e.key });
      if (
        e.key === "guests" ||
        e.key === "date" ||
        e.key === "price" ||
        e.key === "rating" ||
        e.key === "location"
      ) {
        elem = document.getElementById("settings-" + e.key);
        if (elem.style.display === "none") {
          elem.style.display = "block";
        }
      }
    }
  };

  handleMenuSubmit = () => {
    this.props.history.push(
      `/search?location=${this.state.location}&guest=${this.state.guest}`
    );
    window.location.reload();
  };

  onChangeLocation(event) {
    this.setState({ location: event });
  }
  showMap(event) {
    this.props.onShowMap(event);
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Menu mode="horizontal" theme="light" onClick={this.handleSelect}>
          <Menu.Item key="guests">
            <Icon type="user" />
            <span>Guests</span>
          </Menu.Item>
          <Menu.Item key="date">
            <Icon type="calendar" />
            <span>Dates</span>
          </Menu.Item>
          <Menu.Item key="location">
            <Icon type="environment" />
            <span>Location</span>
          </Menu.Item>
          <Menu.Item key="price">
            <Icon type="dollar" />
            <span>Price</span>
          </Menu.Item>
          <Menu.Item key="rating">
            <Icon type="star" />
            <span>Rating</span>
          </Menu.Item>
          <Button
            type="primary"
            shape="round"
            icon="edit"
            size={"large"}
            onClick={this.handleMenuSubmit}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Submit
          </Button>
          <Menu.Item key="ignore">
            <span>Show Map </span>
            <Switch defaultChecked onChange={this.showMap} />
          </Menu.Item>
        </Menu>

        <div
          id="settings-guests"
          style={{
            display: "none",
            textAlign: "center",
            padding: "20px",
            width: "50%"
          }}
        >
          <Button
            type="link"
            icon="minus-circle"
            size={"large"}
            onClick={this.handleGuestMinus}
          />
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            value={this.state.guest}
            onChange={this.onChangeGuest}
          />
          <Button
            type="link"
            icon="plus-circle"
            size={"large"}
            onClick={this.handleGuestPlus}
          />
        </div>
        <div
          id="settings-date"
          style={{ display: "none", padding: "20px", width: "50%" }}
        >
          <Form>
            <Form.Item style={{ marginBottom: "0px" }}>
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
          </Form>
        </div>
        <div
          id="settings-location"
          style={{
            padding: "20px",
            display: "none",
            textAlign: "center",
            width: "50%"
          }}
        >
          <AutoComplete
            value={this.state.location}
            dataSource={location_list}
            style={{ width: 200 }}
            onSelect={this.onChangeLocation}
            onChange={this.onChangeLocation}
            placeholder="Your NSW Destination"
          />
        </div>
        <div
          id="settings-price"
          style={{ display: "none", padding: "20px", width: "50%" }}
        >
          <Slider
            range
            step={10}
            max={400}
            defaultValue={[20, 190]}
            value={[this.state.priceMin, this.state.priceMax]}
            onChange={this.onChangePrice}
            onAfterChange={this.onAfterChange}
          />
          <Row>
            <Col
              span={12}
              style={{
                textAlign: "center"
              }}
            >
              Minimum Price:
              <InputNumber
                style={{ marginLeft: 16 }}
                value={this.state.priceMin}
                onChange={this.onChangePriceMin}
              />
            </Col>
            <Col
              span={12}
              style={{
                textAlign: "center"
              }}
            >
              Maximum Price:
              <InputNumber
                style={{ marginLeft: 16 }}
                value={this.state.priceMax}
                onChange={this.onChangePriceMax}
              />
            </Col>
          </Row>
        </div>

        <div
          id="settings-rating"
          style={{
            display: "none",
            textAlign: "center",
            padding: "20px",
            width: "50%"
          }}
        >
          <Rate allowHalf defaultValue={2.5} onChange={this.onChangeRating} />
        </div>
      </div>
    );
  }
}
