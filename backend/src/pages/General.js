import React from 'react';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import { getGeneral } from '../Utils/Common';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import logo from '../assets/images/logo_2.png'
import { checkMenu } from '../Utils/Common';
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai'

function General() {
  const general = getGeneral();
    return (
      <>
        <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
          <DefaultLayout />
          <main>
            <div className="content-header">
              <Container fluid>
                <Row className="">
                  <Col sm={4}>
                    <h1 className="m-0">General</h1>
                    </Col>
                    <Col sm={2}>
                    </Col>
                    <Col sm={3}>
                    </Col>
                    <Col sm={3}>
                    <div className="date-time float-sm-right">
                        { moment().format('dddd, DD MMMM YYYY') }
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
                
            <div className="content">
              <Container fluid>
                <Row>
                  <Col md={6}>
                    <Card variant="primary">
                      <Card.Body className="box-profile">
                        <div className="text-center">
                          <img className="profile-user-img img-fluid img-circle" src={logo} />
                        </div>
                        <h3 className="profile-username text-center">{general.name}</h3>

                        <ul className="list-group list-group-unbordered mb-3">
                          <li className="list-group-item">
                            <b>className</b> <a className="float-right">{general.email}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Phone</b> <a className="float-right">{general.phone_number}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Mobilephone</b> <a className="float-right">{general.mobile_phone}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Address</b> <a className="float-right">{general.alamat}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Latitude</b> <a className="float-right">{general.latitude}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Longitude</b> <a className="float-right">{general.longitude}</a>
                          </li>
                          <li className="list-group-item">
                            <b></b> <Link to="/editgeneral" className="float-right"><Button variant="outline-primary"><RiLockPasswordFill /> Ubah Pengaturan</Button></Link>
                          </li>
                          
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                  
                  </Col>
                </Row>
              </Container>
            </div>
          </main>
        </div>
        <Footer />
      </>
    )
}
export default General
