import React, { Component } from "react";
import Map from "../Maps/Map";
import Geocode from "react-geocode";
import "./style.css";

Geocode.setApiKey("AIzaSyARVyJHwWdeZ_mNJQaIf_5j4QwgjYgOUiY");
Geocode.setRegion("au");
Geocode.enableDebug();

export default class MapRooms extends Component {
  constructor(props) {
    super(props);
    this.myScroll = React.createRef();
    this.state = {
      loaded: false,
      center: {
        lat: 0,
        lng: 0
      }
    };
    this.mapList = [];
    this.searchResults = this.props.searchResults;
    this.clientHeight = document.body.clientHeight;
  }

  componentDidMount() {
    this.handleStateChange = this.handleStateChange.bind(this);
    window.addEventListener("scroll", this.handleScroll.bind(this));
    Geocode.fromAddress(this.props.city).then(response => {
      const { lat, lng } = response.results[0].geometry.location;
      this.setState({ center: { lat: lat, lng: lng } }, () => {
        this.getGeocodes().then(res => {
          this.setState({ mapList: res, loaded: true });
        });
      });
    });
  }

  getGeocodes = async () => {
    for (let i in this.searchResults) {
      let res = this.searchResults[i];
      let rand_num_lng = Math.floor(Math.random() * 99) + 1; // this will get a number between 1 and 99;
      rand_num_lng *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // this will add minus sign in 50% of
      let rand_num_lat = Math.floor(Math.random() * 99) + 1; // this will get a number between 1 and 99;
      rand_num_lat *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // this will add minus sign in 50% ofcases
      Geocode.fromAddress(res.location).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.mapList.push({
            room: res,
            window: res.price,
            lat: lat + rand_num_lat / 600,
            lng: lng + rand_num_lng / 2000,
            geocode: response.results[0]
          });
        },
        error => {
          console.error(error);
        }
      );
    }
    return this.mapList;
  };
  handleScroll() {
    let scrollerTop = window.pageYOffset;
    let scrollHeight = document.documentElement.scrollTop;
    scrollHeight >= 80
      ? this.setState({ needFixed: true })
      : this.setState({ needFixed: false });
    scrollerTop >= 1500
      ? this.setState({ isBottom: true })
      : this.setState({ isBottom: false });
  }

  handleStateChange = id => {
    /*    console.log("from MapRooms:", id);*/
    this.props.dataFromMaps(id);
  };

  render() {
    return (
      <div ref={this.myScroll}>
        <div
          className={
            this.state.needFixed
              ? this.state.isBottom
                ? "BottomMap"
                : "FixedMap"
              : null
          }
        >
          {this.state.loaded === true && (
            <Map
              google={this.props.google}
              center={{
                lat: this.state.center.lat,
                lng: this.state.center.lng
              }}
              height={this.clientHeight}
              zoom={12}
              onStateChange={this.handleStateChange}
              addresses={this.state.mapList}
            />
          )}
        </div>
      </div>
    );
  }
}
