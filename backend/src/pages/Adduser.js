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
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from 'react-input-mask';
import { FiSearch } from "react-icons/fi";

function Adduser() {
    const history = useHistory();
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [errorForm, setErrorForm] = useState([]);
    const [validated, setValidated] = useState(false);

    const newPin = generate(6);
    const today = new Date();
    
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        user_name: '',
        address: '',
        email: '',
        gender: '',
        mobile_phone: '',
        phone_number: '',
        role_id: '',
        avatar: '',
        date_of_birth: '',
        place_of_birth: ''
    });

    useEffect(() => {
        getRoles();
    }, []);

    function getRoles() {
        Api().get('roles?limit=100&sort=name&order=1')
        .then((response) => response)
        .then((data) => {
            setRoles(data.data.docs);
        })
        .catch((err) => {
       });
    }
    
    const formatMobilePhone = (mobile_no) => {
        let mobile = mobile_no;
        let firstNo = String(mobile.substring(0, 1));
        if( firstNo === '0' )
        {
            mobile = '+62' + mobile.slice(1);
        }
        let secondNo = String(mobile.substring(0, 2));
        if( secondNo === '62' )
        {
            mobile = '+62' + mobile.slice(2);
        }
        mobile = mobile.replace(' ', '');
        mobile = mobile.replace('+62', '');
        return mobile
    }

    const formatPhone = (phone_no) => {
        let phone = phone_no;
        phone = phone.replace(' ', '');
        phone = phone.replace('+62', '0');
        return phone
    }

    const formatPhonetoSave = (phone_no) => {
        let phone = phone_no;
        let firstNo = String(phone.substring(0, 1));
        if( firstNo === '0' )
        {
            phone = '+62' + phone.slice(1);
        }
        let secondNo = String(phone.substring(0, 2));
        if( secondNo === '62' )
        {
            phone = '+62' + phone_no.slice(2);
        }

        let thirdNo = String(phone.substring(0, 3));
        if( secondNo === '062' )
        {
            phone = '+62' + phone_no.slice(3);
        }
        return phone
    }
    

    function generate(n) {
        var add = 1, max = 12 - add;  
        
        if ( n > max ) {
                return generate(max) + generate(n - max);
        }
        
        max        = Math.pow(10, n+add);
        var min    = max/10;
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;
        
        return ("" + number).substring(add); 
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleChangeDatePicker(e) {
        setFormData({...formData, ["date_of_birth"]: moment(e).format('YYYY-MM-DD')})
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
        const [day, month, year] =  formObject.date_of_birth.split('-')
        formObject.date_of_birth = `${day}-${month}-${year}`
        formObject.mobile_phone = formatMobilePhone(formObject.mobile_phone);
        formObject.mobile_phone = '+62' + formObject.mobile_phone;
        formObject.phone_number = formatPhonetoSave(formObject.phone_number);
        formObject.allow_remote = false;

        Api().post('users', formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 201 || data.status === 200 ){
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
                                <h1 className="m-0">Add User</h1>
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
                                                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="First Name"
                                                                name="first_name"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                            <Form.Label>Middle Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Middle Name"
                                                                name="middle_name"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Last Name"
                                                                name="last_name"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                                            <Form.Label>Username</Form.Label>
                                                            <InputGroup hasValidation>
                                                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Username"
                                                                    aria-describedby="inputGroupPrepend"
                                                                    required
                                                                    name="user_name"
                                                                    onChange={handleChange}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationCustom08">
                                                            <Form.Label>Role</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                name="role_id"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Role</option>
                                                                {
                                                                    roles.map((item, i) => (
                                                                        <option key={i} value={item._id}>{item.name} - {item.role}</option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationEmail">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Email"
                                                                name="email"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                                                            <Form.Label>Gender</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                name="gender"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationCustom06">
                                                            <Form.Label>Mobilephone</Form.Label>
                                                            <InputGroup hasValidation>
                                                                <InputGroup.Text id="inputGroupPrepend">+62</InputGroup.Text>
                                                                <Form.Control
                                                                    type="number"
                                                                    placeholder="Contoh : 812xxxxxx"
                                                                    name="mobile_phone"
                                                                    onChange={handleChange}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationCustom07">
                                                            <Form.Label>Phone No</Form.Label>

                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Contoh : 021xxxxxx"
                                                                name="phone_number"
                                                                onChange={handleChange}
                                                            />
                                                            {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="4" controlId="validationCustom09">
                                                            <Form.Label>Place of Birth</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Place of Birth"
                                                                name="place_of_birth"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Date of Birth</Form.Label>
                                                            <InputMask
                                                                name="date_of_birth"
                                                                mask="99-99-9999"
                                                                className="form-control"
                                                                placeholder="DD-MM-YYYY"
                                                                onChange={handleChange}>
                                                            </InputMask>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom14">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                placeholder="Address"
                                                                name="address"
                                                                onChange={handleChange}
                                                                style={{ height: '100px' }}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="4" controlId="validationCustom10">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="password"
                                                                placeholder="Password"
                                                                name="password"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4" controlId="validationEmail">
                                                            <Form.Label>Confirm Password</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                name="confirm_password"
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
export default Adduser