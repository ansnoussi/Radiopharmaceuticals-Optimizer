import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://api:5000/";

export default axios.create({
  baseURL,
  withCredentials: true,
});
