import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroFlexView, ViroText, ViroImage } from "react-viro";
import { connect } from "react-redux";
import { getDetailsThunk } from "../client/store/business";
import Reviews from "./Reviews";

class Details extends Component {
  constructor(props) {
    super();
    this.state = { clicked: false };
  }

  componentDidMount() {
    // this.props.getDetailsThunk(this.props.id);
  }

  render() {
    let allDetails = this.props.details;
    console.log(allDetails);
    let details = allDetails.filter(detail => {
      console.log("store", detail);
      console.log("id", this.props.id);
      return detail.venue.id === this.props.id;
    });
    let venue;
    if (details.length) {
      console.log("the details", details[0].venue);
      venue = details[0].venue;
      console.log(venue);
    }

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
        if (venue.page.pageInfo) {
          description = venue.page.pageInfo.description;
        } else {
          description = "No Description Available";
        }
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
        "loremcwemcniqebrvibeqkvnwelvnlnvlnelvnloremcwemcniqebrvibe\nqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcni\nqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvlorem\ncwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnv\nmlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwe\nlvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvabvcwks";

      address = "ASIA";
      rating = 10;
      phone = "1213143414";
      hours = "open till 7pm";
      review = "best place ever";
    }
    return (
      <ViroFlexView
        style={{
          flex: 0.9,
          marginTop: "10%"
        }}
      >
        <ViroFlexView
          style={{
            flex: 0.3,
            backgroundColor: "gray",
            justifyContent: "center"
          }}
        >
          <ViroText style={styles.description} text="Description" />
          <ViroText style={styles.info} text={`${description}`} />
        </ViroFlexView>
        <ViroFlexView
          style={{
            backgroundColor: "#F1F7F7",
            flex: 0.3,
            flexDirection: "row",
            marginTop: "3%",
            opacity: 0.85
          }}
        >
          <ViroFlexView style={{ flex: 0.5, flexDirection: "column" }}>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Address" />
              <ViroText style={styles.info} text={`${address}`} />
            </ViroFlexView>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Rating" />
              <ViroText style={styles.info} text={`${rating}`} />
            </ViroFlexView>
          </ViroFlexView>
          <ViroFlexView style={{ flex: 0.5, flexDirection: "column" }}>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Phone Number" />
              <ViroText style={styles.info} text={`${phone}`} />
            </ViroFlexView>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Hours" />
              <ViroText style={styles.info} text={`${hours}`} />
            </ViroFlexView>
          </ViroFlexView>
        </ViroFlexView>
        <ViroFlexView
          style={{ flex: 0.4, backgroundColor: "gray", alignItems: "center" }}
        >
          <ViroText style={styles.reviews} text="Review" />
          <ViroText
            style={{ flex: 0.2, color: "black", textAlign: "center" }}
            text={`${review}`}
          />
          <ViroImage
            transformBehaviors={["billboard"]}
            style={{ flex: 0.3 }}
            width={1.5}
            source={require("../js/res/reviews.png")}
            onClick={() => {
              this.props.addReview();
              console.log("yay");
            }}
          />
          <Reviews id={this.props.id} />
        </ViroFlexView>
      </ViroFlexView>
    );
  }
}
const mapStateToProps = state => ({ details: state.businessReducer.details });
const mapDispatchToProps = dispatch => ({
  getDetailsThunk: id => dispatch(getDetailsThunk(id))
});

const styles = StyleSheet.create({
  subHeadings: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "#b22222"
  },
  reviews: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "#b22222",
    marginTop: "5%",
    flex: 0.1
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "#b22222",
    marginTop: "10%",
    flex: 0.1
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Cochin",
    alignItems: "flex-start",
    color: "#0000cd",
    textAlign: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
