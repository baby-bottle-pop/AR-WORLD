import axios from "axios";

const GOT_USER = "GET_USER";
const NEW_USER = "NEW_USER";

const newUser = user => ({ type: NEW_USER, user });

const gotUser = user => {
  return {
    type: GOT_USER,
    user
  };
};

const initialState = {
  user: {}
};

export const loginThunk = (email, password) => async dispatch => {
  try {
    let res = await axios.post(
      `https://ar-server-v2.herokuapp.com/auth/login`,
      {
        //put your comp ip address
        email,
        password
      }
    );

    dispatch(gotUser(res.data));
  } catch (error) {
    return dispatch(gotUser({ error }));
  }
};

export const signUpThunk = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  try {
    let res = await axios.post(
      `https://ar-server-v2.herokuapp.com/api/user/signup`,
      {
        //put your comp ip address
        email,
        password,
        firstName,
        lastName
      }
    );
    let newUser = { email, password };
    dispatch(gotUser(newUser));
  } catch (error) {
    return dispatch(gotUser({ error }));
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { user: action.user };
    default:
      return state;
  }
};

export default userReducer;
