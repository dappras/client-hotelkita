import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import http from "../../utils/http";

const Dashboard = () => {
    const cookies = new Cookies()

    const initState = async () => {
        await cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhZmZhLm5hdWZhbkBnbWFpbC5jb20iLCJpYXQiOjE2NzAzMDc2OTB9.4a6kmfzRarGNd4K1jwOWMg3Lp4enCEtO1Mo81axdZI4")
    }

    useEffect(() => {
        initState()
    }, []) 

    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="container">
                <h1 className="mt-5">Dashboard</h1>
            </div>
            {/* /.content-wrapper */}
        </div>
    )
}

export default Dashboard