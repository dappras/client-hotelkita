import React, { useEffect, useState } from "react";
import CardBooking from "../../component/cardBooking/cardBooking";
import Navbar from "../../component/navbar/navbar";
import NavbarBooking from "../../component/navbarBooking/navbarBooking";
import http from "../../utils/http";

const Booking = () => { 

    const [booking, setBooking] = useState()

    const initState = async () => {
        await http.post('/get-user-booking').then((res) => {
            if(res.data.success){
                setBooking(res.data.data)
                console.log(res.data.data);
            }else{
                console.log('failed to fetch data');
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])

    return (
        <div className="container">
            <Navbar active={'booking'} />

            <NavbarBooking active={'all'} />

            <div className="row mt-4 mb-5">
                <div className="col-lg-12">
                    {booking && booking.map((isi) => (
                        <CardBooking data={isi} />
                    ))}
                </div>
            </div>
        </div>
    )
}   

export default Booking