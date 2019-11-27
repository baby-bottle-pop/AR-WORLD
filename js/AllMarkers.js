"use strict";

import React, { Component } from "react";

import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import store from "../client/store";
import SingleMarker from "./SingleMarker";

import {
  ViroARScene,
  ViroText,
  ViroCamera,
  ViroImage,
  ViroBox
} from "react-viro";

require("../secret");

const AR = props => {
  const { businesses, lat, long } = props.sceneNavigator.viroAppProps;
  console.log("cecerc", props);
  return (
    <ViroARScene>
      <ViroCamera position={[0, 0, 0]} active={true}>
        <ViroText
          text={`${lat}, ${long}`}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -3]}
          style={styles.helloWorldTextStyle}
        />
      </ViroCamera>
      {businesses.length
        ? businesses.map(business => {
            console.log(business.id);
            return (
              <SingleMarker
                key={business.id}
                id={business.id}
                devLat={lat}
                devLong={long}
                name={business.name}
                busLat={business.location.lat}
                busLong={business.location.lng}
              />
            );
          })
        : null}
    </ViroARScene>
  );
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

export default AR;
module.exports = AR;
