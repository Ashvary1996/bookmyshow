import axios from "axios";
const dotenv = require("dotenv").config();

const instance = axios.create({
  baseURL:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? process.env.REACT_APP_API_LOCAL_PATH
      : process.env.REACT_APP_API_LIVE_PATH,
  timeout: 5000,
});

console.log(
  process.env.REACT_APP_API_LOCAL_PATH,window.location.hostname
);

export default instance;
