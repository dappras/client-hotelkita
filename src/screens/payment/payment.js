import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../component/navbar/navbar";
import http from "../../utils/http";

const Payment = () => {
    const {id} = useParams()
    const history = useHistory()

    const [name, setName] = useState()
    const [nameBank, setNameBank] = useState()
    const [nomorRekening, setNomorRekening] = useState()

    const [base64, setBase64] = useState()
    const [imageFile, setImageFile] = useState()

    const [formFull, setFormFull] = useState(false)

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
                        <div className="col-lg-8">
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
                                <div className="col-lg-7">
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

                                    <div className="btn mt-2" style={{ backgroundColor: '#01BDE1', color: 'white' }} onClick={submitForm}>
                                        Submit
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment