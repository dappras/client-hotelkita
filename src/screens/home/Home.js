import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import CardHotel from "../../component/cardHotel/cardHotel";
import Navbar from "../../component/navbar";
import http from "../../utils/http";
import './home.css'

const Home = () => {
    const cookies = new Cookies()
    
    const [latestHotel, setLatestHotel] = useState()

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
    }

    useEffect(() => {
        initState()
    }, [])

    return(
        <div className="container">
            <Navbar active={'home'} />

            <div className="row mt-3">
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
                                    <CardHotel data={isi} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home