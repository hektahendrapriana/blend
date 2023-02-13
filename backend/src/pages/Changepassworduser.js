import React, { useState, useEffect } from 'react';
import { checkMenu } from '../Utils/Common';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import Api from '../config/Api';
import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import { AiOutlineRollback } from "react-icons/ai";
import { useHistory, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from 'react-input-mask';
import { FiSearch } from "react-icons/fi";

function Changepassworduser() {
    const {id} = useParams();
    const history = useHistory();
    const [dataDetails, setDataDetails] = useState([]);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        getDetails()
    }, []);

    function getDetails(e) {
        Api().get(`users/${id}`)
        .then((response) => response)
        .then((data) => {
            console.log(data.data)
            setDataDetails(data.data);
        })
        .catch((err) => {
       });
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }
    
    const handleSubmit = (req) => {
        req.preventDefault();
        const form = req.currentTarget;
        if (form.checkValidity() === false) {
            req.preventDefault();
            req.stopPropagation();
        }
        setValidated(true);
        var data = new FormData(form);
        let formObject = Object.fromEntries(data.entries());
        Api().patch(`changepassword/${id}`, formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 200 ){
                history.push('/users');
            }
        })
        .catch((err) => {
        });
    };
    
    return (
        <>
            <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
                <DefaultLayout />
                {/* <div className={ getStyles().collapsed === true ? 'content-wrapper collapsed' : 'content-wrapper' }> */}
                <main>
                    <div className="content-header">
                        <Container fluid>
                            <Row className="">
                                <Col sm={4}>
                                <h1 className="m-0">Change Password</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('users') &&
                                        <Link to="/users"><Button variant="outline-primary" className="btn-upload"><AiOutlineRollback /> Back</Button></Link>
                                    }
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
                                <Col lg={12}>
                                    <Card className="content-list">
                                        <Card.Body>
                                            <Col md="12">
                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="4" controlId="validationCustom10">
                                                            <Form.Label>New Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="New Password"
                                                                name="newPassword"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationCustom11">
                                                            <Form.Label>Confirm New Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="Confirm New Password"
                                                                name="confirmNewPassword"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    {error && 
                                                        <Alert variant="danger">
                                                            {error}
                                                        </Alert>
                                                    }
                                                    
                                                    <Button type="submit">Save</Button>
                                                </Form>
                                            </Col>
                                            
                                        </Card.Body>
                                    </Card>
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
export default Changepassworduser