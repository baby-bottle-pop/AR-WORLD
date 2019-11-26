import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import { gettingAllThunk, getReviewsThunk } from "../client/store/business";
import { connect } from "react-redux";

let InitialARScene = require("./GPSTEST");
class disARWorld extends Component {
  constructor(props) {
    super();
    this.state = {
      lat: 0,
      long: 0
    };
    this.geo_success = this.geo_success.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.catchError = this.catchError.bind(this);
    this.pointToAR = this.pointToAR.bind(this);
    this.latLongtoMerc = this.latLongtoMerc.bind(this);
  }
  componentDidMount() {
    this.getLocation();
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

  pointToAR(lat, long) {
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
  catchError() {
    console.log("error");
  }

  render() {
    return (
      <View style={localStyles.outer}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
          worldAlignment="GravityAndHeading"
        />
        <View
          style={{
            position: "absolute",
            left: 1,
            right: 0,
            top: 1,

            flexDirection: "row-reverse",
            justifyContent: "space-around"
          }}
        >
          <TouchableOpacity
            style={localStyles.buttonTwo}
            onPress={() => {
              //   this.gettingAllThunk({...this.state});
            }}
          >
            <Image
              // style={localStyles.imageIcon}
              // width={10}
              // height={10}
              source={require("./res/city.png")}
              style={{
                alignItems: "center",
                padding: 20,
                marginEnd: 10,
                // justifyContent: "space-between",
                height: 10,
                width: 10
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.buttonTwo}
            onPress={() => {
              this.props.gettingAllThunk(
                this.state.lat,
                this.state.long,
                "bars"
              );
            }}
          >
            <Image
              // style={localStyles.imageIcon}
              // width={10}
              // height={10}
              source={require("./res/baricon.png")}
              style={{
                alignItems: "center",
                padding: 20,
                marginEnd: 10,
                // justifyContent: "space-between",
                height: 10,
                width: 10
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.buttonTwo}
            onPress={() => {
              this.props.gettingAllThunk(
                this.state.lat,
                this.state.long,
                "activity"
              );
            }}
          >
            <Image
              // style={localStyles.imageIcon}
              // width={10}
              // height={10}
              source={require("./res/entertainment-icon-png-14.jpg")}
              style={{
                alignItems: "center",
                padding: 20,
                marginEnd: 10,
                // justifyContent: "space-between",
                height: 10,
                width: 10
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.buttonTwo}
            onPress={() => {
              this.props.gettingAllThunk(
                this.state.lat,
                this.state.long,
                "food"
              );
            }}
          >
            <Image
              // style={localStyles.imageIcon}
              // height={10}
              // width={10}
              source={require("./res/food.png")}
              style={{
                alignItems: "center",
                padding: 20,
                marginEnd: 10,
                // justifyContent: "space-between",
                height: 10,
                width: 10
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

let localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  imageIcon: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  buttonTwo: {
    alignItems: "center",
    padding: 20,
    marginEnd: 10,
    justifyContent: "space-between"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

const mapStateToProps = state => ({
  business: state.business,
  reviews: state.reviews
});

const mapDispatchToProps = dispatch => {
  return {
    gettingAllThunk: (lat, long, category) =>
      dispatch(gettingAllThunk(lat, long, category)),
    getReviewsThunk: id => dispatch(getReviewsThunk(id))
  };
};

const ARWorld = connect(mapStateToProps, mapDispatchToProps)(disARWorld);
export default ARWorld;
module.exports = ARWorld;
