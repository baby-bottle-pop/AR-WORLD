"use strict";

import React, { Component } from "react";
import SingleMarker from "./SingleMarker";

<<<<<<< HEAD
import { ViroARScene } from "react-viro";
=======
import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimatedImage,
  ViroARPlaneSelector
} from "react-viro";
>>>>>>> master

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
          height={0.7}
          width={0.7}
          transformBehaviors={"billboard"}
          source={{
            uri: "https://media.giphy.com/media/JSoz56zJrygUNUSi20/giphy.gif"
          }}
        />
      </ViroARImageMarker>
      <ViroARPlaneSelector
        alignment={"HorizontalUpward"}
        dragType={"FixedDistance"}
      >
        <ViroAnimatedImage
          opacity={0.1}
          minWidth={0.5}
          minHeight={0.5}
          transformBehaviors={"billboard"}
          source={{
            uri: "https://media.giphy.com/media/Q99A6dXgEr3shEYNi3/giphy.gif"
          }}
        />
      </ViroARPlaneSelector>
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
    physicalWidth: 0.165 // real world width in meters
  }
});

export default AR;
module.exports = AR;
