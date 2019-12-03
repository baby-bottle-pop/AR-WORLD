require('../../secret');

const GET_ALL = 'GET_ALL';
const GET_DETAILS = 'GET_DETAILS';
const ALL_BUSINESS = 'ALL_BUSINESS';

const allBusiness = (business, color, icon) => {
  return {
    type: ALL_BUSINESS,
    business,
    color,
    icon,
  };
};

const gettingAll = (business, color, icon) => {
  return {
    type: GET_ALL,
    business,
    color,
    icon,
  };
};

const getDetails = (details, id) => {
  return {
    type: GET_DETAILS,
    details,
    id,
  };
};

const initialState = {
  business: [],
  color: '',
  details: [],
  icon: '',
  id: '',
};

export const gettingAllThunk = (
  lat,
  long,
  category,
  color,
  icon
) => async dispatch => {
  try {
    let categoryId;
    if (category === 'activity') {
      categoryId = '4d4b7104d754a06370d81259';
    } else if (category === 'food') {
      categoryId = '4d4b7105d754a06374d81259';
    } else if (category === 'bars') {
      categoryId = '4bf58dd8d48988d116941735';
    }

    const data = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=8&ll=${lat},${long}&radius=500&categoryId=${categoryId}`
    );
    const placesData = await data.json();
    const venues = placesData.response.venues;
    dispatch(gettingAll(venues, color, icon));
  } catch (error) {
    console.error(error);
  }
};

export const allBusinessThunk = (lat, long, color, icon) => async dispatch => {
  try {
    const data = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=8&ll=${lat},${long}&radius=500`
    );
    const placesData = await data.json();

    const venues = placesData.response.venues;

    dispatch(allBusiness(venues, color, icon));
  } catch (error) {
    console.log(error);
  }
};

export const getDetailsThunk = id => async dispatch => {
  try {
    const data = await fetch(
      `https://api.foursquare.com/v2/venues/${id}/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20191122`
    );
    const resData = await data.json();
    console.log('THIUNKKKKKKKKK', resData.response);

    dispatch(getDetails(resData.response, id));
  } catch (error) {
    console.log(error);
  }
};

export default function businessReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        business: action.business,
        color: action.color,
        icon: action.icon,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: [...state.details, action.details],
        id: action.id,
      };
    case ALL_BUSINESS:
      return {
        ...state,
        business: action.business,
        color: action.color,
        icon: action.icon,
      };
    default:
      return state;
  }
}
