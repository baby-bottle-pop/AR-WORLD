import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroText, ViroImage, ViroFlexView } from "react-viro";
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
    let finalObj = this.pointToAR(this.props.busLat, this.props.busLong);
    console.log(finalObj);
    return (
      <ViroFlexView
        style={{ flexDirection: "column" }}
        width={7}
        height={20}
        position={[finalObj.x, 2, finalObj.z]}
        transformBehaviors={["billboard"]}
        onHover={isHovering => {
          if (!isHovering) {
            this.setState({ clicked: false });
          }
        }}
      >
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
        <ViroFlexView
          style={{ flexDirection: "column", flex: 0.95, marginTop: "10%" }}
          position={[finalObj.x, 2, finalObj.z]}
          transformBehaviors={["billboard"]}
        >
          <ViroFlexView
            onClick={() => {
              this.setState({ clicked: true });
            }}
            style={{ flexDirection: "row", flex: 0.1 }}
            backgroundColor={`black`}
          >
            <ViroImage
              source={require("./res/brand.JPG")}
              style={{ flex: 0.25 }}
            />

            <ViroFlexView
              style={{
                flex: 0.75,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ViroText
                text={`${this.props.name}`}
                // text="HELLO WORLD"
                style={{
                  color: "white",
                  marginTop: "15%",
                  textAlign: "center"
                }}
              />
            </ViroFlexView>
          </ViroFlexView>
          {this.state.clicked ? <Details id={this.props.id} /> : null}
        </ViroFlexView>
      </ViroFlexView>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
    flex: 0.5
  }
});

export default SingleMarker;
