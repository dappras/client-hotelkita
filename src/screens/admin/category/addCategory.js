import React, {useEffect, useState} from "react";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";
import {useHistory} from 'react-router-dom'

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const AddCategory = () => {
    const history =  useHistory()

    const [dataProfile, setDataProfile] = useState()

    const [name, setName] = useState()

    const [formFull, setFormFull] = useState(false)

    const initState = async () => {
        await http.post('/get-profile').then((res) => {
            if (res.data.success === true) {
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

    const handleFileInputChange = async e => {

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
        if (name===undefined || base64===undefined) {
            setFormFull(true)
            return
        }

        const body = {
            name: name,
            image: base64
        }

        await http.post('/add-category', body).then(res => {
            if (res.data.success) {
                console.log('success');
                history.push('/dashboard/category-city')
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
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper row justify-content-center">
                {formFull && (
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Please fill the form!!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setFormFull(false)}></button>
                    </div>
                )}
                <div className="col-lg-6 p-4">
                    <h2>Add Category</h2>

                    <div className="elevation-1 mt-5 p-4" style={{ backgroundColor: 'white', borderRadius: 12 }}>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Jakarta" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Image</label>
                                {imageFile && (
                                    <div className="row mb-3">
                                        <div className="col-4 mb-2">
                                            <img src={URL.createObjectURL(imageFile)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} alt="tes" />
                                        </div>
                                    </div>
                                )}
                                <input type="file" accept=".png, .jpg, .jpeg" multiple className="form-control-file" id="exampleFormControlFile1"  onChange={handleFileInputChange} required />
                            </div>

                            <div className="d-flex justify-content-end mt-3">
                                <a href="/dashboard/category-city">
                                    <div className="btn btn-secondary">Cancel</div>
                                </a>
                                <div className="btn btn-primary ml-3" onClick={submitForm}>
                                    Submit
                                </div>
                                {/* <button type="submit" className="btn btn-primary ml-3" onSubmit={submitForm}>Submit</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddCategory