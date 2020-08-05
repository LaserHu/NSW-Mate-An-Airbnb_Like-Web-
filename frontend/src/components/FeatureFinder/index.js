import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { message } from "antd";
import Geocode from "react-geocode";
import DisplayFeatures from "./DisplayFeatures.js";

Geocode.setApiKey("AIzaSyARVyJHwWdeZ_mNJQaIf_5j4QwgjYgOUiY");
Geocode.setRegion("au");
Geocode.enableDebug();

const SG_COOR = { lat: -33.31, lng: 151.1 };

class FeatureFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constraints: [{ name: "", time: 0 }],
      searchResults: [],
      mapsLoaded: false,
      markers: [],
      map: {},
      mapsApi: {},
      singaporeLatLng: {},
      autoCompleteService: {},
      placesService: {},
      geoCoderService: {},
      directionService: {},
      center: {
        lat: 0,
        lng: 0
      },
      isResultsLoaded: false,
      isBarResultsLoaded: false
    };
  }
  componentDidMount() {}

  // Update name for constraint with index === key
  updateConstraintName = (event, key) => {
    event.preventDefault();
    const prevConstraints = this.state.constraints;
    const constraints = Object.assign([], prevConstraints);
    constraints[key].name = event.target.value;
    this.setState({ constraints });
  };

  // Updates distance (in KM) for constraint with index == key
  updateConstraintTime = (key, value) => {
    const prevConstraints = this.state.constraints;
    const constraints = Object.assign([], prevConstraints);
    constraints[key].time = value;
    this.setState({ constraints });
  };

  // Adds a Marker to the GoogleMaps component
  addMarker = (lat, lng, name) => {
    const prevMarkers = this.state.markers;
    const markers = Object.assign([], prevMarkers);

    // If name already exists in marker list just replace lat & lng.
    let newMarker = true;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].name === name) {
        newMarker = false;
        markers[i].lat = lat;
        markers[i].lng = lng;
        message.success(`Updated "${name}" Marker`);
        break;
      }
    }
    // Name does not exist in marker list. Create new marker
    if (newMarker) {
      markers.push({ lat, lng, name });
      message.success(`Added new "${name}" Marker`);
    }

    this.setState({ markers });
  };

  // Runs once when the Google Maps library is ready
  // Initializes all services that we need
  apiHasLoaded = (map, mapsApi) => {
    this.setState({
      mapsLoaded: true,
      map,
      mapsApi,
      singaporeLatLng: new mapsApi.LatLng(SG_COOR.lat, SG_COOR.lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      directionService: new mapsApi.DirectionsService()
    });
    this.getGeoCode(this.props.location).then(res => {});
  };
  getGeoCode = async location => {
    return await Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState(
          {
            markers: [lat, lng],
            center: {
              lat: lat,
              lng: lng
            }
          },
          async () => {
            await this.handleSearch(["restaurant", "cafe"], "food").then(
              res => {
                this.setState(
                  { searchResults: res, isResultsLoaded: true },
                  () => {}
                );
              }
            );
            this.handleSearch(["bar"], "drink").then(res => {
              this.setState({
                barSearchResults: res,
                isBarResultsLoaded: true
              });
            });
          }
        );
      },
      error => {
        console.error(error);
      }
    );
  };

  geoCodeFromName = async location => {
    return await Geocode.fromAddress(location).then(response => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    });
  };

  // With the constraints, find some places serving ice-cream
  handleSearch = async (type, query) => {
    const { markers, placesService, directionService, mapsApi } = this.state;
    if (markers.length === 0) {
      message.warn("Add a constraint and try again!");
      return;
    }
    const filteredResults = [];
    const timeLimit = 100;
    const markerLatLng = new mapsApi.LatLng(
      this.state.markers[0],
      this.state.markers[1]
    );
    const placesRequest = {
      location: markerLatLng,
      // radius: '30000',
      type: type, // List of types: https://developers.google.com/places/supported_types
      query: query,
      rankBy: mapsApi.places.RankBy.DISTANCE // Cannot be used with radius.
    };
    await placesService.textSearch(placesRequest, async response => {
      const responseLimit = Math.min(7, response.length);
      for (let i = 0; i < responseLimit; i++) {
        const placeRes = response[i];
        const { rating, name } = placeRes;
        const address = placeRes.formatted_address; // e.g 80 mandai Lake Rd,
        const priceLevel = placeRes.price_level; // 1, 2, 3...
        const user_ratings_total = placeRes.user_ratings_total;
        let photoUrl = "";
        let openNow = false;
        if (placeRes.opening_hours) {
          openNow = placeRes.opening_hours.open_now; // e.g true/false
        }
        if (placeRes.photos && placeRes.photos.length > 0) {
          photoUrl = placeRes.photos[0].getUrl();
        }

        this.geoCodeFromName(address).then(async res => {
          const directionRequest = {
            origin: markerLatLng,
            destination: address,
            travelMode: "DRIVING"
          };
          await directionService.route(directionRequest, (result, status) => {
            console.log(
              "5 directionService",
              query,
              result,
              status,
              directionService
            );
            if (status !== "OK") {
              return;
            }
            const travellingRoute = result.routes[0].legs[0]; // { duration: { text: 1mins, value: 600 } }
            const travellingTimeInMinutes = travellingRoute.duration.value / 60;
            if (travellingTimeInMinutes < timeLimit) {
              const distanceText = travellingRoute.distance.text; // 6.4km
              const timeText = travellingRoute.duration.text; // 11 mins
              const resLat = res.lat;
              const resLng = res.lng;
              const id = i;
              filteredResults.push({
                id,
                name,
                rating,
                address,
                openNow,
                priceLevel,
                photoUrl,
                distanceText,
                timeText,
                resLat,
                resLng,
                user_ratings_total
              });
            }

            return filteredResults;
          });
        });
      }
    });

    return filteredResults;
  };

  render() {
    return (
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ height: "40px" }}
      >
        {/* Maps Section */}
        <div style={{ display: "none" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyARVyJHwWdeZ_mNJQaIf_5j4QwgjYgOUiY",
              libraries: ["places", "directions"]
            }}
            defaultZoom={13}
            center={{
              lat: this.state.center.lat,
              lng: this.state.center.lng
            }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
          />
        </div>
        {this.state.isResultsLoaded === true && (
          <DisplayFeatures
            location={this.props.location}
            searchResults={this.state.searchResults}
            buttonLabel={"Nearby Restaurants"}
          />
        )}

        {this.state.isBarResultsLoaded === true && (
          <DisplayFeatures
            location={this.props.location}
            searchResults={this.state.barSearchResults}
            buttonLabel={"Nearby Bars"}
          />
        )}
      </div>
    );
  }
}

export default FeatureFinder;
