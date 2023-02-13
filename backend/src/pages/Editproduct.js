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

function Editproduct() {
    const history = useHistory();
    const {id} = useParams();
    const [dataDetails, setDataDetails] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        sku: '',
        product_name: '',
        product_price: '',
        brand: '',
        product_image_url: '',
        product_info: '',
        real_pdp_url: '',
        product_type: ''
    });


    useEffect(() => {
        getDetails()
    }, []);

    const getBrands = async (details) => {
        await Api().get(`products/brands`)
        .then((response) => response)
        .then((brandResponse) => {
            console.log(brandResponse.data)
            if( brandResponse.status === 200 )
            {
                for( let no=0; no < brandResponse.data.length; no++)
                {
                    brandResponse.data[no].selected = false;
                    if( brandResponse.data[no].value === details.brand )
                    {
                        brandResponse.data[no].selected = true;
                    }
                }
                setBrands(brandResponse.data);
            }
        })
        .catch((err) => {
        });
    }
    
    const getDetails = async () => {
        await Api().get(`products/${id}`)
        .then((response) => response)
        .then((data) => {
            getBrands(data.data)
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
        console.log('formObject', formObject);
        await Api().patch(`products/${id}`, formObject)
        .then((response) => response)
        .then((data) => {
            if( data.status === 201 || data.status === 200 ){
                history.push('/products');
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
                                <h1 className="m-0">Edit product_name</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('products') &&
                                        <Link to="/products"><Button variant="outline-primary" className="btn-upload"><AiOutlineRollback /> Back</Button></Link>
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
                                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                            <Form.Label>Product SKU</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Product SKU"
                                                                name="sku"
                                                                defaultValue={dataDetails.sku || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                            <Form.Label>Product Name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Product Name"
                                                                name="product_name"
                                                                defaultValue={dataDetails.product_name || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                            <Form.Label>Product Image URL</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Image URL"
                                                                name="product_image_url"
                                                                onChange={handleChange}
                                                                defaultValue={dataDetails.product_image_url || ''}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                            <Form.Label>Product URL</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Product URL"
                                                                name="real_pdp_url"
                                                                onChange={handleChange}
                                                                defaultValue={dataDetails.real_pdp_url || ''}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                            <Form.Label>Product Price</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Price"
                                                                name="product_price"
                                                                onChange={handleChange}
                                                                defaultValue={dataDetails.product_price || ''}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="64" controlId="validationCustom08">
                                                            <Form.Label>Brand</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                name="brand"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Brand</option>
                                                                {
                                                                    brands.map((item, i) => (
                                                                        <option key={i} value={item.value} selected={ item.selected }>{item.label}</option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                                                            <Form.Label>Product Type</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                name="product_type"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Type</option>
                                                                <option value="IPHONE" selected={ dataDetails.product_type === 'IPHONE' ? "true" : "false" }>IPHONE</option>
                                                                <option value="IPAD" selected={ dataDetails.product_type === 'IPAD' ? "true" : "false" }>IPAD</option>
                                                                <option value="MAC" selected={ dataDetails.product_type === 'MAC' ? "true" : "false" }>MAC</option>
                                                                <option value="WATCH" selected={ dataDetails.product_type === 'WATCH' ? "true" : "false" }>WATCH</option>
                                                                <option value="TV" selected={ dataDetails.product_type === 'TV' ? "true" : "false" }>TV</option>
                                                                <option value="ACCESORIES" selected={ dataDetails.product_type === 'ACCESORIES' ? true : false }>ACCESORIES</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationCustom04">
                                                            <Form.Label>Product Info</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                name="product_info"
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Click & Pickup" selected={ dataDetails.product_info === 'Click & Pickup' ? "true" : "false" }>Click & Pickup</option>
                                                                <option value="Stok Habis" selected={ dataDetails.product_info === 'Stok Habis' ? "true" : "false" }>Stok Habis</option>
                                                                
                                                            </Form.Control>
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
export default Editproduct