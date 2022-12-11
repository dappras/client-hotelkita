import React from "react";
import './cardHotel.css'

const CardHotel = ({data}) => {
    return(
        <div className="card">
            <img className="card-img-top" src={data.image[0]} alt="Card image cap" />
            <div className="card-body">
                <div className="card-title">{data.name}</div>
                <div className="card-text">{data.address}</div>
                <div className="card-price mt-2">Rp. {data.price}</div>
            </div>
        </div>
    )
}

export default CardHotel