import React, { useEffect, useState } from "react";
import CardHotelProduct from "../../component/cardHotelProduct/cardHotelProduct";
import Navbar from "../../component/navbar/navbar";
import http from "../../utils/http";
import { Link, useParams } from "react-router-dom";
import Footer from "../../component/footer/footer";

const CategoryHotel = () => {
    const {id} = useParams()
    
    const [latestHotel, setLatestHotel] = useState()
    const [search, setSearch] = useState("")

    const initState = async () => {
        const body = {
            id: id
        }

        await http.post('/hotel-by-category', body).then((res) => {
            if (res.data.success) {
                setLatestHotel(res.data.data)
                console.log(res.data.data);
            } else {
                console.log('failed fetch data');
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])

    return(
        <div className="container">
            <Navbar active={'product'}/>

            <div className="row">
                <div className="col-lg-12 mt-3 px-5 py-4" style={{ backgroundColor: '#01BDE1'}}>
                    <div className="row">
                        <div className="form-group col-11">
                            <input type="Text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search your hotel..." />
                        </div>
                        <div className="col-1">
                            <div className="d-flex justify-content-center align-items-center form-control" style={{ backgroundColor: '#FD8F3B' }}>
                                <i className="fas fa-search" style={{ color: 'white' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* product */}
                {latestHotel && (
                    <div className="col-lg-12 my-5">
                        <div style={{ fontSize: 24, opacity: 0.7 }}>
                            {latestHotel.length} Hotel yang terdapat di HotelKita
                        </div>
                        <hr />

                        {latestHotel.filter((val) => {
                            if (search==="") {
                                return val
                            } else if(val.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                                return val
                            }
                        }).map((isi) => (
                            <Link to={'/product/' + isi._id} style={{ textDecoration: 'none', color: 'black' }}>
                                <CardHotelProduct data={isi} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default CategoryHotel