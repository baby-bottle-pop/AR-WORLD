import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ViroText,
  ViroButton,
  ViroScene,
  ViroBox,
  ViroNode,
  ViroImage,
  ViroFlexView
} from "react-viro";
import { connect } from "react-redux";
import { getDetailsThunk } from "../client/store/business";

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
    // console.log(this.props.name);
    // console.log("description", this.props.details.page.pageInfo.description);
    // console.log("location", this.props.details.location); // .lat,.lng, .formattedAddress[0]
    // console.log("name", this.props.details.name);
    // console.log("phone", this.props.details.formattedPhone);
    // console.log("rating", this.props.details.rating);
    // console.log("hours", this.props.details.hours.timeframes); // is an array timeframes[i].days, and .open[0].renderedTime
    // console.log("review", this.props.details.tips.groups[0].items[0].text); // a random review
    // {
    //   this.props.details.venue
    //     ? console.log(this.props.details.venue.location)
    //     : console.log("broken");
    // }
    let finalObj = this.pointToAR(this.props.busLat, this.props.busLong);
    console.log(finalObj);
    return (
      <ViroFlexView
        style={{ flexDirection: "column" }}
        width={7}
        height={10}
        position={[finalObj.x, 2.5, finalObj.z]}
        transformBehaviors={["billboard"]}
      >
        <ViroFlexView
          onClick={() => {
            console.log("cliclced");
            this.setState({ clicked: !this.state.clicked });
          }}
          width={7}
          height={2}
          style={{ flexDirection: "row", flex: 0.2 }}
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
              style={{}}
              text={`${this.props.name}`}
              // text="HELLO WORLD"
              style={{ color: "white", marginTop: "15%" }}
            />
          </ViroFlexView>
        </ViroFlexView>
        {this.state.clicked ? (
          <ViroFlexView backgroundColor="black" style={{ flex: 0.8 }}>
            <ViroText style={{ color: "white" }} text="I WAS CLICKED" />
          </ViroFlexView>
        ) : null}
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

const mapStateToProps = state => ({ details: state.details });
const mapDispatchToProps = dispatch => ({
  getDetails: id => dispatch(getDetailsThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMarker);
