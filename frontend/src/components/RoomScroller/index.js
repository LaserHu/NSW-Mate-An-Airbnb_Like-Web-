import React, { Component } from "react";
import APIServices from "../../api";
import RoomCard from "../RoomCard";
import loading from "../../assets/images/ZKZg.gif";

const apiServices = new APIServices();

export default class RoomScroller extends Component {
  constructor(props) {
    super(props);
    this.myScroll = React.createRef();
    let cardWidth;
    let topMargin = "80px";
    let cardClass = "";
    let selectedCard = "";
    if (this.props.cardWidth) {
      cardWidth = this.props.cardWidth;
      topMargin = this.props.topMargin;
      cardClass = this.props.cardClass;
      selectedCard = this.props.selectedCard;
    }
    this.state = {
      loaded: 1,
      loading: false,
      loadable: true,
      cardWidth: cardWidth,
      topMargin: topMargin,
      cardClass: cardClass,
      selectedCard: selectedCard
    };
    this.roomList = [];
  }

  componentDidMount() {
    this.loadOnce();
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  static getDerivedStateFromProps(props, state) {
    if (
      (props.selectedCard !== state.selectedCard) &&
      (props.selectedCard !== undefined)
    ) {
      if (state.selectedCard !== "") {
        document.getElementById("card-" + state.selectedCard).className =
          "RoomCard";
      }
      let selectedRoom = document.getElementById("card-" + props.selectedCard);
      selectedRoom.className = "RoomCardSelect";
      selectedRoom.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
      return {
        cardWidth: props.cardWidth,
        topMargin: props.topMargin,
        cardClass: props.cardClass,
        selectedCard: props.selectedCard
      };
    }
  }

  loadOnce = async () => {
    if (!this.state.loadable || this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    let roomId = this.state.loaded;
    let key = this.state.loaded;
    for (let i = 0; i < 16; i++) {
      try {
        const res = await apiServices.getRoom(roomId + i);
        this.roomList.push(
          <RoomCard
            cardWidth={this.state.cardWidth}
            key={key++}
            room={res.accommodation}
            cardClass={this.state.cardClass}
            selectedCard={this.state.selectedCard}
          />
        );
      } catch (err) {
        this.setState({ loadable: false });
        break;
      }
    }
    this.setState({ loaded: this.state.loaded + 16 });
    this.setState({ loading: false });
  };

  handleScroll() {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    // scroller move distance
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    // window visible height
    let clientHeight =
      window.innerHeight ||
      Math.min(
        document.documentElement.clientHeight,
        document.body.clientHeight
      );

    if (clientHeight + scrollTop >= scrollHeight) {
      this.loadOnce();
    }
  }

  render() {
    return (
      <div
        className="CityCards-Container"
        ref={this.myScroll}
        style={{ marginTop: this.state.topMargin }}
      >
        <h2>Places to stay in</h2>
        <div style={{ display: "flex", flexWrap: "wrap", width: "101%" }}>
          {this.roomList}
        </div>
        <div style={{ textAlign: "center" }}>
          {this.state.loading && (
            <img
              src={loading}
              alt="loading"
              style={{ height: 30, width: 30 }}
            />
          )}
        </div>
      </div>
    );
  }
}
