import React, {useEffect, useState} from "react";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const Profile = () => {
    const history = useHistory()
    const cookies = new Cookies()

    const [dataProfile, setDataProfile] = useState()

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [nameBank, setNameBank] = useState()
    const [email, setEmail] = useState()
    const [noHp, setNoHp] = useState()
    const [nomorRekening, setNomorRekening] = useState()
    const [nameAccountBank, setNameAccountBank] = useState()
    const [imageExisting, setImageExisting] = useState()
    const [imageLogic, setImageLogic] = useState(true)

    const [formFull, setFormFull] = useState(false)

    const initState = async () => {
        if (cookies.get('token') === undefined) {
            history.push('/login')   
        }
        
        await http.post('/get-profile').then((res) => {
            if (res.data.success === true) {
                setName(res.data.data.name)
                setAddress(res.data.data.address)
                setEmail(res.data.data.email)
                setNameAccountBank(res.data.data.nameAccountBank)
                setNoHp(res.data.data.phoneNumber)
                setNameBank(res.data.data.nameBank)
                setNomorRekening(res.data.data.nomorRekening)
                setImageExisting(res.data.data.imageUrl)

                setDataProfile(res.data.data)
            }else {
                console.log('failed fetch data');
            }
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])

    const [base64, setBase64] = useState()
    const [imageFile, setImageFile] = useState()

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
        await setImageLogic(false)
        console.log(hasilFile);
    
    };

    const submitForm = async () => {
        if (name===undefined || address===undefined || nameBank === undefined || nomorRekening === undefined || nameAccountBank === undefined) {
            setFormFull(true)
            return
        }

        const body = {
            name: name,
            address: address,
            nameBank: nameBank,
            nomorRekening: nomorRekening,
            nameAccountBank: nameAccountBank
        }
        if (base64 !== undefined) {
            body.image = base64
        } else {
            body.image = ''
        }

        if (password !== undefined) {
            body.password = password
        }

        console.log(body);


        await http.post('/edit-profile', body).then(res => {
            if (res.data.success) {
                console.log('success');
                window.location.reload()
            } else {
                console.log('failed');
            }
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            <NavbarAdmin profile={dataProfile} />
            <SidebarAdmin profile={dataProfile} />
            
            

            <div className="content-wrapper row justify-content-center">
                {formFull && (
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Please fill the form!!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setFormFull(false)}></button>
                    </div>
                )}

                <div className="col-lg-6 p-4">
                    <h2>Profile</h2>

                    <div className="elevation-1 mt-5 p-4" style={{ backgroundColor: 'white', borderRadius: 12 }}>
                        {dataProfile && (
                            <div>
                                <div className="d-flex justify-content-center">
                                    {imageLogic && imageExisting === undefined && (
                                        <div style={{ height: '20vh' }}>
                                            <img src={require('./profilePicture.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1000 }} alt="" />
                                        </div>
                                    )}
                                    {imageLogic && imageExisting && (
                                        <div style={{ height: '20vh' }}>
                                            <img src={dataProfile.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1000 }} alt="" />
                                        </div>
                                    )}
                                    {imageLogic == false && imageFile && (
                                        <div style={{ height: '20vh' }}>
                                            <img src={URL.createObjectURL(imageFile)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='rounded-circle' alt="" />
                                        </div>
                                    )}
                                </div>
                                <div className="row justify-content-center mt-3">
                                    <div className="col-lg-3">
                                        <input type="file" accept=".png, .jpg, .jpeg" className="form-control-file" id="exampleFormControlFile1"  onChange={handleFileInputChange} required />
                                    </div>
                                </div>

                                <form className="mt-3">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" placeholder="Email" value={email} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" placeholder="Phone Number" value={noHp} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter Your New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div class="form-group">
                                        <label>Address</label>
                                        <textarea class="form-control" rows="2" placeholder="Enter Your Address" value={address} onChange={e => setAddress(e.target.value)} required ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Name Bank</label>
                                        <input type="text" className="form-control" placeholder="BCA" value={nameBank} onChange={(e) => setNameBank(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Name Account Bank</label>
                                        <input type="text" className="form-control" placeholder="Daffa Rasyid Naufan" value={nameAccountBank} onChange={(e) => setNameAccountBank(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nomor Rekening</label>
                                        <input type="text" className="form-control" placeholder="13211242" value={nomorRekening} onChange={(e) => setNomorRekening(e.target.value)} required />
                                    </div>

                                    <div className="d-flex justify-content-end mt-3">
                                        <a href="/dashboard/my-hotel">
                                            <div className="btn btn-secondary">Cancel</div>
                                        </a>
                                        <div className="btn btn-primary ml-3" onClick={submitForm}>
                                            Submit
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile