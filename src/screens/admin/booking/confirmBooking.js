import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";
import Cookies from "universal-cookie";

const ConfirmBooking = () => {
    const {id} = useParams()
    const history =  useHistory()
    const cookies = new Cookies()

    const [dataProfile, setDataProfile] = useState()
    const [detailBooking, setDetailBooking] = useState()

    const initState = async () => {
        if (cookies.get('token') === undefined) {
            history.push('/login')   
        }

        await http.post('/get-profile').then((res) => {
            if (res.data.success === true) {
                setDataProfile(res.data.data)
            }else {
                console.log('failed fetch data');
            }
        }).catch(e => {
            console.log(e);
        })

        const bodyDetailBooking = {
            bookingId: id
        }

        await http.post('/get-detail-merchant-booking', bodyDetailBooking).then((res) => {
            if (res.data.success) {
                setDetailBooking(res.data.data)
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
            bookingId: detailBooking.booking._id
        }

        await http.post('/confirm-booking', body).then((res) => {
            if (res.data.success) {
                console.log("success");
                history.push('/dashboard/booking')
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
                        {detailBooking && (
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
                                            {detailBooking.hotel.name}
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Room
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailBooking.hotel.room} Kamar
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4" style={{ fontSize: 21, fontWeight: 500 }}>
                                    BOOKING
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-4" style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 16}}>
                                            Invoice
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailBooking.booking.invoice}
                                        </div>
                                    </div>

                                    <div className="col-lg-4" style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 16}}>
                                            Booking Date
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailBooking.booking.bookingDate}/{detailBooking.booking.bookingMonth}/{detailBooking.booking.bookingYear}
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Total Price
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            Rp. {detailBooking.booking.total}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4" style={{ fontSize: 21, fontWeight: 500 }}>
                                    Proof Payment
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-4" style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 16}}>
                                            Name Account Holder
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailBooking.proofPayment.name}
                                        </div>
                                    </div>

                                    <div className="col-lg-4" style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 16}}>
                                            Name Bank
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailBooking.proofPayment.nameBank}
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div style={{ fontSize: 16}}>
                                            Nomor Rekening
                                        </div>
                                        <div className="mt-2" style={{ fontSize: 14}}>
                                            {detailBooking.proofPayment.nomorRekening}
                                        </div>
                                    </div>
                                </div>
                                <img src={detailBooking.proofPayment.imageUrl} className="mt-3" style={{ height: '35vh' }} alt="" />

                                <div className="d-flex justify-content-end mt-4">
                                    <a href="/dashboard/booking">
                                        <div className="btn btn-secondary">Cancel</div>
                                    </a>
                                    {detailBooking.booking.status === 1 && (
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

export default ConfirmBooking