import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/navbar";
import http from "../../utils/http";
import { Link, useHistory, useParams } from "react-router-dom";
import './detailProduct.css'
import CardHotel from "../../component/cardHotel/cardHotel";
import Cookies from "universal-cookie";
import Footer from "../../component/footer/footer";

const DetailProduct = () => {
    const {id} = useParams()
    const cookies = new Cookies()
    const history = useHistory()

    const [detailHotel, setDetailHotel] = useState()
    const [availableDate, setAvailableDate] = useState()
    const [latestHotel, setLatestHotel] = useState()
    const [selectDate, setSelectDate] = useState()
    const [hasLoginUser, setHasLoginUser] = useState(false)

    const fasilitas = [
        {
            name: 'Gym Center',
            image: '../../images/gym.png'
        },
        {
            name: 'Parking Area',
            image: '../../images/parkir.png'
        },
        {
            name: 'Breakfast',
            image: '../../images/breakfast.png'
        },
        {
            name: 'Cafe',
            image: '../../images/cafe.png'
        },
        {
            name: 'Free Wifi',
            image: '../../images/wifi.png'
        },
        {
            name: 'Swimming Pool',
            image: '../../images/swimming.png'
        },
        {
            name: 'Praying Room',
            image: '../../images/praying.png'
        },
        {
            name: 'Bathub',
            image: '../../images/bathup.png'
        },
    ]

    const initState = async () => {
        if (cookies.get('token') !== undefined) {
            setHasLoginUser(true)   
        }

        const body = {
            id: id
        }

        await http.post('/get-detail-hotel', body).then((res) => {
            if (res.data.success) {
                setDetailHotel(res.data.data)
                console.log(res.data.data);
            } else {
                console.log('failed fetch data');
            }
        }).catch((e) => {
            console.log(e);
        })

        await http.post('/get-available-date', body).then((res) => {
            if (res.data.success) {
                setAvailableDate(res.data.data)
                console.log(res.data.data);
            } else {
                console.log('failed fetch data');
            }
        }).catch((e) => {
            console.log(e);
        })

        await http.post('/get-latest-hotel').then((res) => {
            if (res.data.success) {
                if(res.data.data.length > 4){
                    let hasil = []
                    for (let i = 0; i < 4; i++) {
                        const item = res.data.data[i];
                        hasil.push(item)
                    }
                    setLatestHotel(hasil)
                } else {
                    setLatestHotel(res.data.data)
                }
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

    const handleBook = async () => {
        const hasil = {}
        availableDate.forEach(item => {
            if (item.date==selectDate) {
                hasil.bookingDate = item.date
                hasil.bookingMonth = item.month
                hasil.bookingYear = item.year
                hasil.total = detailHotel.price;
                hasil.hotelId = id
            }
        });

        console.log(hasil);

        await http.post('/booking', hasil).then((res) => {
            if(res.data.success) {
                history.push('/payment/' + res.data.data._id)
            } else {
                console.log('failed fetching data');
            }
        }).then((e) => {
            console.log(e);
        })
    }

    return(
        <div className="container">
            <Navbar active={'product'} />

            {detailHotel && (
                <div className="col-lg-12 mt-3 mb-4">
                    <div className="row">
                        <div className="col-10">
                            <div className="name-detail mb-3">
                                {detailHotel.name}
                            </div>
                            <div className="address-detail">
                                <i className="fas fa-location-dot mr-2" />{detailHotel.address}
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="d-flex justify-content-end">
                                {hasLoginUser && (
                                    <button type="button" className="btn px-4 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#01BDE1', color: 'white' }}>
                                        Book Now
                                    </button>
                                )}
                                {!hasLoginUser && (
                                    <button type="button" className="btn px-4 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ backgroundColor: '#01BDE1', color: 'white' }}>
                                        Book Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row-lg-12 mb-4">
                {detailHotel && (
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {detailHotel.image.length > 0 && detailHotel.image.map((isi, index) => {
                                if (index === 0 ) {
                                    return (
                                        <li data-target="#carouselExampleIndicators" data-slide-to={index} className="active" />
                                    )
                                }
                                return (
                                    <li data-target="#carouselExampleIndicators" data-slide-to={index} />
                                )
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {detailHotel.image.length > 0 && detailHotel.image.map((isi, index) => {
                                if (index === 0) {
                                    return (
                                        <div className="carousel-item active" style={{ height: '45vh', borderRadius: 24 }}>
                                            <img className="d-block" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }}  src={isi.imageUrl} alt="First slide" />
                                        </div>
                                    )
                                } 
                                return (
                                    <div className="carousel-item" style={{ height: '45vh', borderRadius: 24 }}>
                                        <img className="d-block" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} src={isi.imageUrl} alt="Second slide" />
                                    </div>
                                )
                            })}
                        </div>
                        <button class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </button>
                    </div>
                )}
            </div>

            {detailHotel && (
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-8">
                            <div className="hotel-name mb-2">{detailHotel.name}</div>
                            <div className="hotel-desc">{detailHotel.description}</div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <div className="">
                                <div className="hotel-price1 d-flex justify-content-end">Mulai dari</div>
                                <div className="hotel-price2 d-flex justify-content-end" style={{ color: '#FD8F3B' }}>Rp. {detailHotel.price}</div>
                                <div className="hotel-price1 d-flex justify-content-end">per malam</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-4">
                <hr />
            </div>

            {fasilitas && (
                <div className="col-lg-12">
                    <div className="hotel-name mb-4">Fasilitas</div>
                    
                    <div className="row px-4 align-items-center">
                        <div className="col-lg-3 mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/gym.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Gym Center</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/parkir.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Parking Area</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/breakfast.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Breakfast</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/cafe.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Cafe</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/wifi.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Free Wifi</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/swimming.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Swimming Pool</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/praying.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Praying Room</div>
                            </div>
                        </div>
                        <div className="col-lg-3  mb-3">
                            <div className="d-flex align-items-center">
                                <img src={require('../../images/bathup.png')} style={{ height: 40 }} fill='black' alt="" />
                                <div className="ml-3">Bathub</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-4">
                <hr />
            </div>

            {detailHotel && (
                <div className="col-lg-12">
                <div className="hotel-name mb-4">Lokasi</div>
                
                <div className="row pl-4">
                    <div className="col-lg-5">
                        <div className="address-detail mb-3">
                            <i className="fas fa-location-dot mr-2" />{detailHotel.address}
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <img src={require('../../images/maps.png')} style={{ width: '100%', height:'100%', objectFit: 'cover' }} alt="" />
                        <div style={{ position: 'absolute',  top: 0, height: '100%', backgroundColor: 'black', opacity: '0.3', borderRadius: 24}} className='d-flex justify-content-center align-items-center container-location'>
                            <a href={detailHotel.urlMaps} style={{ textDecoration: 'none' }}>
                                <div style={{ color: 'white', borderColor: 'white', borderRadius: 24, borderStyle: 'solid', borderWidth: 1 }} className='px-4 py-2'>
                                    Show Location
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            )}

            <div className="py-4">
                <hr />
            </div>

            {latestHotel && (
                <div className="col-lg-12 mb-5">
                    <div className="mt-3 mb-2" style={{ fontSize: 22, fontWeight: 500 }}>
                        Hotel Serupa
                    </div>

                    {latestHotel && (
                        <div className="row mt-4">
                            {latestHotel.map((isi) => (
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <a href={'/product/' + isi._id} style={{ textDecoration: 'none', color: 'black' }}>
                                        <CardHotel data={isi} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Choose Available Date</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row justify-content-center">
                                    {availableDate && availableDate.map((isi, index) => (
                                        <div className="col-lg-2 mr-5">
                                            <div className="btn-group" role="group" style={{ overflow:'auto' }}>
                                                <input type="radio" className="btn-check" name="option" id={`option-${index}`} defaultValue={isi.date} onChange={(e) => setSelectDate(e.target.value)} />
                                                <label className="btn btn-outline-primary" style={{border: 'none'}} htmlFor={`option-${index}`} >
                                                    <div className="tanggal">{`${isi.date}/${isi.month}/${isi.year}`}</div>
                                                    <div className="room">{isi.availableRoom} Room</div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn" style={{ backgroundColor: '#01BDE1' }} data-bs-dismiss="modal" onClick={handleBook}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Modal */}
                <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title">Alert</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h4>You have to login first!!!!</h4>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default DetailProduct