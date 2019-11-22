"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroText, ViroBox } from "react-viro";

require("../secret");

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
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

  catchError() {
    console.log("error");
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

  render() {
    var imagePos = this.pointToAR(40.705109, -74.009112);
    // // translate current device position to a lat/lng
    console.log("imagePos", imagePos);
    return (
      <ViroARScene>
        <ViroBox position={[imagePos.x, 1, imagePos.z + 50]}></ViroBox>
        <ViroCamera position={[0, 0, 0]} active={true}>
          <ViroText
            text={`${this.state.lat}, ${this.state.long}`}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -3]}
            onClick={this.fetchedData}
            style={styles.helloWorldTextStyle}
          />
        </ViroCamera>
      </ViroARScene>
    );
  }
  pointToAR(lat, long) {
    console.log("lat", lat);
    console.log("long", long);
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

    console.log("position====>", position.coords);
    console.log("state===>", this.state);
  }
}
// 40.704715, -74.009059
// translate image card to xy

fetchedData = async () => {
  let data = await fetch(
    `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=10&ll=${this.state.lat},${this.state.long}&radius=400`
  );
  console.log("THIS IS DATA", data);
  let place = data.json();
  console.log("THIS IS PLACE >>>>>>", place);
};

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
