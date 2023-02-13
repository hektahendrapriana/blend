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
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import logo from '../assets/images/logo_2.png'

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [general, setGeneral] = useState([]);
    const history = useHistory();
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

    const handleLogin = async (req) => {
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
            formObject.nik = '';
        }
        else{
            if( !isNaN(+formObject.username) )
            {
                formObject.nik = formObject.username;
                formObject.email = '';
                formObject.username = '';
            }
            else{
                formObject.user_name = formObject.username;
                formObject.email = '';
                formObject.username = '';
            }
        }
        
        await Api().post('login', formObject)
        .then((resp) => resp)
        .then((response) => {
            if( response.status === 200 ){
                setLoading(false);
                setUserSession(response.data.token, response.data.user);
                history.push('/');
                
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
                                    <img src={logo} alt="Logo" className="brand-image logo-login" />
                                    {/* <b className="title-login">Meditech</b>+ */}
                                </Card.Header>
                                
                                <Card.Body>
                                    {/* <p className="login-box-msg">Sign in</p> */}
                                    <Form noValidate validated={validated} onSubmit={handleLogin}>
                                        <Row className="mb-1 mt-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom1">
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Username/NIK/Email"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        // placeholder="Username/NIK/Email"
                                                        required
                                                        name="username"
                                                        onChange={handleChange}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-1">
                                            <Form.Group as={Col} md="12" controlId="validationCustom11">
                                                {/* <Form.Label>Confirm New Password</Form.Label> */}
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="PIN/PASSWORD"
                                                >
                                                    <Form.Control
                                                        type="password"
                                                        // placeholder="PIN/PASSWORD"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        name="password"
                                                        onChange={handleChange}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Row>
                                        
                                        <Row className="mb-1">
                                            <Col lg={12}>
                                                {error && 
                                                    <Alert variant="danger">
                                                        {error}
                                                    </Alert>
                                                }
                                            </Col>
                                            <Col lg={12} className="text-center">
                                                <Button type="submit" className="btn-login">MASUK</Button>
                                            </Col>
                                            
                                        </Row>
                                        
                                    </Form>
                                    {/* <br />
                                    <p className="mb-1">
                                        <a href="/forgot">I forgot my password</a>
                                    </p>
                                    <p className="mb-0">
                                        <a href="/register" className="text-center">Register</a>
                                    </p> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Login;