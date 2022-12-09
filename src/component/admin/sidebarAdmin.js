import React, {useEffect, useState} from "react"
import Cookies from "universal-cookie";
import http from "../../utils/http";

const SidebarAdmin = ({profile}) => {
    return(
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ height: '100vh' }}>
                {/* Brand Logo */}
                <a href="/" className="brand-link d-flex justify-content-center" style={{ textDecoration: 'none' }}>
                    <img src={require('./logohotel.png')} alt="AdminLTE Logo" className="brand-image ml-0" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">HotelKita</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div style={{ width: 35, height:35 }}>
                        {profile && profile.imageUrl === undefined && <img src={require('./profilePicture.jpg')} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 100 }} alt="User Image" />}
                        {profile && profile.imageUrl && <img src={profile.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 100 }} alt="User Image" />}
                    </div>
                    <div className="info">
                    {profile && 
                        <div style={{ color: 'white' }}>{profile.name}</div>
                    }
                    </div>
                </div>
                {/* SidebarSearch Form */}
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                    <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                        <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw" />
                        </button>
                    </div>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library */}
                        <li className="nav-header">HOME</li>
                        <li className="nav-item">
                            <a href="/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-th" />
                                <p>
                                    Dashboard
                                </p>
                            </a>
                        </li>
                        <li className="nav-header mt-3">FEATURE</li>
                        {profile && profile.role === 0 && (
                            <li className="nav-item">
                                <a href="/dashboard/hotel" className="nav-link">
                                    <i className="nav-icon fas fa-building" />
                                    <p>
                                        Hotel
                                    </p>
                                </a>
                            </li>
                        )}
                        {profile && profile.role === 1 && (
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-building" />
                                <p>
                                    Hotel
                                    <i className="fas fa-angle-left right" />
                                </p>
                                </a>
                                <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="/dashboard/my-hotel" className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>My Hotel</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/dashboard/booking" className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>Booking</p>
                                    </a>
                                </li>
                                </ul>
                            </li>
                        )}
                        {profile && profile.role === 1 && (
                            <li className="nav-item">
                                <a href="/dashboard/profile" className="nav-link">
                                    <i className="nav-icon fas fa-user" />
                                    <p>
                                        Profile
                                    </p>
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    )
}

export default SidebarAdmin