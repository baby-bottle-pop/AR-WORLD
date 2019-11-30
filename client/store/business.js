require("../../secret");

const GET_ALL = "GET_ALL";
const GET_DETAILS = "GET_DETAILS";
const ALL_BUSINESS = "ALL_BUSINESS";

const allBusiness = business => {
  return {
    type: ALL_BUSINESS,
    business
  };
};

const gettingAll = business => {
  return {
    type: GET_ALL,
    business
  };
};

const getDetails = details => {
  return {
    type: GET_DETAILS,
    details
  };
};

const initialState = {
  business: [],
  details: {}
};

export const gettingAllThunk = (lat, long, category) => async dispatch => {
  try {
    let categoryId;
    if (category === "activity") {
      categoryId = "4d4b7104d754a06370d81259";
    } else if (category === "food") {
      categoryId = "4d4b7105d754a06374d81259";
    } else if (category === "bars") {
      categoryId = "4bf58dd8d48988d116941735";
    }

    const data = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=8&ll=${lat},${long}&radius=500&categoryId=${categoryId}`
    );
    const placesData = await data.json();
    const venues = placesData.response.venues;
    dispatch(gettingAll(venues));
  } catch (error) {
    console.error(error);
  }
};

export const allBusinessThunk = (lat, long) => async dispatch => {
  try {
    console.log(lat, long);
    const data = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=8&ll=${lat},${long}&radius=500`
    );
    const placesData = await data.json();
    console.log(placesData);
    const venues = placesData.response.venues;
    console.log(venues);
    dispatch(allBusiness(venues));
  } catch (error) {
    console.log(error);
  }
};

export const getDetailsThunk = id => async dispatch => {
  try {
    const data = await fetch(
      `https://api.foursquare.com/v2/venues/${id}/?client_id=UDXQIU2Q23T3EE3SN2YCNVG3CWNTO0ARA505EJUHWJ2030EO&client_secret=1VNOKM14FEZDGT3DTFL4LTNOHDPR5WFF4GI5VSIBCHI3DSNY&v=20191122`
    );
    const resData = await data.json();
    console.log(resData.response);
    dispatch(getDetails(resData.response));
  } catch (error) {
    console.log(error);
  }
};

export default function businessReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        business: action.business
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.details
      };
    case ALL_BUSINESS:
      return {
        ...state,
        business: action.business
      };
    default:
      return state;
  }
}