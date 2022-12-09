import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import NavbarAdmin from "../../../component/admin/navbarAdmin";
import SidebarAdmin from "../../../component/admin/sidebarAdmin";
import http from "../../../utils/http";

const EditHotel = () => {
    const {id} = useParams()
    const history =  useHistory()

    const [dataProfile, setDataProfile] = useState()
    const [category, setCategory] = useState()
    const [detailHotel, setDetailHotel] = useState()

    const [name, setName] = useState()
    const [room, setRoom] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [address, setAddress] = useState()
    const [categoryId, setCategoryId] = useState()
    const [urlMaps, setUrlMaps] = useState()
    const [imageExisting, setImageExisting] = useState()
    const [imageRemoved, setImageRemoved] = useState()

    const [updateImage, setUpdateImage] = useState(true)
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

        await http.post('/get-category').then((res) => {
            if (res.data.success) {
                setCategory(res.data.data)
            } else {
                console.log('failed fetch data');
            }
        }).catch(e => {
            console.log(e);
        })

        const bodyDetailHotel = {
            id: id
        }

        await http.post('/get-detail-hotel', bodyDetailHotel).then((res) => {
            if (res.data.success) {
                setName(res.data.data.name)
                setRoom(res.data.data.room)
                setDescription(res.data.data.description)
                setPrice(res.data.data.price)
                setAddress(res.data.data.address)
                setCategoryId(res.data.data.categoryId)
                setUrlMaps(res.data.data.urlMaps)
                setImageExisting(res.data.data.image)
                setDetailHotel(res.data.data)
                setImageRemoved([])
                console.log(res.data.data);
            } else {
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

    const handleFileInputChange = e => {

        let hasilBase64 = []
        let hasilFile = []

        for (let i = 0; i < e.target.files.length; i++) {
            const item = e.target.files[i];
            getBase64(item)
              .then(result => {
                // console.log("File Is", item);
                const base64Split = result.split(',')
                hasilBase64.push(base64Split[1])
              })
              .catch(err => {
                console.log(err);
              });
            hasilFile.push(item)
        }

        setImageFile(hasilFile)
        setBase64(hasilBase64)
    };

    const imageRemove = async (id) => {
        let temp = detailHotel.image

        imageRemoved.push(id)
        
        for (let index = 0; index < temp.length; index++) {
            const item = temp[index];
            
            if (item.id === id) {
                temp.splice(index, 1)
            }
        }

        await setImageExisting(temp)
        
        await setUpdateImage(true)
    }

    const imageRemoveFile = async (isi) => {
        let temp = imageFile
        let temp2 = base64
        
        for (let index = 0; index < temp.length; index++) {
            const item = temp[index];
            
            if (item === isi) {
                temp.splice(index, 1)
                temp2.splice(index, 1)
            }
        }

        await setImageFile(temp)
        await setBase64(temp2)
        
        await setUpdateImage(true)
    }

    const submitForm = async () => {
        if (name===undefined || room===undefined || description===undefined || price===undefined || address===undefined || categoryId===undefined || urlMaps===undefined) {
            setFormFull(true)
            return
        }

        const body = {
            id: id,
            name: name,
            address: address,
            room: room,
            description: description,
            price: price,
            urlMaps: urlMaps,
            categoryId: categoryId,
            removedImage: imageRemoved
        }
        if (base64 !== undefined) {
            body.image = base64
        } else {
            body.image = []
        }

        console.log(body);


        await http.post('/edit-hotel', body).then(res => {
            if (res.data.success) {
                console.log('success');
                history.push('/dashboard/my-hotel')
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
                    <h2>Edit Hotel</h2>

                    <div className="elevation-1 mt-5 p-4" style={{ backgroundColor: 'white', borderRadius: 12 }}>
                        {detailHotel && (
                            <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Hotel Saya" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" rows="4" placeholder="Enter your hotel decription" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Room</label>
                                <input type="number" className="form-control" placeholder="40" value={room} onChange={(e) => setRoom(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input type="number" className="form-control" placeholder="600000" value={price} onChange={e => setPrice(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea class="form-control" rows="2" placeholder="Enter Your Address" value={address} onChange={e => setAddress(e.target.value)} required ></textarea>
                            </div>
                            {category && <label>City</label> }
                            {category && 
                                <select class="form-control mb-3" onChange={e => setCategoryId(e.target.value)} value={categoryId} required>
                                    <option hidden>Select your city</option>
                                    {category.map(isi => (
                                        <option value={isi._id}>{isi.name}</option>
                                    ))}
                                </select>
                            }
                            <div className="form-group">
                                <label>Url Maps</label>
                                <input type="text" className="form-control" placeholder="https://goo.gl/maps/HSZmVFQ8jhXo2y8M7" value={urlMaps} onChange={e => setUrlMaps(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Image</label>
                                {updateImage && (
                                    <div className="row mb-3" >
                                        {imageExisting.map(isi => (
                                            <div className="col-4 mb-2">
                                                <img src={isi.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} alt="tes" />
                                                <div style={{ position: 'absolute', top: 8, right:25 }} onClick={() => {
                                                    setUpdateImage(false)    
                                                    imageRemove(isi.id)
                                                }}>
                                                    <i className="fas fa-circle-xmark" style={{ color: 'red', fontSize: 20 }}></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {imageFile && (
                                    <div className="row mb-3">
                                        {imageFile.map((isi) => (
                                            <div className="col-4 mb-2">
                                                <img src={URL.createObjectURL(isi)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} alt="tes" />
                                                <div style={{ position: 'absolute', top: 8, right:25 }} onClick={() => {
                                                    setUpdateImage(false)    
                                                    imageRemoveFile(isi)
                                                }}>
                                                    <i className="fas fa-circle-xmark" style={{ color: 'red', fontSize: 20 }}></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <input type="file" accept=".png, .jpg, .jpeg" multiple className="form-control-file" id="exampleFormControlFile1"  onChange={handleFileInputChange} required />
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditHotel