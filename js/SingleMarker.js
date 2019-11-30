import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ViroText,
  ViroButton,
  ViroScene,
  ViroBox,
  ViroNode,
  ViroImage
} from "react-viro";
import { connect } from "react-redux";
import { getDetailsThunk } from "../client/store/business";

class SingleMarker extends Component {
  constructor(props) {
    super();
    this.state = { clicked: true };
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
    return this.state.clicked ? (
      <ViroImage
        onClick={() => this.setState({ clicked: false })}
        transformBehaviors={["billboard"]}
        source={require("./res/brand.JPG")}
        opacity={0.9}
        position={[finalObj.x, 10, finalObj.z]}
      />
    ) : null;
  }
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

const mapStateToProps = state => ({ details: state.details });
const mapDispatchToProps = dispatch => ({
  getDetails: id => dispatch(getDetailsThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMarker);
