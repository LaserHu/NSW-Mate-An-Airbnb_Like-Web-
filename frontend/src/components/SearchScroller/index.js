import React, { Component } from "react";
import RoomCard from "../RoomCard";
import loading from "../../assets/images/ZKZg.gif";

export default class SearchScroller extends Component {
  constructor(props) {
    super(props);
    this.myScroll = React.createRef();
    let cardWidth;
    let topMargin = "80px";
    let cardClass = "";
    if (this.props.cardWidth) {
      cardWidth = this.props.cardWidth;
      topMargin = this.props.topMargin;
      cardClass = this.props.cardClass;
    }
    let loading = false;
    if (this.props.roomList.length > 0) {
      loading = true;
    }
    console.log(loading);
    this.state = {
      loaded: 1,
      loading: loading,
      loadable: true,
      cardWidth: cardWidth,
      topMargin: topMargin,
      cardClass: cardClass,
      roomList: this.props.roomList
    };
    console.log(this.props.roomList);
    this.roomList = [];
  }

  async componentDidMount() {
    this.loadOnce();
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedCard !== prevProps.selectedCard) {
      console.log(this.state.selectedCard);
    }
  }

  /*  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps RoomScroller", nextProps);
  }*/

  loadOnce = () => {
    if (!this.state.loadable) {
      return;
    }
    this.setState({ loading: true });
    let key = this.state.loaded;
    let res;
    for (let i = 0; i < this.state.roomList.length; i++) {
      res = this.state.roomList[i];
      this.roomList.push(
        <RoomCard
          cardWidth={this.state.cardWidth}
          key={key++}
          room={res}
          cardClass={this.state.cardClass}
          selectedCard={this.state.selectedCard}
        />
      );
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
      /*this.loadOnce();*/
    }
  }

  render() {
    return (
      <div style={{ padding: "10px" }} ref={this.myScroll}>
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
