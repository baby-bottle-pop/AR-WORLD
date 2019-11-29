import axios from "axios";

const GOT_USER = "GET_USER";

const gotUser = user => {
  console.log(user);
  return {
    type: GOT_USER,
    user
  };
};

const initialState = {
  user: {}
};

export const loginThunk = (email, password) => async dispatch => {
  console.log(typeof password);
  console.log(typeof email);
  try {
    let res = await axios.post("http://192.168.1.120:8081/auth/login", {
      email,
      password
    });
    console.log("thunk", res.data);
    dispatch(gotUser(res.data));
  } catch (error) {
    console.log("ccsadsc");
    return dispatch(gotUser({ error }));
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
