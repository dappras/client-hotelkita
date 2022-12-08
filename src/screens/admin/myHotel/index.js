import React, {useEffect, useState} from "react";
// import Cookies from "universal-cookie";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";

const MyHotel = () => {
    const [dataProfile, setDataProfile] = useState()
    const [dataMyHotel, setDataMyHotel] = useState()

    const initState = async () => {
        await http.post('/get-profile').then((res) => {
            if (res.data.success === true) {
                setDataProfile(res.data.data)
            }
        }).catch(e => {
            console.log(e);
        })

        await http.post('/get-my-hotel').then((res) => {
            if (res.data.success === true) {
                console.log(res.data.data);
                setDataMyHotel(res.data.data)
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
                {/* Content Header (Page header) */}
                <section className="content-header mb-3">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>My Hotel</h1>
                        </div>
                    </div>
                    </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}
                {dataMyHotel && 
                    <section className="content">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title mt-1">
                                        <a href="/dashboard/my-hotel/add-hotel">
                                            <i className="fas fa-plus bg-primary p-2" style={{ borderRadius: 6 }}></i>
                                        </a>
                                    </h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Room</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataMyHotel && dataMyHotel.map((item) => (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.room}</td>
                                            <td>{item.address}</td>
                                            <td>    
                                                <i className="fas fa-edit bg-warning p-2 mr-2" style={{ borderRadius: 6 }} />
                                                <i className="fas fa-trash bg-danger p-2" style={{ borderRadius: 6 }} />    
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </section>
                }
                {/* /.content */}
            </div>

        </div>
    )
}

export default MyHotel