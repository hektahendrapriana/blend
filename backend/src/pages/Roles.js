import React, { useState, useEffect } from 'react';
import { checkMenu, getPermissions } from '../Utils/Common';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import Api from '../config/Api';
import { AiOutlinePlus, AiFillEdit, AiFillDelete, AiOutlineUnorderedList } from 'react-icons/ai'
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

function Roles() {
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
        await Api().get(`roles?filter=${keyword}&fields=name,role,descriptions&page=${page}&limit=${limit}`)
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
            await Api().delete(`roles/${id}`)
            .then((response) => response)
            .then((res) => {
                if( res.status === 200 ){
                    for (let i = dataList.length - 1; i >= 0; --i) {
                        if (dataList[i]._id === id) dataList.splice(i, 1);
                    }
                    setDataList(dataList);
                    history.push('/roles')
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
                                <h1 className="m-0">Roles</h1>
                                </Col>
                                <Col sm={2}>
                                    { checkMenu('addrole') &&
                                        <Link to="addrole"><Button variant="outline-primary" className="btn-upload"><AiOutlinePlus /> Add Role</Button></Link>
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
                                                <th style={{ width: '5%' }} className="text-center">No</th>
                                                <th className="col-name">Name</th>
                                                <th className="col-username">Role</th>
                                                <th className="col-username">Descriptions</th>
                                                <th className="col-action"></th>
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
                                                        <td>{item.name}</td>
                                                        <td>{item.role}</td>
                                                        <td className="project_progress">{item.descriptions}</td>
                                                        <td className="project-actions text-left">
                                                            <NavDropdown title="Action" className='' id="basic-nav-dropdown">
                                                                { checkMenu('editrole') && 
                                                                    <NavDropdown.Item href={ "editrole/" + item._id }><AiFillEdit /> Edit</NavDropdown.Item>
                                                                }
                                                                { checkMenu('deleterole') && 
                                                                    <NavDropdown.Item href="#" onClick={handleDelete} data-id={item._id}><AiFillDelete /> Delete</NavDropdown.Item>
                                                                }
                                                                { checkMenu('listpermissions') && item.role !== 'su' ?
                                                                    <NavDropdown.Item href={ "listpermissions/" + item._id }><AiOutlineUnorderedList /> Permissions</NavDropdown.Item>
                                                                    : ''
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
export default Roles