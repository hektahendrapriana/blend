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
import { FiSearch } from "react-icons/fi";
import moment from 'moment'

function Addproduct() {
    const history = useHistory();
    const [error, setError] = useState(null);
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
        getBrands()
    }, []);

    function getBrands() {
        Api().get('products/brands')
        .then((response) => response)
        .then((data) => {
            console.log(data.data)
            setBrands(data.data);
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
        const form = req.currentTarget;
        if (form.checkValidity() === false) {
            req.preventDefault();
            req.stopPropagation();
        }
        setValidated(true);
        var data = new FormData(form);
        let formObject = Object.fromEntries(data.entries());
        console.log(formObject);
        await Api().post('products', formObject)
        .then((response) => response)
        .then((data) => {
            setValidated(false);
            if( data.status === 201 ){
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
                                <h1 className="m-0">Add Product</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('modules') &&
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
                                            <Col md="8">
                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                            <Form.Label>Product SKU</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Product SKU"
                                                                name="sku"
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
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                            <Form.Label>Product Image URL</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Image URL"
                                                                name="product_image_url"
                                                                onChange={handleChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                            <Form.Label>Product URL</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Product URL"
                                                                name="real_pdp_url"
                                                                onChange={handleChange}
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
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="4" controlId="validationCustom08">
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
                                                                        <option key={i} value={item.value}>{item.label}</option>
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
                                                                <option value="IPHONE">IPHONE</option>
                                                                <option value="IPAD">IPAD</option>
                                                                <option value="MAC">MAC</option>
                                                                <option value="WATCH">WATCH</option>
                                                                <option value="TV">TV</option>
                                                                <option value="ACCESORIES">ACCESORIES</option>
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
                                                                <option value="Click & Pickup">Click & Pickup</option>
                                                                <option value="Stok Habis">Stok Habis</option>
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
export default Addproduct