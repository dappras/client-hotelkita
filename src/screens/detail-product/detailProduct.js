import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/navbar";
import http from "../../utils/http";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
    const {id} = useParams()

    const [latestHotel, setLatestHotel] = useState()
    const [search, setSearch] = useState("")

    const initState = async () => {
        await http.post('/get-latest-hotel').then((res) => {
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
            <Navbar active={'product'} />

            <div className="row-lg-12">

            </div>
        </div>
    )
}

export default DetailProduct