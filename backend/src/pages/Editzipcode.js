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
import moment from 'moment'

function Editzipcode() {
    const history = useHistory();
    const {id} = useParams();
    const [dataDetails, setDataDetails] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        kodepos: '',
        negara: ''
    });


    useEffect(() => {
        getDetails()
    }, []);
    
    function getDetails(e) {
        Api().get(`zipcodes/${id}`)
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

        await Api().patch(`zipcodes/${id}`, formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 201 || data.status === 200 ){
                history.push('/zipcodes');
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
                                <h1 className="m-0">Edit Zip Code</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('zipcodes') &&
                                        <Link to="/zipcodes"><Button variant="outline-primary" className="btn-upload"><AiOutlineRollback /> Back</Button></Link>
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
                                    <Card.Header>
                                    { checkMenu('zipcodes') &&
                                        <Link to="/zipcodes"><Button variant="outline-primary"><AiOutlineRollback /> Back</Button></Link>
                                    }
                                    </Card.Header>
                                    <Card.Body>
                                        <Col md="6">
                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                        <Form.Label>Provinsi</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Provinsi"
                                                            name="provinsi"
                                                            defaultValue={dataDetails.provinsi || ''}
                                                            onChange={handleChange}
                                                        />
                                                        {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                        <Form.Label>Kabupaten</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Kabupaten"
                                                            name="kabupaten"
                                                            defaultValue={dataDetails.kabupaten || ''}
                                                            onChange={handleChange}
                                                        />
                                                        {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                        <Form.Label>Kecamatan</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Kecamatan"
                                                            name="kecamatan"
                                                            defaultValue={dataDetails.kecamatan || ''}
                                                            onChange={handleChange}
                                                        />
                                                        {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                        <Form.Label>Kelurahan</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Kelurahan"
                                                            name="kelurahan"
                                                            defaultValue={dataDetails.kelurahan || ''}
                                                            onChange={handleChange}
                                                        />
                                                        {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                        <Form.Label>Kode Pos</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Kode Pos"
                                                            name="kodepos"
                                                            defaultValue={dataDetails.kodepos || ''}
                                                            onChange={handleChange}
                                                        />
                                                        {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                        <Form.Label>Negara</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Negara"
                                                            name="negara"
                                                            defaultValue={dataDetails.negara || ''}
                                                            onChange={handleChange}
                                                        />
                                                        {/* <Form.Control.Feedback>Validate!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                {/* <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                                                        <Form.Label>Method Type</Form.Label>
                                                        <Form.Control
                                                            required
                                                            as="select"
                                                            name="method"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Method</option>
                                                            { dataDetails.method === 'GET' ? 
                                                                <option value="GET" selected="selected">GET</option>
                                                            : <option value="GET">GET</option> }

                                                            { dataDetails.method === 'POST' ? 
                                                                <option value="POST" selected="selected">POST</option>
                                                            : <option value="POST">POST</option> }

                                                            { dataDetails.method === 'UPDATE' ? 
                                                                <option value="UPDATE" selected="selected">UPDATE</option>
                                                            : <option value="UPDATE">UPDATE</option> }

                                                            { dataDetails.method === 'DELETE' ? 
                                                                <option value="DELETE" selected="selected">DELETE</option>
                                                            : <option value="DELETE">DELETE</option> }

                                                        </Form.Control>
                                                        <Form.Control.Feedback>Validate!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                                                        <Form.Label>Source</Form.Label>
                                                        <Form.Control
                                                            required
                                                            as="select"
                                                            // value={type}
                                                            name="source"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Source</option>

                                                            { dataDetails.source === 'API' ? 
                                                                <option value="API" selected="selected">API</option>
                                                            : <option value="API">API</option> }

                                                            { dataDetails.source === 'ADMIN' ? 
                                                                <option value="ADMIN" selected="selected">ADMIN</option>
                                                            : <option value="ADMIN">ADMIN</option> }

                                                            { dataDetails.source === 'DASHBOARD' ? 
                                                                <option value="DASHBOARD" selected="selected">DASHBOARD</option>
                                                            : <option value="DASHBOARD">DASHBOARD</option> }

                                                            { dataDetails.source === 'DOKTER' ? 
                                                                <option value="DOKTER" selected="selected">DOKTER</option>
                                                            : <option value="DOKTER">DOKTER</option> }

                                                            { dataDetails.source === 'PASIEN' ? 
                                                                <option value="PASIEN" selected="selected">PASIEN</option>
                                                            : <option value="PASIEN">PASIEN</option> }

                                                        </Form.Control>
                                                        <Form.Control.Feedback>Validate!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    
                                                </Row> */}
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
export default Editzipcode