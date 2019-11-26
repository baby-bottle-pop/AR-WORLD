"use strict";

import React, { Component } from "react";
import { gettingAllThunk, getReviewsThunk } from "../client/store/business";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import store from "../client/store";

import {
  ViroARScene,
  ViroText,
  ViroCamera,
  ViroImage,
  ViroBox
} from "react-viro";

require("../secret");

class AR extends Component {
  constructor(props) {
    super(props);
    // Set initial state here
    this.state = {
      names: [],
      locations: [],
      lat: 0,
      long: 0
    };

    // bind 'this' to functions
    this.geo_success = this.geo_success.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.catchError = this.catchError.bind(this);
    this.pointToAR = this.pointToAR.bind(this);
    this.latLongtoMerc = this.latLongtoMerc.bind(this);
  }
  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    var options = { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.geo_success,
        this.catchError,
        options
      );
    } else {
      this.catchError();
    }
  }

  pointToAR(lat, long) {
    let objPoint = this.latLongtoMerc(lat, long);
    let objDev = this.latLongtoMerc(this.state.lat, this.state.long);
    let z = objPoint.y - objDev.y;
    let x = objPoint.x - objDev.x;
    if (Math.abs(z) > 200 || Math.abs(x) > 200) {
      x = x * 0.1;
      z = z * 0.1;
    }
    return { x, z: -z };
  }

  latLongtoMerc(lat, long) {
    let lonRad = (long / 180) * Math.PI;
    let latRad = (lat / 180) * Math.PI;
    let R = 6378137.0;
    let x = R * lonRad;
    let y = R * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
    return { x, y };
  }

  geo_success(position) {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  }

  catchError() {
    console.log("error");
  }

  render() {
    // var imagePos = this.pointToAR(40.705109, -74.009112);
    // // translate current device position to a lat/lng
    console.log("State: ", this.state);
    console.log("Props: ", this.props);
    return (
      <ViroARScene>
        <ViroCamera position={[0, 0, 0]} active={true}>
          <ViroText
            text={`${this.state.lat}, ${this.state.long}`}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -3]}
            style={styles.helloWorldTextStyle}
          />
        </ViroCamera>
        {this.state.names.map((name, index) => {
          let coordinates = this.state.locations[index];
          let position = this.pointToAR(coordinates.lat, coordinates.long);
          console.log(position);
          return (
            <ViroText
              text={name}
              height={3}
              width={3}
              key={index}
              scale={[3, 3, 3]}
              position={[position.x, 2, position.z]}
            />
          );
        })}
      </ViroARScene>
    );
  }

  //   fetchOptions = async category => {
  //     let categoryId;
  //     if (category === 'activity') {
  //       categoryId = '4d4b7104d754a06370d81259';
  //     } else if (category === 'food') {
  //       categoryId = '4d4b7105d754a06374d81259';
  //     } else if (category === 'bars') {
  //       categoryId = '4bf58dd8d48988d116941735';
  //     }
  //     try {
  //       let categoryData = await fetch(
  //         `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=15&ll=${this.state.lat},${this.state.long}&radius=500&categoryId=${categoryId}`
  //       );

  //       let place = await categoryData.json();
  //       console.log(place);
  //       let names = place.response.venues.map(n => n.name);
  //       let locations = place.response.venues.map(l => ({
  //         lat: l.location.lat,
  //         long: l.location.lng,
  //       }));
  //       this.setState({
  //         names,
  //         locations,
  //       });
  //       console.log(names);
  //       console.log(locations);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

export default AR;
module.exports = AR;
