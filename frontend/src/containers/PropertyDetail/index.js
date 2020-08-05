import React, { Component } from "react";
import { DATE_PICKER_PLACE_HOLDER } from "../../assets/constants";
import PropertyImages from "../../components/PropertyImages";
import Reviews from "../../components/Reviews";
import FeatureFinder from "../../components/FeatureFinder";
import APIServices from "../../api";
import { connect } from "react-redux";
import {
  Button,
  Calendar,
  DatePicker,
  Divider,
  Icon,
  InputNumber,
  Modal
} from "antd";
import "./style.css";
import moment from "moment";

const apiServices = new APIServices();
const { RangePicker } = DatePicker;
const placeHolder = DATE_PICKER_PLACE_HOLDER;

class RoomDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            amenities: "",
            mainImage: "",
            viceImage1: "",
            viceImage2: "",
            viceImage3: "",
            viceImage4: "",
            interior: "",
            introduction: "",
            location: "",
            price: "",
            rating: "",
            guest: 2,
            reversed: "",
            needFixed: false,
            reviewNums: "",
            reserveLocation: "",
            reserveCheckIn: "",
            reserveCheckOut: "",
            reserveGuests: 0,
            ModalText: "Content of the modal",
            visible: false,
            confirmLoading: false,
            availability: "",
            buttonFilled: "",
            buttonSaved: "Save",
        }
        this.reserveBox = React.createRef()
        this.fixedTop = 0
        const url = this.props.location.pathname.split("/")
        this.roomId = url.pop()
        // this.user = JSON.parse(localStorage.getItem("logged"))
        this.user = this.props.user
    }

  componentDidMount() {
    this.getRoom(this.roomId).then(res => {
      const room = res.accommodation;
      const viceImages = room.viceImages.split(",");
      this.setState({
        amenities: room.amenities,
        mainImage: room.mainImage,
        viceImage1: viceImages[0],
        viceImage2: viceImages[1],
        viceImage3: viceImages[2],
        viceImage4: viceImages[3],
        interior: room.interior,
        introduction: room.introduction,
        location: room.location,
        name: room.name,
        price: room.price,
        guest: room.guest,
        rating: room.rating,
        reversed: room.reversed,
        reviewNums: room.reviewNums,
        loaded: true
      });
    });
    this.getAvailability(this.roomId).then(res => {
      this.setState({ availability: res });
    });
    this.isSaved().then(res => {
      if (res === true) {
        this.setState({ buttonFilled: "filled", buttonSaved: "Saved" });
      }
    });
    window.addEventListener("scroll", this.handleScroll.bind(this));
    this.fixedTop = this.reserveBox.current.offsetTop;
  }

  handleDateChange(value) {
    console.log(value.length);
    if (value.length !== 2) {
      this.setState({ reserveCheckIn: "", reserveCheckOut: "" });
    } else {
      this.setState({
        reserveCheckIn: moment(value[0]._d).format("YYYY-MM-DD")
      });
      this.setState({
        reserveCheckOut: moment(value[1]._d).format("YYYY-MM-DD")
      });
    }
  }

  handleGuestsChange(value) {
    this.setState({ reserveGuests: value });
  }

  getRoom = async roomId => {
    try {
      return await apiServices.getRoom(roomId);
    } catch (err) {
      console.log(err);
    }
  };

  getAvailability = async roomId => {
    try {
      return await apiServices.getRoomAvailability(roomId);
    } catch (err) {
      console.log(err);
    }
  };

  isSaved = async () => {
    try {
      return await apiServices.isSaved(
        this.user.email,
        this.roomId,
        this.user.jwt
      );
    } catch (err) {
      console.log(err);
    }
  };

  save = async () => {
    try {
      return await apiServices.saveRoom(
        this.user.email,
        this.roomId,
        this.user.jwt
      );
    } catch (e) {
      console.log(e);
    }
  };

  unsave = async () => {
    try {
      return await apiServices.unsaveRoom(
        this.user.email,
        this.roomId,
        this.user.jwt
      );
    } catch (e) {
      console.log(e);
    }
  };

  saveRoom = () => {
    if (this.state.buttonFilled === "") {
      this.save().then(res => {
        if (res.status === 200) {
          this.setState({ buttonFilled: "filled", buttonSaved: "Saved" });
        }
      });
    } else {
      this.unsave().then(res => {
        if (res.status === 200) {
          this.setState({ buttonFilled: "", buttonSaved: "Save" });
        }
      });
    }
  };

  handleScroll() {
    let scrollHeight = document.documentElement.scrollTop + 24;
    scrollHeight >= this.fixedTop
      ? this.setState({ needFixed: true })
      : this.setState({ needFixed: false });
  }

  disabledDate = current => {
    const dates = this.state.availability;
    let disabledBoolean = current < moment().endOf("day") - 24 * 60 * 60 * 1000;
    for (let pair of dates) {
      disabledBoolean =
        disabledBoolean ||
        (current > moment(pair[0]) &&
          current < moment(pair[1]) + 24 * 60 * 60 * 1000);
    }
    return current && disabledBoolean;
  };
  showModal = () => {
    if (!this.user.isAuth) {
      this.setState({
        ModalText: "User has not login, please login and reserve later"
      });
    } else {
      this.setState({
        ModalText:
          'Are you sure to order now? You can pay later at "My Profile" page'
      });
    }
    this.setState({
      visible: true
    });
  };

  handleSubmit = async () => {
    const email = this.user.email;
    try {
      const result = await apiServices.reserve(
        email,
        this.state.reserveCheckIn,
        this.state.reserveCheckOut,
        this.roomId,
        this.user.jwt
      );
      if (result.status === 201) {
        window.location.reload();
      }
    } catch (e) {
      this.setState({
        ModalText: "Something went wrong, please try again",
        confirmLoading: false
      });
    }
  };

  handleOk = () => {
    if (
      this.state.reserveCheckIn === "" ||
      this.state.reserveCheckOut === "" ||
      this.state.reserveGuests === 0
    ) {
      this.setState({
        ModalText: "Blanks should not be empty"
      });
      return;
    }
    if (!this.user.isAuth) {
      this.props.history.push("/login");
    }
    this.setState({
      ModalText: "Reserving for you, please wait",
      confirmLoading: true
    });
    this.handleSubmit();
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <PropertyImages
          mainImage={this.state.mainImage}
          viceImage1={this.state.viceImage1}
          viceImage2={this.state.viceImage2}
          viceImage3={this.state.viceImage3}
          viceImage4={this.state.viceImage4}
        />
        <p style={{fontSize: '13px'}}>Pictures are scraped from Airbnb.com. Copyright belongs to Airbnb.</p>
        <Modal
          title="Reserve"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
        <Button
          className="Button1"
          style={{
            position: "absolute",
            top: "100px",
            right: "50px",
            height: "40px",
            width: "90px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
          onClick={() => {
            this.saveRoom();
          }}
        >
          <div>
            <span style={{ fontWeight: "bolder" }}>
              {this.state.buttonSaved}
            </span>
          </div>
          <div style={{ marginLeft: "10px", marginTop: "-3px" }}>
            <Icon type="heart" theme={this.state.buttonFilled} />
          </div>
        </Button>
        <div
          style={{
            width: "1080px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div
            style={{
              width: "600px",
              display: "flex",
              flexDirection: "column",
              paddingRight: "30px"
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>{this.state.name}</h2>
            <p>{this.state.location}</p>
            <Divider />
            <p>{this.state.introduction}</p>
            <Divider />
            <p style={{ fontWeight: "bold" }}>Amenities</p>
            <p>{this.state.amenities}</p>
            <Divider />
            <p style={{ fontWeight: "bold" }}>Sleeping arrangements</p>
            <p>{this.state.interior}</p>
            <Divider />
            <p style={{ fontWeight: "bold" }}>Accessibility</p>
            <p>Lift</p>
            <Divider />
            <p style={{ fontWeight: "bold" }}>Availability</p>
            <p>1 night minimum stay</p>
            <Calendar fullscreen={false} disabledDate={this.disabledDate} />

            <Divider />
            {this.state.loaded && (
              <FeatureFinder location={this.state.location} />
            )}

            <Divider />
            <p style={{ fontWeight: "bold" }}>Reviews</p>
            <Reviews roomId={this.roomId} />
          </div>
          <div style={{ width: "30%" }} ref={this.reserveBox}>
            <div className={this.state.needFixed ? "fixed" : "Reserve-box"}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                ${this.state.price}&nbsp;
              </span>
              <span>per night</span>
              <p style={{ fontWeight: "light", fontSize: "80%" }}>
                <Icon
                  type="star"
                  theme="filled"
                  style={{ position: "relative", fontSize: "80%", top: "-2px" }}
                />&nbsp;
                {this.state.rating}({this.state.reviewNums} reviews)
              </p>
              <Divider />
              <p>Dates</p>
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
              <p style={{ marginTop: "10px" }}>Guests</p>
              <InputNumber
                min={1}
                max={this.state.guest}
                defaultValue={0}
                style={{ width: "100%" }}
                onChange={value => {
                  this.handleGuestsChange(value);
                }}
              />
              <Button
                style={{
                  marginTop: "40px",
                  width: "100%",
                  height: "50px",
                  color: "white",
                  backgroundColor: "rgba(237, 101, 100, 1)"
                }}
                onClick={this.showModal}
              >
                Reserve
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(RoomDetail);
