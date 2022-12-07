import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const http = axios.create({
    baseURL: 'http://103.226.139.23:3000/api',
    headers: {
        "auth-token": cookies.get("token"),
    },
})

export default http