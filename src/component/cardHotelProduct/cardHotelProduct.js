import React from "react";
import './cardHotelProduct.css'

const CardHotelProduct = ({data}) => {
    return(
        <div className="row align-items-center mt-4">
            <div className="col-lg-3">
                <img src={data.image[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} className='mb-2' alt="" />
            </div>
            <div className="col-lg-7">
                <div className="hotel-name mb-1">
                    {data.name}
                </div>
                <div className="hotel-address mb-3">
                    {data.address}
                </div>
                <div style={{ width: '70%' }} className='hotel-desc'>
                    {data.description.substring(0, 120)}....
                </div>
            </div>
            <div className="col-lg-2">
                <div className="d-flex justify-content-center hotel-price mt-2" style={{ color: '#FD8F3B' }}>
                    Rp. {data.price}
                </div>
            </div>
        </div>
    )
}

export default CardHotelProduct