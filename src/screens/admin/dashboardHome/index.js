import React, {useEffect, useState} from "react";
// import Cookies from "universal-cookie";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const Dashboard = () => {
    const [dataProfile, setDataProfile] = useState()
    const history = useHistory()
    const cookies = new Cookies()

    const initState = async () => {
        if (cookies.get('token') === undefined) {
            history.push('/login')   
        }

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
            <NavbarAdmin profile={dataProfile} />
            <SidebarAdmin profile={dataProfile} />
            <div className="container">
                <h1 className="mt-5">Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard