"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroCamera,
  ViroImage,
  ViroScene
} from "react-viro";

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
    this.fetchBars = this.fetchBars.bind(this);
    this.fetchFood = this.fetchFood.bind(this)
    this.fetchActivity = this.fetchActivity.bind(this)
  }
  componentDidMount() {
    this.getLocation();
  }

  catchError() {
    console.log("error");
  }

  getLocation() {
    // Understand the differences between var and let and stick with a convention
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
    // var imagePos = this.pointToAR(40.705109, -74.009112);
    // // translate current device position to a lat/lng

    return (
      <ViroARScene>
        <ViroCamera position={[0, 0, 0]} active={true}>
          <ViroText
            text={`${this.state.lat}, ${this.state.long}`}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -3]}
            style={styles.helloWorldTextStyle}
          />
    
      <ViroImage
            source={require("./res/baricon.png")}
            position={[1.3, 1.5, -5]}
            height={.5}
            width={.5}
            onClick={this.fetchBars}
           
          />
          <ViroImage
            source={require("./res/entertainment-icon-png-14.jpg")}
            position={[1.3, .9, -5]}
            height={.5}
            width={.5}
            onClick={this.fetchActivity}
            />
            <ViroImage
            source={require("./res/food.png")}
            position={[1.3, 2.1, -5]}
            height={.5}
            width={.5}
            onClick={this.fetchFood}
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
  }
/* -------------------------------------- Generalize this ------------------------------------ */
  fetchBars = async () => {
    console.log('bar')
    let barData = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=10&ll=${this.state.lat},${this.state.long}&radius=500&categoryId=4bf58dd8d48988d116941735`
    );
    let place = barData.json();
    console.log("THIS IS BARS >>>>>>", place);                                                                                                                                                              

  };

  fetchActivity = async () => {
    console.log('fun')
    let funData = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=10&ll=${this.state.lat},${this.state.long}&radius=500&categoryId=4d4b7104d754a06370d81259`

    )
    let funPlace = funData.json();
    console.log("THIS IS ENTERTAINMENT" , funPlace)
  }

  fetchFood = async () => {
    console.log('food')
    let foodData = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=10&ll=${this.state.lat},${this.state.long}&radius=500&categoryId=4d4b7105d754a06374d81259`

    )
    let foodPlace = foodData.json();
    console.log("THIS IS FOOD" , foodPlace)
  }

  /* -------------------------------------- End of: Generalize this ------------------------------------ */


}
// 40.704715, -74.009059
// translate image card to xy

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
