import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStyles } from '../Utils/Common';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { CgMenuRight } from "react-icons/cg";
import Button from 'react-bootstrap/Button';


function Footer() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpenRightMenu = () => setShow(true);
    return (
        <>
            {/* <Button variant="outline-primary" className="right-menu" onClick={handleOpenRightMenu}><CgMenuRight /></Button> */}
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    
                </Offcanvas.Body>
            </Offcanvas>
            {/* <footer className="main-footer">
                <strong>Copyright &copy; 2022 <a href="https://meditechindo.com" target="_blank">Meditech+</a></strong> &nbsp; - &nbsp; All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 5.0
                </div>
            </footer> */}

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Footer;