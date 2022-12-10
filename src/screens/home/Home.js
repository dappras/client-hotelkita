import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import Navbar from "../../component/navbar";
import http from "../../utils/http";

const Home = () => {
    const cookies = new Cookies()

    const initState = async () => {
        await cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3MDYwNzIxOX0.V5YhmSiaaaEFxijfKwrlKyzL1B8GLxRVqfOo92crPKY", {path: '/'})

        await http.post("/get-category").then(res => {
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])

    return(
        <div className="container">
            <Navbar active={'home'} />

            <div className="row mt-3">
                <div className="col-lg-12">
                    <img src="./coverHome.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                </div>
            </div>

            <a href="/dashboard">dashboard</a>
            <h1>Homepage</h1>
        </div>
    )
}

export default Home