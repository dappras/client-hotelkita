import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import http from "../../utils/http";

const Home = () => {
    const cookies = new Cookies()

    const initState = async () => {
        await cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlczEyMzRAZ21haWwuY29tIiwiaWF0IjoxNjY5NzA1NTQ1fQ.I_tZrYe9bPOj7g5rcqZ82wQh695HBiEXszpUVDze640")

        const API = await http.post("category/get-category").then(res => {
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        })

        return API
    }

    useEffect(() => {
        initState()
    }, [])

    return(
        <div className="container">
            <h1>Homepage</h1>
        </div>
    )
}

export default Home