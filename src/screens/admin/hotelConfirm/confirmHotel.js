import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";

const ConfirmHotel = () => {
    const {id} = useParams()
    const history =  useHistory()

    const [dataProfile, setDataProfile] = useState()
    const [detailHotel, setDetailHotel] = useState()

    const initState = async () => {
        await http.post('/get-profile').then((res) => {
            if (res.data.success === true) {
                setDataProfile(res.data.data)
            }else {
                console.log('failed fetch data');
            }
        }).catch(e => {
            console.log(e);
        })

        const bodyDetailHotel = {
            id: id
        }

        await http.post('/get-detail-hotel', bodyDetailHotel).then((res) => {
            if (res.data.success) {
                setDetailHotel(res.data.data)
                console.log(res.data.data);
            } else {
                console.log('failed fetch data');
            }
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])

    const submitForm = async () => {
        const body = {
            hotelId: detailHotel._id
        }

        await http.post('/confirm-hotel', body).then((res) => {
            if (res.data.success) {
                console.log("success");
                history.push('/dashboard/hotel')
            } else {
                console.log('failed fetch data');
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div>
            <NavbarAdmin profile={dataProfile} />
            <SidebarAdmin profile={dataProfile} />


            <div className="content-wrapper row justify-content-center">
                <div className="col-lg-7 p-4">
                    <h2>Detail Booking</h2>

                    <div className="elevation-1 mt-5 p-4" style={{ backgroundColor: 'white', borderRadius: 12 }}>
                        {detailHotel && (
                            <div>
                                <div style={{ fontSize: 21, fontWeight: 500 }}>
                                    HOTEL
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-4" style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 16}}>
                                            Name
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailHotel.name}
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Room
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailHotel.room} Kamar
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Address
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailHotel.address}
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Price
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailHotel.price}/Night
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Description
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailHotel.description}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row mt-3">
                                    {detailHotel.image.map((isi) => (
                                        <div className="col-4 mt-2">
                                            <img src={ isi.imageUrl } alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-end mt-4">
                                    <a href="/dashboard/hotel">
                                        <div className="btn btn-secondary">Cancel</div>
                                    </a>
                                    {detailHotel.status === 0 && (
                                        <div className="btn btn-primary ml-3" onClick={submitForm}>
                                            Submit
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmHotel