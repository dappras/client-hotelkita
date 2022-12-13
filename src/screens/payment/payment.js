import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../../component/footer/footer";
import Navbar from "../../component/navbar/navbar";
import http from "../../utils/http";

const Payment = () => {
    const {id} = useParams()
    const history = useHistory()

    const [name, setName] = useState()
    const [nameBank, setNameBank] = useState()
    const [nomorRekening, setNomorRekening] = useState()

    const [bankHotel, setBankHotel] = useState()

    const [base64, setBase64] = useState()
    const [imageFile, setImageFile] = useState()

    const [formFull, setFormFull] = useState(false)

    const initState = async () => {
        await http.post('/get-user-booking').then(async (res) => {
            if(res.data.success) {
                let hotelId = ''
                await res.data.data.forEach(element => {
                    if(element.booking._id == id) {
                        hotelId = element.booking.hotelId
                    }
                });
                const body = {
                    hotelId: hotelId
                }
                console.log(body);
                console.log(res.data.data.booking);
                await http.post('/get-bank-hotel', body).then(resBank => {
                    if(resBank.data.success) {
                        setBankHotel(resBank.data.data)
                        console.log(resBank.data.data);
                    } else {
                        console.log('failed fetch data bank hotel!!!');
                    }
                }).catch(e => {
                    console.log(e);
                })
            } else {
                console.log('failed fetch data user booking!!');
            }
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])

    const getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            // console.log("Called", reader);
            baseURL = reader.result;
            // console.log(baseURL);
            resolve(baseURL);
          };
        });
    };

    const handleFileInputChange = async (e) => {

        let hasilBase64 = ''
        let hasilFile = ''
        const item = e.target.files[0];
        getBase64(item)
            .then(async (result) => {
                // console.log("File Is", item);
                const base64Split = result.split(',')
                hasilBase64  = base64Split[1]
                await setBase64(base64Split[1])
            })
            .catch(err => {
                console.log(err);
            });
        
        hasilFile = item
        
        setImageFile(hasilFile)
        console.log(hasilFile);
    
    };

    const submitForm = async () => {
        if (name===undefined || nameBank === undefined || nomorRekening === undefined || base64 === undefined) {
            setFormFull(true)
            return
        }

        const body = {
            name: name,
            nameBank: nameBank,
            nomorRekening: nomorRekening,
            idBooking: id,
            image: base64
        }

        await http.post('/add-bank', body).then((res) => {
            if (res.data.success) {
                history.push('/')
            } else {
                console.log('failed fetch data');
            }
        }).catch(e => {
            console.log(e);
        })

    }

    return (
        <div className="container">
            <Navbar active={'product'} />

            <div className="row">
                <div className="col-lg-12 row justify-content-center align-items-center" style={{ height: '89vh' }}>
                    <div className="row justify-content-center" style={{ backgroundColor: 'white' }}>
                        <div className="col-lg-12">
                            {formFull && (
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Please fill the form!!</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setFormFull(false)}></button>
                                </div>
                            )}
                            <div className="row py-5 elevation-1 justify-content-center align-items-center" style={{ borderRadius: 15, borderWidth: 1 }}>
                                <div className="col-lg-12 d-flex justify-content-center mb-5">
                                    <div style={{ fontSize: 22, fontWeight: 500 }}>
                                        Upload Proof Payment
                                    </div>
                                </div>
                                {bankHotel && (
                                    <div className="col-lg-4 d-flex">
                                        <div className="row">
                                            <div className="col-lg-12 mb-3 d-flex justify-content-center" style={{ fontSize: 20, fontWeight: 500 }}>
                                                Transfer to This Bank
                                            </div>
                                            <div className="col-lg-12 mb-2 mt-3 d-flex align-items-center" style={{ flexDirection: 'column' }}>
                                                <div className="mb-2" style={{ fontWeight: 500 }}>
                                                    Name Bank
                                                </div>
                                                <div>
                                                    {bankHotel.nameBank}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-2 d-flex align-items-center" style={{ flexDirection: 'column' }}>
                                                <div className="mb-2" style={{ fontWeight: 500 }}>
                                                    Name Account Bank
                                                </div>
                                                <div>
                                                    {bankHotel.nameAccountBank}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 d-flex align-items-center" style={{ flexDirection: 'column' }}>
                                                <div className="mb-2" style={{ fontWeight: 500 }}>
                                                    Nomor Rekening
                                                </div>
                                                <div>
                                                    {bankHotel.nomorRekening}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="col-lg-5">
                                    <div className="form-group">
                                        <label>Name Account Bank</label>
                                        <input type="text" className="form-control" placeholder="ex: Ujang Surajang" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Name Bank</label>
                                        <input type="text" className="form-control" placeholder="ex: BCA" value={nameBank} onChange={(e) => setNameBank(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nomor Rekening</label>
                                        <input type="text" className="form-control" placeholder="ex: 0213123421" value={nomorRekening} onChange={(e) => setNomorRekening(e.target.value)} required />
                                    </div>
                                    
                                    <a href="/booking/all">
                                        <div className="btn mt-2 mr-3 btn-secondary">
                                            Pay Later
                                        </div>
                                    </a>
                                    <div className="btn mt-2" style={{ backgroundColor: '#01BDE1', color: 'white' }} onClick={submitForm}>
                                        Pay Now
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="row">
                                        {imageFile && (
                                            <div className="col-lg-12">
                                                <div style={{ height: '20vh' }}>
                                                    <img src={URL.createObjectURL(imageFile)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-lg-12 mt-3">
                                            <input type="file" accept=".png, .jpg, .jpeg" className="form-control-file" id="exampleFormControlFile1"  onChange={handleFileInputChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Payment