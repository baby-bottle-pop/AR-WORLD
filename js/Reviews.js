import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroFlexView, ViroText } from "react-viro";
import { getReviewsThunk } from "../client/store/reviews";
import { connect } from "react-redux";

class Reviews extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    // this.props.getReviewsThunk(this.props.id);
  }

  render() {
    let reviews = [
      "this is the best place ever",
      "the food here is to die for",
      "i brought my parents here and they loved it",
      "the customer service here was pretty bad"
    ];
    return (
      <ViroFlexView style={{ flex: 0.5, marginTop: "2%" }}>
        {/* {this.props.reviews.map(review => {
          return <ViroText style={styles.info} text={review.content} />;
        })} */}
        {reviews.map(review => {
          return (
            <ViroText
              style={{
                textAlign: "center",
                fontSize: 30,
                color: "white"
              }}
              text={review}
            />
          );
        })}
      </ViroFlexView>
    );
  }
}
const mapStateToProps = state => ({
  reviews: state.reviewReducer.reviews,
  businesses: state.businessReducer.business
});
const mapDispatchToProps = dispatch => ({
  getReviewsThunk: id => dispatch(getReviewsThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
