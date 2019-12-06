"use strict";

import React, { Component } from "react";
import SingleMarker from "./SingleMarker";

import { ViroARScene } from "react-viro";

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

export default AR;
module.exports = AR;
