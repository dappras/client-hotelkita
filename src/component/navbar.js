import React, {useEffect, useState} from "react";

const Navbar = ({active}) => {
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3">
                <a className="navbar-brand mr-auto" href="/">
                    <img src="./logoNavbar.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
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
                        <li className="nav-item px-2" style={{ backgroundColor: '#01BDE1', borderRadius: 24 }}>
                            <a className="nav-link" style={{ color: 'white' }} href="#">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar