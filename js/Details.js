import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroFlexView, ViroText, ViroImage, ViroMaterials } from "react-viro";
import { connect } from "react-redux";
import { getDetailsThunk } from "../client/store/business";
import Reviews from "./Reviews";

class Details extends Component {
  constructor(props) {
    super();
    this.state = { clicked: false };
  }

  componentDidMount() {
    this.props.getDetailsThunk(this.props.id);
  }

  render() {
    let allDetails = this.props.details;

    let details = allDetails.filter(detail => {
      return detail.venue.id === this.props.id;
    });
    let venue;
    if (details.length) {
      venue = details[0].venue;
    }

    let description;
    let address;
    let rating;
    let phone;
    let hours;

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
        "loremcwemcniqebrvibeqkvnwelvnlnvnlocniqebrvibe\nqkvnwelvnlnvlnelvloemcniibeqkvnwelvnlnvlnemcwemcni\nqebrvibeqkvnlnvlnelvloremcwemrvibeqkvnwelvnlnvlem\ncwemcnbrvibeqkvnwelvnlnvloremcwemcniqebrvibeqkvnwnv\nmoremcwemcniqebrvilvnlnvlnelvloremniqebrvibeqkvnwe\nlvnlnvlnelmcwemcniqeelvnlnvlnelvabvcwks";

      address = "ASIA";
      rating = 10;
      phone = "1213143414";
      hours = "open till 7pm";
    }
    return (
      <ViroFlexView style={{ flex: 0.65, marginTop: "3%" }} materials="bg">
        {/* description .3 */}
        <ViroFlexView
          style={{ flex: 0.3, textAlign: "center", marginTop: "10%" }}
        >
          <ViroText
            text="Description"
            style={{
              flex: 0.2,
              fontSize: 40,
              color: "white",
              textAlign: "center",
              fontWeight: "bold"
            }}
          />
          <ViroText
            text={description}
            style={{
              flex: 0.8,
              fontSize: 24,
              color: "white",
              textAlign: "center"
            }}
          />
        </ViroFlexView>

        {/* smalldetails .2 */}
        <ViroFlexView style={{ flex: 0.2, flexDirection: "row" }}>
          <ViroFlexView style={{ flex: 0.5, flexDirection: "column" }}>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 40,
                  fontFamily: "Cochin"
                }}
                text="Address"
              />
              <ViroText
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontFamily: "Cochin"
                }}
                text={`${address}`}
              />
            </ViroFlexView>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 40,
                  fontFamily: "Cochin"
                }}
                text="Rating"
              />
              <ViroText
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontFamily: "Cochin"
                }}
                text={`${rating}`}
              />
            </ViroFlexView>
          </ViroFlexView>
          <ViroFlexView style={{ flex: 0.5, flexDirection: "column" }}>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 40,
                  fontFamily: "Cochin"
                }}
                text="Phone Number"
              />
              <ViroText
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontFamily: "Cochin"
                }}
                text={`${phone}`}
              />
            </ViroFlexView>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 40,
                  fontFamily: "Cochin"
                }}
                text="Hours"
              />
              <ViroText
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontFamily: "Cochin"
                }}
                text={`${hours}`}
              />
            </ViroFlexView>
          </ViroFlexView>
        </ViroFlexView>

        {/* reviews .4 */}
        <ViroFlexView style={{ flex: 0.4, marginTop: "10%" }}>
          <ViroText
            style={{
              flex: 0.2,
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
              color: "white"
            }}
            text="REVIEWS"
          />
          <Reviews id={this.props.id} />
        </ViroFlexView>

        {/* add review button .1 */}
        <ViroFlexView
          style={{ flex: 0.1, alignItems: "center", marginBottom: "5%" }}
        >
          <ViroFlexView
            style={{ flex: 0.7 }}
            width={5}
            backgroundColor="#33F9FF"
            onClick={this.props.addReview}
          >
            <ViroText
              text="ADD A REVIEW"
              style={{
                marginTop: "2%",
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
                color: "black"
              }}
            />
          </ViroFlexView>
        </ViroFlexView>
      </ViroFlexView>
    );
  }
}

ViroMaterials.createMaterials({
  bg: {
    diffuseTexture: require("../js/res/box2.png")
  },
  bg2: {
    diffuseTexture: require("../js/res/silver.jpg")
  }
});

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
    marginTop: "2%",
    flex: 0.1
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "#b22222",
    marginTop: "5%",
    flex: 0.1,
    marginRight: 0.5
  },
  descriptionInfo: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Cochin",
    alignItems: "flex-start",
    color: "#0000cd",
    textAlign: "center",
    marginRight: 0.5
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
