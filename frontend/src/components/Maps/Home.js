import React, { Component } from "react";
import Map from "./Map";
import SearchBar from "./SearchBar";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapdata: []
    };
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleMapChange = childData => {
    this.setState({ mapdata: childData });
    console.log("from main", this.state.mapdata);
  };
  handleSearchChange = childData => {
    this.setState({ mapdata: childData });
    console.log("from main", this.state.mapdata);
  };
  render() {
    return (
      <div>
        <div className="split right">
          <Map
            google={this.props.google}
            center={{ lat: -33.8708, lng: 151.2073 }}
            height="500px"
            zoom={15}
            onMapChange={this.handleMapChange}
            addresses={this.state.mapdata}
          />
        </div>
        <div className="split left">
          <SearchBar
            google={this.props.google}
            center={{ lat: -33.8708, lng: 151.2073 }}
            onSearchChange={this.handleSearchChange}
          />
        </div>
      </div>
    );
  }
}
