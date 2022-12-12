import React, {useEffect, useState} from "react";

const NavbarBooking = ({active}) => {
    return (
        <ul className="nav nav-pills nav-fill mt-5">
            {active==='all' && (
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/booking/all">All</a>
                </li>
            )}
            {active!=='all' && (
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/booking/all">All</a>
                </li>
            )}
            {active==='onPay' && (
                <li className="nav-item">
                    <a className="nav-link active" href="/booking/on-pay">On Pay</a>
                </li>
            )}
            {active!=='onPay' && (
                <li className="nav-item">
                    <a className="nav-link" href="/booking/on-pay">On Pay</a>
                </li>
            )}
            {active==='onBook' && (
                <li className="nav-item">
                    <a className="nav-link active" href="/booking/on-book">On Book</a>
                </li>
            )}
            {active!=='onBook' && (
                <li className="nav-item">
                    <a className="nav-link" href="/booking/on-book">On Book</a>
                </li>
            )}
            {active==='history' && (
                <li className="nav-item">
                    <a className="nav-link active" href="/booking/history">History</a>
                </li>
            )}
            {active!=='history' && (
                <li className="nav-item">
                    <a className="nav-link" href="/booking/history">History</a>
                </li>
            )}
        </ul>
    )
}

export default NavbarBooking