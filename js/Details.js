import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroFlexView, ViroText } from "react-viro";
import { connect } from "react-redux";
import { getDetailsThunk } from "../client/store/business";

class Details extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getDetails(this.props.id);
  }

  render() {
    const { venue } = this.props.details;
    console.log(venue);
    let description;
    let address;
    let rating;
    let phone;
    let hours;
    let review;

    if (venue) {
      if (venue.description) {
        description = venue.description;
      } else if (venue.page) {
        description = venue.page.pageInfo.description;
      } else {
        description = "No Description Available";
      }
      address = venue.location
        ? venue.location.formattedAddress
        : "No address available";
      rating = venue.rating ? venue.rating : "No Ratings";
      phone = venue.formattedPhone
        ? venue.formattedPhone
        : "No phone number Available";
      hours = venue.hours ? venue.hours.status : "No Hours Available";
      review = venue.tips.groups[0].items[0]
        ? venue.tips.groups[0].items[0].text
        : "No Reviews Yet";
    } else {
      description =
        "loremcwemcniqebrvibeqkvnwelvnlnvlnelvnloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelv";

      address = "ASIA";
      rating = 10;
      phone = "1213143414";
      hours = "open till 7pm";
      review = "best place ever";
    }

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
    return (
      <ViroFlexView
        backgroundColor="black"
        style={{ flex: 0.8, marginTop: "10%" }}
      >
        <ViroText style={styles.subHeadings} text="Description" />
        <ViroText
          style={{ color: "white" }}
          text={`${description}`}
          textLineBreakMode="charwrap"
        />
        <ViroText style={styles.subHeadings} text="Address" />
        <ViroText style={{ color: "white" }} text={`${address}`} />
        <ViroText style={styles.subHeadings} text="Rating" />
        <ViroText style={{ color: "white" }} text={`${rating}`} />
        <ViroText style={styles.subHeadings} text="Phone Number" />
        <ViroText style={{ color: "white" }} text={`${phone}`} />
        <ViroText style={styles.subHeadings} text="Hours" />
        <ViroText style={{ color: "white" }} text={`${hours}`} />
        <ViroText style={styles.subHeadings} text="Review" />
        <ViroText style={{ color: "white" }} text={`${review}`} />
      </ViroFlexView>
    );
  }
}
const mapStateToProps = state => ({ details: state.businessReducer.details });
const mapDispatchToProps = dispatch => ({
  getDetails: id => dispatch(getDetailsThunk(id))
});

const styles = StyleSheet.create({
  subHeadings: {
    fontSize: 24
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
