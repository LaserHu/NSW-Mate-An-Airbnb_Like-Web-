import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, notification } from "antd";
import { connect } from "react-redux";
import APIServices from "../../api";
import "./style.css";

const apiServices = new APIServices();

class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomLiked: ""
    };
  }

  componentDidMount() {
    this.isSaved().then(res => {
      if (res === true) {
        this.setState({ roomLiked: "filled" });
      }
    });
  }

  isSaved = async () => {
    try {
      return await apiServices.isSaved(
        this.props.user.email,
        this.props.room.id,
        this.props.user.jwt
      );
    } catch (err) {
      console.log(err);
    }
  };

  save = async () => {
    try {
      return await apiServices.saveRoom(
        this.props.user.email,
        this.props.room.id,
        this.props.user.jwt
      );
    } catch (e) {
      console.log(e);
    }
  };

  unsave = async () => {
    try {
      return await apiServices.unsaveRoom(
        this.props.user.email,
        this.props.room.id,
        this.props.user.jwt
      );
    } catch (e) {
      console.log(e);
    }
  };
  saveRoom = () => {
    if (this.state.roomLiked === "") {
      this.save().then(res => {
        if (res === undefined) {
          this.openNotification();
        } else if (res.status === 200) {
          this.setState({ roomLiked: "filled" });
        }
      });
    } else {
      this.unsave().then(res => {
        if (res === undefined) {
          this.openNotification();
        }
        if (res.status === 200) {
          this.setState({ roomLiked: "" });
        }
      });
    }
  };

  openNotification = () => {
    const savedRoomErrorMessage = {
      message: "Login to Save",
      description: "Please login to NSWMate to save an accommodation",
      duration: 2
    };
    notification.open(savedRoomErrorMessage);
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "180px",
          display: "flex",
          flexDirection: "row"
        }}
        id={"card-" + this.props.id}
        className={"SearchCard"}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Link
            to={{
              pathname: `room/${this.props.id}`,
              state: { roomId: this.props.id }
            }}
            target="_blank"
            style={{
              height: "90%"
            }}
          >
            <img
              src={this.props.img}
              alt={"img"}
              className="RoomCard-Image"
              style={{ height: "100%" }}
            />
          </Link>
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`room/${this.props.id}`}
            target="_blank"
          >
            <div
              style={{
                width: "95%",
                height: "35%",
                lineHeight: "3px",
                marginTop: "20px",
                wordBreak: "break-word",
                wordWrap: "break-word"
              }}
            >
              <p style={{ fontSize: "90%" }}>{this.props.location}</p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "110%",
                  lineHeight: "18px"
                }}
              >
                {this.props.name}
              </p>
              <p style={{ fontWeight: "lighter", fontSize: "85%" }}>
                ${this.props.price} AUD/night
              </p>
              <p style={{ fontWeight: "light", fontSize: "80%" }}>
                <Icon
                  type="star"
                  theme="filled"
                  style={{ position: "relative", fontSize: "80%", top: "-2px" }}
                />&nbsp;
                {this.props.rating}({this.props.reviewNums})
              </p>
            </div>
          </Link>
          <Button
            style={{
              position: "relative",
              top: "-20%",
              right: "-87%",
              width: "10px"
            }}
            shape="circle"
            onClick={this.saveRoom}
            className="Button1"
          >
            <Icon
              type="heart"
              theme={this.state.roomLiked}
              style={{ marginBottom: "5px" }}
            />
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(SearchCard);
