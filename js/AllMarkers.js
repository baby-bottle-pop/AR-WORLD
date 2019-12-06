"use strict";

import React, { Component } from "react";
import SingleMarker from "./SingleMarker";

import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimatedImage,
  ViroARPlaneSelector
} from "react-viro";

require("../secret");

const AR = props => {
  const {
    businesses,
    lat,
    long,
    color,
    icon,
    addReview,
    mapCall
  } = props.sceneNavigator.viroAppProps;
  console.log(businesses);
  return (
    <ViroARScene style={{ flex: 1 }}>
      <ViroARImageMarker target={"targetOne"}>
        <ViroAnimatedImage
          height={0.4}
          width={0.4}
          transformBehaviors={"billboard"}
          source={{
            uri: "https://media.giphy.com/media/JSoz56zJrygUNUSi20/giphy.gif"
          }}
        />
      </ViroARImageMarker>
      <ViroARImageMarker target={"targetTwo"}>
        <ViroAnimatedImage
          height={0.4}
          width={0.4}
          transformBehaviors={"billboard"}
          source={{
            uri: "https://media.giphy.com/media/TIiyIEh2FUN7aTESJJ/giphy.gif"
          }}
        />
      </ViroARImageMarker>
      <ViroARImageMarker target={"targetThree"}>
        <ViroAnimatedImage
          height={0.4}
          width={0.4}
          transformBehaviors={"billboard"}
          source={{
            uri: "https://media.giphy.com/media/QpWDP1YMziaQw/giphy.gif"
          }}
        />
      </ViroARImageMarker>

      {businesses.length
        ? businesses.map(business => {
            return (
              <SingleMarker
                key={business.id}
                id={business.id}
                devLat={lat}
                devLong={long}
                name={business.name}
                busLat={business.location.lat}
                busLong={business.location.lng}
                color={color}
                icon={icon}
                addReview={addReview}
                mapCall={mapCall}
                // busLat={40.759355}
                // busLong={-73.911742}
              />
            );
          })
        : null}
    </ViroARScene>
  );
};
ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require("./res/stop.png"),
    orientation: "Up",
    physicalWidth: 0.165
  },
  targetTwo: {
    source: require("./res/one-way.png"),
    orientation: "Up",
    physicalWidth: 0.165
  },
  targetThree: {
    source: require("./res/walking.png"),
    orientation: "Up",
    physicalWidth: 0.165
  }
});

export default AR;
module.exports = AR;
