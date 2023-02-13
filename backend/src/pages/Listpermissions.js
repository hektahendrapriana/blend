import React, { useState, useEffect } from 'react';
import { checkMenu } from '../Utils/Common';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import Api from '../config/Api';

import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { GoVerified ,GoUnverified } from "react-icons/go";
import { CgBlock, CgUnblock } from "react-icons/cg";
import { SiMinutemailer } from "react-icons/si";

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
import { Link, useHistory, useParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import moment from 'moment'
import { confirm } from "react-confirm-box";
import { FiSearch } from "react-icons/fi";

function Listpermissions() {
    const history = useHistory()
    const {id} = useParams();
    const [dataList, setDataList] = useState([])
    const [dataDetails, setDataDetails] = useState([]);

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState();
    const [query, setQuery] = useState();
    const newDate = new Date(Date.now() + (1*24*60*60*1000));
    
    useEffect(() => {
        getDetails()
        getDataList()        
    }, [page, keyword]);

    function getDetails() {
        Api().get(`roles/${id}`)
        .then((response) => response)
        .then((data) => {
            setDataDetails(data.data);
        })
        .catch((err) => {
        });
    }

    const getDataList = async () => {
        await Api().get(`permissions?filter=${keyword}&role_id=${id}&page=${page}&limit=${limit}`)
        .then((response) => response)
        .then((data) => {
            const listData = data.data;
            setDataList(listData.docs);
            setPage(listData.page);
            setPages(listData.totalPages);
            setRows(listData.totalDocs);
        })
        .catch((err) => {
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
            await Api().delete(`permissions/${id}`)
            .then((response) => response)
            .then((res) => {
                if( res.status === 200 ){
                    for (let i = dataList.length - 1; i >= 0; --i) {
                        if (dataList[i]._id === id) dataList.splice(i, 1);
                    }
                    setDataList(dataList);
                    history.push('/permissions')
                }
            })
            .catch((err) => {
                
            });
        }
    }

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
                                <h1 className="m-0">List Permissions</h1>
                                </Col>
                                <Col sm={2}>
                                { checkMenu('addpermissionmodule') &&
                                                        <Link to={"/addpermissionmodule/" + id}><Button className="btn-upload" variant="outline-primary"><AiOutlinePlus /> Add Permission</Button></Link>
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
                                        <thead className="thead">
                                            <tr>
                                                <th style={{ width: '15%'}} className="text-center">No</th>
                                                <th style={{ width: '15%'}} className="text-left">Module Name</th>
                                                <th style={{ width: '15%'}} className="text-left">Path</th>
                                                <th style={{ width: '12%'}} className="text-left">Method</th>
                                                <th style={{ width: '8%'}} className="text-left">Source</th>
                                                <th style={{ width: '5%'}} className="text-left"></th>
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
                                                        <td className="text-left">{item.page_id.name}</td>
                                                        <td className="text-left">{item.page_id.path}</td>
                                                        <td className="text-left">{item.page_id.method}</td>
                                                        <td className="text-left">{item.page_id.source}</td>
                                                        <td className="text-left">
                                                            <NavDropdown title="Action" className='' id="basic-nav-dropdown">
                                                                { checkMenu('editpermissionmodule') && 
                                                                    <NavDropdown.Item href={ "editpermissionmodule/" + item.role_id._id + "/" + item._id }><AiFillEdit /> Change</NavDropdown.Item>
                                                                }
                                                                { checkMenu('deletepermissionmodule') && 
                                                                    <NavDropdown.Item href="#" onClick={handleDelete} data-role-id={item.role_id._id} data-id={item._id}><AiFillDelete /> Delete</NavDropdown.Item>
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
export default Listpermissions
