import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Api from '../config/Api';
import { setUserSession, getGeneral, getLatitude, getLongitude, removeUserSession, getApplicationSetting, getDistance, getLocation } from '../Utils/Common';
import { useHistory, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import { RiLockPasswordFill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import logo from '../assets/images/logo_2.png'

function Reset() {
    const history = useHistory();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [general, setGeneral] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    useEffect(() => {
        getLocation()
        getApplicationSetting()
        setGeneral(getGeneral())
    }, []);
    

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleReset = async (req) => {
        setError(null);
        setLoading(true);

        req.preventDefault();
        const form = req.currentTarget;
        if (form.checkValidity() === false) {
            req.preventDefault();
            req.stopPropagation();
        }
        setValidated(true);
        var data = new FormData(form);
        let formObject = Object.fromEntries(data.entries());
        if( isValidEmail(formObject.username) )
        {
            formObject.email = formObject.username;
            formObject.username = '';
        }
        else{
            if( !isNaN(+formObject.username) )
            {
                formObject.nik = formObject.username;
                formObject.username = '';
            }
            else{
                formObject.user_name = formObject.username;
                formObject.username = '';
            }
        }
        
        let distance = getDistance(getGeneral().latitude, getLatitude(), getGeneral().longitude, getLongitude());
        console.log(distance)
        // console.log(formObject)
        
        await Api().post('login', formObject)
        .then((resp) => resp)
        .then((response) => {
            if( response.status === 200 ){
                if(response.data.user.allow_remote === true || response.data.user.role_id.role === 'su')
                {
                    setLoading(false);
                    setUserSession(response.data.token, response.data.user);
                    history.push('/');
                }
                else{
                    
                    if( getGeneral().radius < distance )
                    {
                        setLoading(false);
                        removeUserSession()
                        setError("Anda tidak boleh menggunakan aplikasi ini di luar dari wilayah yang telah di tentukan.");
                    }
                    else{
                        setLoading(false);
                        setUserSession(response.data.token, response.data.user);
                        history.push('/');
                    }
                }
                
            }
            else{
                setLoading(false);
                setError("NIK/Email/Username not found or Password wrong");
            }
        })
        .catch((err) => {
            setLoading(false);
        });
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className="card-outline card-primary">
                                <Card.Header className="text-center">
                                    <img src={logo} alt="Logo" className="brand-image img-circle elevation-3 logo-login" />
                                    <b className="title-login">Meditech</b>+
                                </Card.Header>
                                
                                <Card.Body>
                                    <p className="login-box-msg">Reset Password</p>
                                    <Form noValidate validated={validated} onSubmit={handleReset}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom1">
                                                {/* <Form.Label>New Password</Form.Label> */}
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="New Password"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        name="new_password"
                                                        onChange={handleChange}
                                                    />
                                                    <InputGroup.Text id="inputGroupPrepend"><RiLockPasswordFill /></InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom1">
                                                {/* <Form.Label>New Password</Form.Label> */}
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Confirm New Password"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        name="confirm_new_password"
                                                        onChange={handleChange}
                                                    />
                                                    <InputGroup.Text id="inputGroupPrepend"><RiLockPasswordFill /></InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>
                                        {error && 
                                            <Alert variant="danger">
                                                {error}
                                            </Alert>
                                        }
                                        
                                        <Button type="submit">Submit</Button>
                                    </Form>
                                    <br />
                                    <p className="mb-1">
                                        <a href="/login">Login</a>
                                    </p>
                                    <p className="mb-0">
                                        <a href="/register" className="text-center">Register</a>
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Reset;