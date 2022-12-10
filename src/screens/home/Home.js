import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import Navbar from "../../component/navbar";
import http from "../../utils/http";

const Home = () => {
    const cookies = new Cookies()

    const initState = async () => {
        console.log(cookies.get('token'));
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
        </div>
    )
}

export default Home