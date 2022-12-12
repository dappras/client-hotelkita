import React from "react";
import { Link } from "react-router-dom";
import './cardBooking.css'

const CardBooking = ({data}) => {
    return(
        <div className="row align-items-center mt-4">
            <div className="col-lg-3" style={{ height: '20vh' }}>
                <img src={data.hotel.image[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} className='mb-2' alt="" />
            </div>
            <div className="col-lg-7">
                <div className="hotel-name mb-1">
                    {data.hotel.name}
                </div>
                <div className="hotel-address mb-3">
                    {data.hotel.address}
                </div>
                <div style={{ width: '70%' }} className='hotel-desc'>
                    {data.hotel.description.substring(0, 120)}....
                </div>
            </div>
            <div className="col-lg-2">
                <div className="row justify-content-center hotel-price mt-2">
                    {data.booking.bookingDate} - {data.booking.bookingMonth} - {data.booking.bookingYear}
                    {data.booking.status === 0 && (
                        <div className="d-flex justify-content-center mt-3">
                            <Link to={'/payment/' + data.booking._id}>
                                <div className="bg-primary px-4 py-2" style={{ borderRadius: 24, fontSize: 14 }}>
                                    Pay Now
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardBooking