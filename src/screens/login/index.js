import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import http from "../../utils/http";
import './login.css';
import {useHistory} from 'react-router-dom'

const Login = () => {
    const cookies = new Cookies()
    const history = useHistory()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [formFull, setFormFull] = useState(false)

    const initState = async () => {
        if (cookies.get('token') !== undefined) {
            history.push('/dashboard')   
        }
    }

    useEffect(() => {
        initState()
    }, [])

    const submitForm = async () => {
        if (email === undefined || password === undefined) {
            setFormFull(true)
            return
        }

        const body = {
            'email': email,
            'password': password
        }

        await http.post('/login', body).then(async (res) => {
            if (res.data.success) {
                await cookies.set("token", res.data.token, {path: '/'})
                
                await setTimeout(() => {
                    window.location.reload()
                }, 2000)

            } else {
                console.log('failed fetching data');
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    return(
        <div className="row w-100 g-0" style={{ height: '100vh', backgroundColor: '#F5F5F5' }}>
            <div className="col-lg-6">
                <div>
                </div>
                <div className="row justify-content-center align-items-end h-100" >
                    <div className="d-flex align-items-center mt-5" style={{ flexDirection: 'column' }}>
                        <img src="./logoLogin.svg" style={{ width: '7%', objectFit: 'cover' }} alt="" />
                        <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="mt-4" style={{ fontSize: 32, fontWeight: 500 }}>HotelKita</div>
                        </a>
                    </div>
                    <div className="col-lg-7">
                        <img src="./coverLogin.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 elevation-2 bg-light p-5 container-login-register">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-lg-8">
                            {formFull && (
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Please fill the form!!</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setFormFull(false)}></button>
                                </div>
                            )}
                            <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 24}}>Login</div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="exampleInputEmail1" value={email}  onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="exampleInputPassword1" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>

                            <div className="d-flex justify-content-center mt-5">
                                <div style={{ backgroundColor: '#01BDE1', display: 'inline-block', borderRadius: 50, paddingLeft: 80, paddingRight: 80, color: 'white', paddingTop: 12, paddingBottom: 12 }} onClick={submitForm}>
                                    SIGN IN
                                </div>
                            </div>

                            <div className="d-flex justify-content-center mt-5">
                                Don't have an account? <span className="ml-2"><a href="/signup" style={{ color: '#054574', textDecoration: 'none' }}>Sign Up</a></span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login