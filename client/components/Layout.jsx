/* File: Layout.jsx
   Student: Adewale Ibrahim
   StudentID: 301515732
   Date: 2025-09-15
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../src/assets/images/logo.jpg';
import './Layout.css';

export default function Layout() {
    return (
        <>
            <div className="layout-header">
                <img src={logo} alt="Logo" className="layout-logo" />
                <h1 className="layout-title">Adewale Ibrahim</h1>
            </div>
            <nav className="layout-nav">
                <NavLink to="/" end>Home</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/projects">Projects</NavLink> |
                <NavLink to="/services">Services</NavLink> |
                <NavLink to="/contact">Contact</NavLink>
            </nav>
            <hr />
        </>
    );
}
