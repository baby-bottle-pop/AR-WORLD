import io from "socket.io-client";
import store from "./store";
import { addReviewThunk } from "./store/reviews";

const socket = io("https://ar-server-v2.herokuapp.com");

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("new-review", data => {
    store.dispatch(addReviewThunk(data));
  });
});

export default socket;
