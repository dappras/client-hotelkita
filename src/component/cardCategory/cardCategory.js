import React from "react";
import './cardCategory.css'

const CardCategory = ({data}) => {
    return(
        <div className="card card-category">
            <img className="card-img-top" src={data.imageUrl} alt="Card image cap" />
            <div className="card-body-category" style={{ position: 'absolute', bottom: 12, left: 24 }}>
                <div className="card-title" style={{ color: 'white' }}>{data.name}</div>
                {data.hotelId.length > 0 && (
                    <div className="card-text" style={{ color: 'white' }} >{data.hotelId.length} Hotel</div>
                )}
                {data.hotelId.length <= 0 && (
                    <div className="card-text" style={{ color: 'white' }} >0 Hotels</div>
                )}
            </div>
        </div>
    )
}

export default CardCategory