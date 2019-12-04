import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Splash extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.loginNavigator();
    }, 3000);
  }
  render() {
    return (
      <View style={styles.welcome}>
        <Text style={styles.heading}>Welcome To AR WORLD</Text>
        <View style={styles.pics}>
          <Image style={styles.image} source={require('./res/yooni.jpg')} />
          <Image style={styles.image} source={require('./res/brand.JPG')} />
          <Image style={styles.image} source={require('./res/martin.jpg')} />
          <Image style={styles.image} source={require('./res/Alex.jpg')} />
          {/* <Image style={styles.image} source={require("./res/baricon.png")} />
          <Image style={styles.image} source={require("./res/city.png")} />
          <Image style={styles.image} source={require("./res/food.png")} />
          <Image style={styles.image} source={require("./res/entertainment-icon-png-14.jpg")} /> */}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AED6F1',
  },
  heading: {
    fontSize: 75,
    textAlign: 'center',
  },
  pics: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: '5%',
  },
});
