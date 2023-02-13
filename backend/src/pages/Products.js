import React, { useState, useEffect } from 'react';
import { checkMenu } from '../Utils/Common';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import Api from '../config/Api';
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { confirm } from "react-confirm-box";
import { FiSearch } from "react-icons/fi";
import moment from 'moment'

function Products() {
    const history = useHistory()
    const [dataList, setDataList] = useState([])

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        getDataList()        
    }, [page, keyword]);

    const getDataList = async () => {
        await Api().get(`products?filter=${keyword}&fields=sku,product_name,product_type,brand,product_price,product_info&page=${page}&limit=${limit}`)
        .then((response) => response)
        .then((data) => {
            const listData = data.data;
            setDataList(listData.docs);
            setPage(listData.page);
            setPages(listData.totalPages);
            setRows(listData.totalDocs);
            
        })
    }

    const changePage = ({ selected }) => {
        setDataList([])
        setPage(selected+1);
    }

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    }

    const handleDelete = async (e) => {
        const id = e.target.attributes.getNamedItem("data-id").value

        const confirm_action = await confirm("Anda yakin ingin menghapus data ini?");
        if (confirm_action) {
            await Api().delete(`products/${id}`)
            .then((response) => response)
            .then((res) => {
                if( res.status === 200 ){
                    for (let i = dataList.length - 1; i >= 0; --i) {
                        if (dataList[i]._id === id) dataList.splice(i, 1);
                    }
                    setDataList(dataList);
                    history.push('/products')
                }
            })
            .catch((err) => {
                
            });
        }
    }

    
    const numberFormat = (value) =>
        new Intl.NumberFormat('id-ID', {
    }).format(value);

    const currencyFormat = (value) =>
        new Intl.NumberFormat('id-ID', {
        // style: 'currency',
        currency: 'IDR'
    }).format(value);

    const handleOpenDetails = (e) => {
        const url = e.target.attributes.getNamedItem("data-url").value
        window.open(url, '_blank', 'noreferrer');
    }
    return (
        <>
            <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
                <DefaultLayout />
                <main>
                    <div className="content-header">
                        <Container fluid>
                            <Row className="">
                                <Col sm={4}>
                                <h1 className="m-0">Products</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('addproduct') &&
                                        <Link to="addproduct"><Button variant="outline-primary" className="btn-upload"><AiOutlinePlus /> Add Product</Button></Link>
                                    }
                                </Col>
                                <Col sm={3}>
                                <Form className="d-flex" onSubmit={searchData}>
                                    <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 input-search"
                                    aria-label="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <Button type="submit" className="btn-search"><FiSearch /></Button>
                                </Form>
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
                                <Col lg={12} style={{padding: '0'}}>
                                    <Table striped hover responsive>
                                        <thead className='thead'>
                                            <tr>
                                                <th style={{ width: '5%' }} className="text-center">No</th>
                                                <th style={{ width: '10%' }} >Thumbnails</th>
                                                <th style={{ width: '10%' }} >SKU</th>
                                                <th style={{ width: '30%' }} >Product Name</th>
                                                <th style={{ width: '10%' }} >Brand</th>
                                                <th style={{ width: '10%' }} >Category</th>
                                                <th style={{ width: '10%' }} >Price</th>
                                                <th style={{ width: '10%' }} >Info</th>
                                                <th style={{ width: '5%' }} ></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataList.map((item, i) => (
                                                    <tr key={i}>
                                                        <td className="text-center">
                                                            {page === 1 ?
                                                                i+1 : ( limit * (page-1) ) + (i+1)
                                                            }
                                                        </td>
                                                        <td>
                                                            <img src={item.product_image_url} className="thumbnail" data-url={item.real_pdp_url} onClick={handleOpenDetails} />
                                                        </td>
                                                        <td>{item.sku}</td>
                                                        <td>{item.product_name}</td>
                                                        <td>{item.brand}</td>
                                                        <td>{item.product_type}</td>
                                                        <td>{currencyFormat(item.product_price)}</td>
                                                        <td>{item.product_info}</td>
                                                        <td className="project-actions text-left">
                                                            <NavDropdown title="Action" className='' id="basic-nav-dropdown">
                                                                { checkMenu('editmodule') && 
                                                                    <NavDropdown.Item href={ "editmodule/" + item._id }><AiFillEdit /> Edit</NavDropdown.Item>
                                                                }
                                                                { checkMenu('deletemodule') && 
                                                                    <NavDropdown.Item href="#" onClick={handleDelete} data-id={item._id}><AiFillDelete /> Delete</NavDropdown.Item>
                                                                }
                                                            </NavDropdown>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    <Card className="content-list">
                                        <Card.Footer>
                                            <Row>
                                                <Col lg={3}>
                                                    <p>Total Data: {rows} Page: {rows ? page : 0} of {pages}</p>
                                                </Col>
                                                <Col lg={9}>
                                                    <nav
                                                        className="pagination float-sm-right"
                                                        key={rows}
                                                        role="navigation"
                                                        aria-label="pagination"
                                                    >
                                                        <ReactPaginate
                                                            previousLabel={"Prev"}
                                                            nextLabel={"Next"}
                                                            pageCount={pages}
                                                            onPageChange={changePage}
                                                            containerClassName={"pagination-list pagination"}
                                                            pageLinkClassName={"pagination-link page-link"}
                                                            previousLinkClassName={"pagination-previous page-link"}
                                                            nextLinkClassName={"pagination-next page-link"}
                                                            activeLinkClassName={"pagination-link is-current"}
                                                            disabledLinkClassName={"pagination-link is-disabled"}
                                                            activeClassName={"active"}
                                                            pageClassName={"page-item"}
                                                        />
                                                    </nav>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
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
export default Products