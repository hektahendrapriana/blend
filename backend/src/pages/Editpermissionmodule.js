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
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { FiSearch } from "react-icons/fi";

function Editpermissionmodule() {
    const {role_id} = useParams();
    const {id} = useParams();
    const history = useHistory();
    const [dataDetails, setDataDetails] = useState([]);
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [errorForm, setErrorForm] = useState([]);
    const [validated, setValidated] = useState(false);
    const [defaultSelectedModule, setDefaultSelectedModule] = useState({});

    const today = new Date();
    
    const [startDate, setStartDate] = useState(new Date());
    
    const [formData, setFormData] = useState({
        role_id: '',
        page_id: ''
    });

    useEffect(() => {
        getDetails()
        getModules();
    }, []);

    function getDetails(e) {
        Api().get(`roles/${role_id}`)
        .then((response) => response)
        .then((data) => {
            setDataDetails(data.data);
        })
        .catch((err) => {
       });
    }

    function getModules() {
        Api().get(`permissions/${id}`)
        .then((response) => response)
        .then((detailsResponse) => {
            if( detailsResponse.status === 200 )
            {
                Api().get(`pages?limit=1000&sort=name&order=1`)
                .then((response) => response)
                .then((modulesResponse) => {
                    if( modulesResponse.status === 200 )
                    {
                        console.log(modulesResponse)
                        const listModules = [];
                        for( let i=0; i < modulesResponse.data.totalDocs; i++ )
                        {
                            if( detailsResponse.data.page_id._id !== '' && modulesResponse.data.docs[i]._id === detailsResponse.data.page_id._id )
                            {
                                defaultSelectedModule.label = modulesResponse.data.docs[i].name + ' [ ' +modulesResponse.data.docs[i].source + " : " +  modulesResponse.data.docs[i].method + "/" + modulesResponse.data.docs[i].path +"/ ]"
                                defaultSelectedModule.value = modulesResponse.data.docs[i]._id;

                                console.log(defaultSelectedModule)
                            }
                            listModules.push({ value: modulesResponse.data.docs[i]._id, label: modulesResponse.data.docs[i].name + ' [ ' +modulesResponse.data.docs[i].source + " : " +  modulesResponse.data.docs[i].method + "/" + modulesResponse.data.docs[i].path +"/ ]" })
                        }

                        setModules(listModules);
                        setDefaultSelectedModule(defaultSelectedModule);
                    }
                })
                .catch((err) => {
                });
            }
        })
        .catch((err) => {
        });
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleChangeSelect(e) {
        const key = e.name;
        const value = e.value;
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

        Api().patch(`permissions/${id}`, formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 200 || data.status === 201 ){
                history.push(`/listpermissions/${role_id}`);
            }
            else{
                setError(data.data.errors.msg)
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
                                <h1 className="m-0">Edit Permission</h1>
                                </Col>
                                <Col sm={2}>
                                { checkMenu('listpermissions') &&
                                        <Link to={ "/listpermissions/" + id }><Button variant="outline-primary" className="btn-upload"><AiOutlineRollback /> Back</Button></Link>
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
                                                        <Form.Group as={Col} md="12" controlId="validationCustom08">
                                                            <Form.Control
                                                                type="hidden"
                                                                name="role_id"
                                                                defaultValue={dataDetails._id}
                                                            />
                                                            <Form.Label>Module</Form.Label>
                                                            <Select 
                                                                required
                                                                options={modules} 
                                                                name="page_id"
                                                                defaultValue={defaultSelectedModule}
                                                                onChange={handleChangeSelect}
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
export default Editpermissionmodule