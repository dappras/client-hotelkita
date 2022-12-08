import React, {useEffect, useState} from "react";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";

const AddHotel = () => {
    const [dataProfile, setDataProfile] = useState()

    const initState = async () => {
        await http.post('/get-profile').then((res) => {
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
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
            </div>

        </div>
    )
}

export default AddHotel