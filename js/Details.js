import React, { Component } from "react";
import { ViroFlexView, ViroText } from "react-native";

export default class Details extends Component {
  render() {
    return (
      <ViroFlexView backgroundColor="black" style={{ flex: 0.8 }}>
        <ViroText style={{ color: "white" }} text="I WAS CLICKED" />
      </ViroFlexView>
    );
  }
}
