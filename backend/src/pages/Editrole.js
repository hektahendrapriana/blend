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
import { useParams } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import moment from 'moment'

function Editrole() {
    const history = useHistory();
    const {id} = useParams();
    const [dataDetails, setDataDetails] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        descriptions: ''
    });


    useEffect(() => {
        getDetails()
    }, []);
    
    function getDetails(e) {
        Api().get(`roles/${id}`)
        .then((response) => response)
        .then((data) => {
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

    const handleSubmit = async (req, res) => {
        req.preventDefault();
        setError(null);
        const form = req.currentTarget;
        if (form.checkValidity() === false) {
            req.preventDefault();
            req.stopPropagation();
        }
        setValidated(true);
        var data = new FormData(form);
        let formObject = Object.fromEntries(data.entries());

        await Api().patch(`roles/${id}`, formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 201 || data.status === 200 ){
                history.push('/roles');
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
                                <h1 className="m-0">Edit Role</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('roles') &&
                                            <Link to="/roles"><Button variant="outline-primary" className="btn-upload"><AiOutlineRollback /> Back</Button></Link>
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
                                            <Col md="6">
                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                            <Form.Label>Role Name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="contoh : Admin Meditech"
                                                                name="name"
                                                                defaultValue={dataDetails.name || ''}
                                                                onChange={handleChange}
                                                            />
                                                            <Form.Control.Feedback>Validate!</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                            <Form.Label>Role</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="contoh : admin"
                                                                name="role"
                                                                defaultValue={dataDetails.role || ''}
                                                                onChange={handleChange}
                                                            />
                                                            <Form.Control.Feedback>Validate!</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                                                            <Form.Label>Descriptions</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="textarea"
                                                                name="descriptions"
                                                                defaultValue={dataDetails.descriptions || ''}
                                                                onChange={handleChange}
                                                            />
                                                            <Form.Control.Feedback>Validate!</Form.Control.Feedback>
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
export default Editrole