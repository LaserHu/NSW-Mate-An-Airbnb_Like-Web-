import React, { Component } from "react";
import { Carousel, Icon } from "antd";
import "./style.css";

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  TrafficLayer,
  OverlayView
} from "react-google-maps";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      address: "",
      city: "",
      area: "",
      state: "",
      name: this.props.name,
      interior: this.props.interior,
      rating: this.props.rating,
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      locations: this.props.addresses,
      zoom: this.props.zoom,
      loaded: false,
      justOnce: false
    };
  }
  componentDidMount() {
    this.setState({ loaded: true, locations: this.props.addresses });
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.addresses.length !== this.state.locations.length ||
      this.state.justOnce === false
    ) {
      /*      console.log(
        this.state.mapPosition.lat,
        this.state.mapPosition.lng,
        this.state.name
      );*/
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addresses.length > 0 && this.state.justOnce === false) {
      const last_index = nextProps.addresses.length - 1;
      const latVal = nextProps.addresses[last_index].lat;
      const lngVal = nextProps.addresses[last_index].lng;
      const addressName = nextProps.addresses[last_index].addressName;
      const addressArray =
        nextProps.addresses[last_index].geocode.address_components;
      const address = nextProps.addresses[last_index].address;
      const city = this.getCity(addressArray);
      const area = this.getArea(addressArray);
      const state = this.getState(addressArray);
      this.setState({
        addressName: addressName,
        address: address,
        city: city,
        area: area,
        state: state,
        markerPosition: { lat: latVal, lng: lngVal },
        locations: nextProps.addresses,
        loaded: true,
        justOnce: true
      });
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = addressArray => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = addressArray => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = addressArray => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  updateStateChange = id => {
    this.props.onStateChange(id);
  };

  onBubbleClick = (point, lat, lng) => {
    if (point !== this.state.id) {
      let allLocations = this.state.locations;
      this.setState({
        id: point,
        zoom: 12,
        locations: allLocations,
        mapPosition: { lat: lat, lng: lng },
        justOnce: false
      });
      this.updateStateChange(point);
      this.forceUpdate();
    }
  };
  onInfoWindowClose = event => {
    console.log(event);
  };

  onMarkerClick = event => {
    console.log(event);
    this.setState({
      zoom: 12,
      mapPosition: {
        lat: event.lat,
        lng: event.lng
      }
    });
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.state.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
        >
          {this.state.loaded === true &&
            this.state.locations.map(point => {
              return (
                <OverlayView
                  key={point.room.id}
                  position={{
                    lat: point.lat,
                    lng: point.lng
                  }}
                  mapPaneName={"overlayMouseTarget"}
                >
                  <div>
                    {this.state.id !== point.room.id && (
                      <div className="popup-container">
                        <div className="popup-bubble-anchor">
                          <div
                            id={"info-" + point.room.id}
                            className="popup-bubble"
                          >
                            <button
                              className="trans-button"
                              onClick={() => {
                                this.onBubbleClick(
                                  point.room.id,
                                  point.lat,
                                  point.lng
                                );
                              }}
                            >
                              $ {point.window}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.id === point.room.id && (
                      <div className="popup-container" style={{ zIndex: 2 }}>
                        <div className="popup-bubble-anchor">
                          <div
                            id={"info-" + point.room.id}
                            className="popup-bubble"
                          >
                            <div style={{ padding: "0 0 0 15px" }}>
                              <h5>{point.room.name}</h5>
                              <div className="row">
                                <div className="column">
                                  <span>${point.room.price} / night</span>

                                  <br />
                                  <span>
                                    <Icon
                                      type="star"
                                      theme="filled"
                                      style={{
                                        position: "relative",
                                        fontSize: "80%",
                                        top: "-2px"
                                      }}
                                    />
                                    {point.room.rating}
                                  </span>
                                  <hr />
                                  <span>{point.room.interior}</span>
                                </div>
                                <div className="column">
                                  <Carousel
                                    autoplay
                                    effect={"fade"}
                                    speed={3000}
                                    autoplaySpeed={10000}
                                  >
                                    <div>
                                      <img
                                        src={point.room.img}
                                        alt={"img"}
                                        className="RoomCard-Image"
                                      />
                                    </div>
                                  </Carousel>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </OverlayView>
              );
            })}
          <TrafficLayer autoUpdate />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyARVyJHwWdeZ_mNJQaIf_5j4QwgjYgOUiY&libraries=places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
