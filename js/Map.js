import React from "react";
import { View, Text } from "react-native";

export default class Map extends React.Component {
  render() {
    console.log("CLICKEDDDDDD");
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          backgroundColor: "white"
        }}
      >
        <Text>HELLO THERE</Text>
      </View>
    );
  }
}
