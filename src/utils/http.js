import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api`,
  headers: {
    "Content-Type": "application/json",
    "auth-token": cookies.get("token"),
  },
});

export default http;
