import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroText, ViroImage, ViroFlexView, ViroMaterials } from "react-viro";
import Details from "./Details";

class SingleMarker extends Component {
  constructor(props) {
    super();
    this.state = { clicked: false };
    this.pointToAR = this.pointToAR.bind(this);
    this.latLongtoMerc = this.latLongtoMerc.bind(this);
  }
  pointToAR(lat, long) {
    let objPoint = this.latLongtoMerc(lat, long);
    let objDev = this.latLongtoMerc(this.props.devLat, this.props.devLong);
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

  render() {
    console.log("PROPS", this.props);
    let icon =
      this.props.icon === "/res/city.png"
        ? require("../js/res/city.png")
        : this.props.icon === "/res/baricon.png"
        ? require("../js/res/baricon.png")
        : this.props.icon === "/res/entertainment-icon-png-14.jpg"
        ? require("../js/res/entertainment-icon-png-14.jpg")
        : this.props.icon === "/res/food.png"
        ? require("../js/res/food.png")
        : null;

    let finalObj = this.pointToAR(this.props.busLat, this.props.busLong);
    console.log(finalObj);
    return (
      <ViroFlexView
        style={{ flexDirection: "column" }}
        width={8}
        height={20}
        position={[finalObj.x, 1, finalObj.z]}
        transformBehaviors={["billboard"]}
      >
        {/* xbutton */}
        {this.state.clicked ? (
          <ViroImage
            style={{ flex: 0.05 }}
            width={1}
            source={require("../js/res/remove.png")}
            onClick={() => {
              this.setState({ clicked: false });
            }}
          />
        ) : null}
        {/* marker */}
        <ViroFlexView
          style={{
            flexDirection: "row",
            flex: 0.1,
            marginTop: "2%"
          }}
          backgroundColor={this.props.color}
        >
          {/* icon/name  */}
          <ViroFlexView
            onClick={() => this.setState({ clicked: true })}
            style={{
              flexDirection: "row",
              flex: 0.7,
              marginLeft: "2%"
            }}
          >
            {/* icon  */}
            <ViroImage source={icon} style={{ flex: 0.25 }} />
            {/* name  */}
            <ViroText
              text={this.props.name}
              style={{
                flex: 0.75,
                textAlign: "center",
                color: "black",
                marginTop: "10%",
                fontSize: 30
              }}
            />
          </ViroFlexView>
          {/* map  */}
          <ViroImage
            source={require("./res/directions-icon.png")}
            style={{ flex: 0.3 }}
            onClick={this.props.mapCall}
          />
        </ViroFlexView>
        {/* details */}
        {this.state.clicked ? (
          <Details id={this.props.id} addReview={this.props.addReview} />
        ) : null}
      </ViroFlexView>
    );
  }
}

export default SingleMarker;
