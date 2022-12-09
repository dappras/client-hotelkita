import React, {useEffect, useState} from "react";
// import Cookies from "universal-cookie";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";
import { Link } from "react-router-dom";

const HotelConfirm = () => {
    const [dataProfile, setDataProfile] = useState()
    const [hotel, setHotel] = useState()

    const initState = async () => {
        await http.post('/get-profile').then((res) => {
            if (res.data.success === true) {
                setDataProfile(res.data.data)
            }
        }).catch(e => {
            console.log(e);
        })

        await http.post('/get-hotel').then((res) => {
            if (res.data.success === true) {
                console.log(res.data.data);
                setHotel(res.data.data)
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
                        <h1>Hotel</h1>
                        </div>
                    </div>
                    </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}
                {hotel && 
                    <section className="content">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title mt-1">
                                            
                                        </h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Hotel</th>
                                            <th>Price</th>
                                            <th>Room</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {hotel && hotel.map((item) => (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>Rp. {item.price}</td>
                                                <td>{item.room}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    {item.status === 0 && (
                                                        <span style={{ color: 'red' }}>Not Accepted</span>
                                                    )}
                                                    {item.status === 1 && (
                                                        <span style={{ color: 'green' }}>Accepted</span>
                                                    )}
                                                </td>
                                                <td>    
                                                    <Link to={'/dashboard/hotel/confirm-hotel/' + item._id}>
                                                        <i className="fas fa-eye bg-warning p-2 mr-2" style={{ borderRadius: 6 }} />
                                                    </Link>
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

export default HotelConfirm