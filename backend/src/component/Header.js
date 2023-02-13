import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStyles } from '../Utils/Common';

function Header() {
    
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i className="fas fa-bars"></i>
                    </Link>
                </li>
            </ul> */}
            
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments"></i>
                        <span className="badge badge-danger navbar-badge">0</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item dropdown-footer">No Messages</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell"></i>
                        <span className="badge badge-warning navbar-badge">0</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a href="#" className="dropdown-item dropdown-footer">No Notifications</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
export default Header;