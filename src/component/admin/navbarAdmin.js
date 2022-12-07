import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import http from "../../utils/http";

const NavbarAdmin = () => {
    const [dataProfile, setDataProfile] = useState()

    const cookies = new Cookies()

    const initState = async () => {
        await cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhZmZhLm5hdWZhbkBnbWFpbC5jb20iLCJpYXQiOjE2NzAzMDc2OTB9.4a6kmfzRarGNd4K1jwOWMg3Lp4enCEtO1Mo81axdZI4")

        await http.post('/get-profile').then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
                setDataProfile(res.data.data)
            }
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, []) 


    return (
        <div>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a href="/dashboard" className="nav-link">Home</a>
            </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link mb-3" data-toggle="dropdown" href="#">
                        <div style={{ width: 50, height:50 }}>
                            {dataProfile && <img src={ dataProfile.imageUrl } className="nav-link" style={{ borderRadius: 100, width: '100%', height: '100%', objectFit: 'cover' }} data-toogle="drodpdown" alt="User Image" />}
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right mt-2">
                        <span className="dropdown-item dropdown-header"><i className="fas fa-right-from-bracket mr-1" />Logout</span>
                    </div>
                </li>
            </ul>
            </nav>
            {/* /.navbar */}
        </div>
    )
}

export default NavbarAdmin

