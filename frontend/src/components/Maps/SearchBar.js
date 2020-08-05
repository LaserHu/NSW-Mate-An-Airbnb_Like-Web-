import React, { Component } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyARVyJHwWdeZ_mNJQaIf_5j4QwgjYgOUiY");
Geocode.enableDebug();

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressName: "",
      address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      additionalPoints: []
    };
  }
  sendData = () => {
    this.props.onSearchChange(this.state.additionalPoints);
  };
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        let addressName = "";
        if (this.state.additionalPoints.length > 0) {
          addressName = this.state.additionalPoints[
            this.state.additionalPoints.length - 1
          ].addressName;
        } else {
          addressName = address;
        }

        this.setState({
          addressName: addressName ? addressName : "",
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : ""
        });
      },
      error => {
        console.error(error);
      }
    );
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
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
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
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = event => {};

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = event => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          }
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  getGeoCode(address) {
    this.setState({ address: address.description });
    geocodeByAddress(address.description)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        this.setState({
          markerPosition: { lat, lng },
          mapPosition: { lat, lng }
        })
      )
      .catch(error => console.error(error));
    geocodeByAddress(address.description).then(results =>
      this.setState(state => {
        const addr = results[0].formatted_address,
          addressArray = results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          stated = this.getState(addressArray),
          id = results[0].place_id;
        let val = {
          addressName: address.description,
          address: addr,
          city: city,
          area: area,
          state: stated,
          id: id,
          markerPosition: {},
          mapPosition: {}
        };
        const list = state.additionalPoints.push(val);
        return list;
      })
    );
    geocodeByAddress(address.description)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        this.setState(state => {
          state.additionalPoints[
            state.additionalPoints.length - 1
          ].markerPosition = { lat, lng };
          state.additionalPoints[
            state.additionalPoints.length - 1
          ].mapPosition = { lat, lng };
          this.sendData();
        })
      )
      .catch(error => console.error(error));
  }

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
        >
          {/* For Auto complete Search Box */}
          <GooglePlacesAutocomplete
            onSelect={({ description }) => this.getGeoCode({ description })}
            autocompletionRequest={{
              componentRestrictions: {
                country: ["au"]
              }
            }}
          />
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
