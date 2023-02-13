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
import moment from 'moment'

function Addzipcode() {
    const history = useHistory();
    const [error, setError] = useState(null);
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
    }, []);

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }
    
    const handleSubmit = async (req, res) => {
        req.preventDefault();
        const form = req.currentTarget;
        if (form.checkValidity() === false) {
            req.preventDefault();
            req.stopPropagation();
        }
        setValidated(true);
        var data = new FormData(form);
        let formObject = Object.fromEntries(data.entries());

        await Api().post('zipcodes', formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 201 ){
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
                                <h1 className="m-0">Add Zip Code</h1>
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
                                                            onChange={handleChange}
                                                        />
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
                                                            onChange={handleChange}
                                                        />
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
                                                            onChange={handleChange}
                                                        />
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
                                                            onChange={handleChange}
                                                        />
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
                                                            onChange={handleChange}
                                                        />
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
                                                            onChange={handleChange}
                                                        />
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
                                                            <option value="GET">GET</option>
                                                            <option value="POST">POST</option>
                                                            <option value="UPDATE">UPDATE</option>
                                                            <option value="DELETE">DELETE</option>
                                                        </Form.Control>
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
                                                            <option value="API">API</option>
                                                            <option value="ADMIN">ADMIN</option>
                                                            <option value="DASHBOARD">DASHBOARD</option>
                                                            <option value="DOKTER">DOKTER</option>
                                                            <option value="PASIEN">PASIEN</option>
                                                        </Form.Control>
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
export default Addzipcode