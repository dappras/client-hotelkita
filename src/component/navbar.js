import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useHistory} from 'react-router-dom'
import http from "../utils/http";
import { Link } from "react-router-dom";
import './navbar.css'

const Navbar = ({active}) => {
    const cookies = new Cookies()
    const history = useHistory()
    
    const [hasLogin, setHasLogin] = useState(false)
    const [dataProfile, setDataProfile] = useState()

    const initState = async () => {
        if (cookies.get('token') !== undefined) {
            setHasLogin(true)   
        }

        await http.post('/get-profile').then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
                setDataProfile(res.data.data)
            }
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        initState()
    }, [])


    const logout = async () => {
        await cookies.remove('token', {path: '/'})

        if (active === 'home') {
            window.location.reload()
        } else {
            history.push('/')
        }

    }

    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3 align-self-center">
                <a className="navbar-brand mr-auto" href="/">
                    <img src="./logoNavbar.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto d-flex align-items-center justify-content-center">
                        {active==='home' && 
                            <li className="nav-item active mr-4">
                                <a className="nav-link" href="/">
                                    Home <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        }
                        {active!=='home' && 
                            <li className="nav-item mr-4">
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </li>
                        }
                        {active==='booking' && 
                            <li className="nav-item active mr-4">
                                <a className="nav-link" href="/">
                                    Booking <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        }
                        {active!=='booking' && 
                            <li className="nav-item mr-4">
                                <a className="nav-link" href="/">
                                    Booking
                                </a>
                            </li>
                        }
                        {active==='product' && 
                            <li className="nav-item active mr-4">
                                <a className="nav-link" href="/">
                                    Product <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        }
                        {active!=='product' && 
                            <li className="nav-item mr-4">
                                <a className="nav-link" href="/">
                                    Product
                                </a>
                            </li>
                        }
                        {active==='about-us' && 
                            <li className="nav-item active mr-4">
                                <a className="nav-link" href="/">
                                    About Us <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        }
                        {active!=='about-us' && 
                            <li className="nav-item mr-4">
                                <a className="nav-link" href="/">
                                    About Us
                                </a>
                            </li>
                        }
                        {active==='contact' && 
                            <li className="nav-item active mr-4">
                                <a className="nav-link" href="/">
                                    Contact <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        }
                        {active!=='contact' && 
                            <li className="nav-item mr-4">
                                <a className="nav-link" href="/">
                                    Contact
                                </a>
                            </li>
                        }
                        {hasLogin === false && (
                            <li className="nav-item px-2 login-button" style={{ backgroundColor: '#01BDE1', borderRadius: 24 }}>
                                <a className="nav-link" style={{ color: 'white' }} href="/login">Login</a>
                            </li>
                        )}
                        {hasLogin && (
                             <li className="nav-item dropdown mt-0 login-button-desktop">
                                <a className="nav-link" data-toggle="dropdown" href="#">
                                    <div style={{ width: 50, height:50 }}>
                                        {dataProfile && dataProfile.imageUrl === undefined && <img src='./profilePicture.jpg' className="nav-link" style={{ borderRadius: 100, width: '100%', height: '100%', objectFit: 'cover' }} data-toogle="drodpdown" alt="User Image" />}
                                        {dataProfile && dataProfile.imageUrl && <img src={ dataProfile.imageUrl } className="nav-link" style={{ borderRadius: 100, width: '100%', height: '100%', objectFit: 'cover' }} data-toogle="drodpdown" alt="User Image" />}
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                    <span className="dropdown-item dropdown-header">
                                        <a href="/dashboard" className="nav-link">
                                            <i className="fas fa-th mr-2" />
                                            Dashboard
                                        </a>
                                    </span>
                                    <span className="dropdown-item dropdown-header pl-4" onClick={logout}><i className="fas fa-right-from-bracket mr-2" />
                                        Logout
                                    </span>
                                </div>
                            </li>
                        )}
                        {hasLogin && (
                            <li className="nav-item mr-4 login-mobile-button">
                                <a className="nav-link" href="/dashboard">
                                    Dashboard
                                </a>
                            </li>
                        )}
                        {hasLogin && (
                            <li className="nav-item mr-4 login-mobile-button">
                                <div className="nav-link" onClick={logout}>
                                    Logout
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar