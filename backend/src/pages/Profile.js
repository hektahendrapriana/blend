import React from 'react';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import { getUser } from '../Utils/Common';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";

function Profile() {
  const user = getUser();
    return (
      <>
        <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
          <DefaultLayout />
          <main>
            <div className="content-header">
              <Container fluid>
                <Row className="">
                  <Col sm={4}>
                    <h1 className="m-0">Profile</h1>
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
                          <img className="profile-user-img img-fluid img-circle" src={ user.avatar ? user.avatar : 'assets/img/user2-160x160.jpg' } />
                        </div>
                        <h3 className="profile-username text-center">{user.first_name} {user.middle_name} {user.last_name}</h3>
                        <p className="text-muted text-center">{user.role_id.name}</p>

                        <ul className="list-group list-group-unbordered mb-3">
                          <li className="list-group-item">
                            <b>Email</b> <a className="float-right">{user.email}</a>
                          </li>
                          <li className="list-group-item">
                            <b>NIK</b> <a className="float-right">{user.nik}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Gender</b> <a className="float-right">{user.gender}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Place of Birth</b> <a className="float-right">{user.place_of_birth}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Date of Birth</b> <a className="float-right">{moment(user.date_of_birth).format('DD/MM/YYYY')}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Mobilephone</b> <a className="float-right">{user.mobile_phone}</a>
                          </li>
                          <li className="list-group-item">
                            <b>Phone No</b> <a className="float-right">{user.phone_number}</a>
                          </li>
                          <li className="list-group-item">
                            <b></b> <Link to="/changepassword" className="float-right"><Button variant="outline-primary"><RiLockPasswordFill /> Change Password</Button></Link>
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
export default Profile
