import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import CardCategory from "../../component/cardCategory/cardCategory";
import CardHotel from "../../component/cardHotel/cardHotel";
import Footer from "../../component/footer/footer";
import Navbar from "../../component/navbar/navbar";
import http from "../../utils/http";
import './home.css'

const Home = () => {
    const cookies = new Cookies()
    
    const [latestHotel, setLatestHotel] = useState()
    const [category, setCategory] = useState()

    const fasilitas = [
        {
            name: 'Gym Center',
            image: './icon/gym.svg'
        },
        {
            name: 'Parking Area',
            image: './icon/parkir.svg'
        },
        {
            name: 'Breakfast',
            image: './icon/breakfast.svg'
        },
        {
            name: 'Cafe',
            image: './icon/cafe.svg'
        },
        {
            name: 'Free Wifi',
            image: './icon/wifi.svg'
        },
        {
            name: 'Swimming Pool',
            image: './icon/swimming.svg'
        },
        {
            name: 'Praying Room',
            image: './icon/praying.svg'
        },
        {
            name: 'Bathub',
            image: './icon/bathup.svg'
        },
    ]

    const initState = async () => {
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

        await http.post('/get-category').then((res) => {
            if (res.data.success) {
                setCategory(res.data.data)
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
            <Navbar active={'home'} />

            <div className="row mt-3 mb-5">
                <div className="col-lg-12">
                    <img src="./coverHome.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                </div>

                {/* rekomendasi */}
                <div className="col-lg-12 mt-5">
                    <div className="row justify-content-center mt-4 mb-2" style={{ fontSize: 22, fontWeight: 500 }}>
                        Rekomendasi untukmu
                    </div>
                    <div className="row justify-content-center" style={{ opacity: 0.6 }}>
                        Pilihan menarik yang mungkin kamu suka
                    </div>

                    {latestHotel && (
                        <div className="row mt-4">
                            {latestHotel.map((isi) => (
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <Link to={'/product/' + isi._id} style={{ textDecoration: 'none', color: 'black' }}>
                                        <CardHotel data={isi} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* fasilitas */}
                <div className="col-lg-12 mt-4">
                    <div className="row justify-content-center mt-4 mb-2" style={{ fontSize: 22, fontWeight: 500 }}>
                        Kamu bisa dapatkan ini di HotelKita
                    </div>
                    <div className="row justify-content-center" style={{ opacity: 0.6 }}>
                        Fasilitas pendukung yang terbaik untukmu
                    </div>

                    {fasilitas && (
                        <div className="row mt-4">
                            {fasilitas.map((isi) => (
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="card card-facility py-5">
                                        <div className="card-body">
                                            <div className="row justify-content-center mb-4">
                                                <img src={isi.image} style={{ height: '6vh' }} alt="" />
                                            </div>
                                            <div className="row justify-content-center">
                                                {isi.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* City/category */}
                <div className="col-lg-12 mt-4 mb-5">
                    <div className="row justify-content-center mt-4 mb-2" style={{ fontSize: 22, fontWeight: 500 }}>
                        Pilihan tempat populer untuk liburanmu
                    </div>
                    <div className="row justify-content-center" style={{ opacity: 0.6 }}>
                        Kunjungi hotel populer di kota kota terkenal 
                    </div>

                    {category && (
                        <div className="row mt-4">
                            {category.map((isi) => (
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <Link to={'/category/' + isi._id}>
                                        <CardCategory data={isi} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home