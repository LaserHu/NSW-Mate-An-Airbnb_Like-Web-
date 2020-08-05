import React, { Component } from "react";
import "./style.css";
import { Layout, List } from "antd";

import APIServices from "../../api";

import MapRooms from "../../components/MapRooms";
import SearchCard from "../../components/SearchCard";
import SearchMenu from "../../components/SearchMenu";
import SearchScroller from "../../components/SearchScroller";

const { Content } = Layout;

const apiServices = new APIServices();

export default class MappedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: "",
      loaded: false,
      currentPage: 1,
      seen: [],
      showMap: true
    };
    const urlParameters = new URLSearchParams(this.props.location.search);
    this.query = {
      city: urlParameters.get("location"),
      num_guests: urlParameters.get("guest"),
      rating: urlParameters.get("rating"),
      price: urlParameters.get("price")
    };
    this.roomList = [];
    this.reserveBox = React.createRef();
    this.showMap = this.showMap.bind(this);
  }
  updateSelectedRoom = id => {
    let temp_list = [];
    if (this.state.selectedRoom !== "") {
      temp_list = this.state.seen;
      temp_list.push(id);
      this.setState({ seen: temp_list }, () => {
        let t = this.state.seen;
        this.resetSearchCards();
        for (let j in t) {
          let temp_elem = document.getElementById("card-" + t[j]);
          if (temp_elem !== null) {
            temp_elem.className = "SearchCardHistory";
          }
        }
      });
      /*document.getElementById("card-" + this.state.selectedRoom).className =
        "SearchCardHistory";*/
    }

    let pageNum = 1;
    let i;
    for (i in this.state.roomList) {
      i = Number(i);
      if (this.state.roomList[i].id === id) {
        break;
      }
      if (i % 10 === 0 && i !== 0) {
        pageNum += 1;
      }
    }
    i = i % 10;

    this.setState({ currentPage: pageNum }, () => {
      let selectedRoom = document.getElementById("card-" + id);
      if (selectedRoom !== null) {
        selectedRoom.className = "SearchCardSelect";
        selectedRoom.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      }
    });

    this.setState({ selectedRoom: id });
  };

  resetSearchCards() {
    let loc = this.state.roomList;
    for (let i in loc) {
      let temp_elem = document.getElementById("card-" + loc[i].id);
      if (temp_elem !== null) {
        temp_elem.className = "SearchCard";
      }
    }
  }

  componentDidMount() {
    this.loadResults().then(res => {
      this.setState({ roomList: res, loaded: true });
    });
  }

  loadResults = async () => {
    try {
      const res_list = await apiServices.getSearchResults(
        this.query.city,
        this.query.num_guests,
        this.query.rating,
        this.query.price
      );
      for (let i = 0; i < res_list.length; i++) {
        const room = res_list[i];
        this.roomList.push({
          id: room.id,
          img: room.mainImage,
          mainImage: room.mainImage,
          name: room.name,
          price: room.price,
          rating: room.rating,
          reviewNums: room.reviewNums,
          location: room.location
        });
      }
      return this.roomList;
    } catch (err) {
      console.log(err);
    }
  };

  showMap(isShowMap) {
    this.setState({ showMap: isShowMap });
  }

  render() {
    return (
      <div>
        <Layout
          style={{
            width: "100%",
            marginTop: "80px",
            display: "flex",
            flexDirection: "row",
            background: "#fff"
          }}
        >
          <SearchMenu
            query={this.query}
            history={this.props.history}
            onShowMap={this.showMap}
          />
        </Layout>

        <Layout
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            background: "#fff"
          }}
        >
          {this.state.showMap === false && (
            <SearchScroller roomList={this.state.roomList} />
          )}
          {this.state.showMap === true && (
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                height: "2200px"
              }}
            >
              <Content
                style={{
                  padding: "10px"
                }}
              >
                <List
                  itemLayout="horizontal"
                  pagination={{
                    current: this.state.currentPage,
                    onChange: page => {
                      this.setState({
                        currentPage: page
                      });
                    },
                    pageSize: 10
                  }}
                  dataSource={this.state.roomList}
                  renderItem={item => (
                    <List.Item>
                      <SearchCard
                        id={item.id}
                        img={item.img}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                        reviewNums={item.reviewNums}
                        location={item.location}
                      />
                    </List.Item>
                  )}
                />
              </Content>
            </div>
          )}
          <hr />
          <div style={{ width: "50%", height: "100%" }} ref={this.reserveBox}>
            <Content>
              {this.state.loaded === true &&
                this.state.showMap === true && (
                  <MapRooms
                    dataFromMaps={this.updateSelectedRoom}
                    searchResults={this.state.roomList}
                    city={this.query.city}
                  />
                )}
            </Content>
          </div>
        </Layout>
      </div>
    );
  }
}
