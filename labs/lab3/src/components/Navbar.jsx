import React from 'react'
import { NavLink } from "react-router-dom";


function Navbar() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/compose-salad">Compose Salad</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/view-order">View Order</NavLink>
            </li>
        </ul>
    );
}

export default Navbar
