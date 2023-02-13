import React, { useState, useEffect } from 'react';
import DefaultLayout from '../component/DefaultLayout';
import SideBar from '../component/SideBar';
import Footer from '../component/Footer';
import Api from '../config/Api';
import { defaultConf } from "../config/DefaultConf";
import { getUser, getPermissions, getStyles } from '../Utils/Common';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactPaginate from "react-paginate";
import moment from 'moment'

import { FiSearch } from "react-icons/fi";

function Dashboard() {
  const user = getUser();
  const [dataList, setDataList] = useState([])
  const [menuStyles, setMenuStyles] = useState([])
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getDataList()
    setMenuStyles(getStyles())
  }, [page, keyword]);

  const getDataList = async () => {
    await Api().get(`activitys?filter=${keyword}&fields=access_url,method,module,browser,ip,source,first_name,middle_name,last_name,email,user_name&page=${page}&limit=${limit}`)
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
    setPage(selected+1);
  }

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
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
                  <h1 className="m-0">Dashboard - Activity Logs</h1>
                </Col>
                <Col sm={2}>

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
                <Col lg={12} style={{ padding: '0' }}>
                  { getPermissions() === 'su' || getPermissions() === 'admin' ?
                    <Table striped hover responsive>
                      <thead className="thead">
                        <tr>
                          <th style={{ width: '3%'}} className="text-center">No</th>
                          <th style={{ width: '57%'}} className="text-left">Details</th>
                          <th style={{ width: '15%'}} className="text-left">Person</th>
                          <th style={{ width: '25%'}} className="text-left">Date</th>
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
                              <td className="text-left">
                                <ul className='list-data'>
                                  <li>Source : {item?.source}</li>
                                  <li>Module : {item?.module}</li>
                                  <li>Method : {item?.method}</li>
                                  <li>URL : {item?.access_url.split('?')[0]}</li>
                                </ul>
                              </td>
                              <td className="text-left">{item?.createdBy?.first_name} {item?.createdBy?.middle_name} {item?.createdBy?.last_name}</td>
                              <td className="text-left">{moment(item?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="4">
                            <p className="text-right">Total Data: {rows} Page: {rows ? page : 0} of {pages}</p>
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
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                    
                    // <Card className="content-list">
                    //   <Card.Header>
                    //     <Row>
                    //       <Col lg={6}><h5>Activity Logs</h5></Col>
                    //       <Col lg={6}>
                    //         <Navbar bg="light" expand="lg" className='float-sm-right'>
                    //           <Navbar.Collapse id="navbarScroll">
                    //             {/* <Form className="d-flex" onSubmit={searchData}>
                    //               <Form.Control
                    //                 type="search"
                    //                 placeholder="Search"
                    //                 className="me-2"
                    //                 aria-label="Search"
                    //                 value={query}
                    //                 onChange={(e) => setQuery(e.target.value)}
                    //               />
                    //               <Button type="submit" variant="outline-primary">Search</Button>
                    //             </Form> */}
                    //           </Navbar.Collapse>
                    //         </Navbar>
                    //       </Col>
                    //     </Row>
                    //   </Card.Header>
                    //   <Card.Body>
                    //     {/* <Card.Title>List Modules</Card.Title> */}
                    //     <Table striped hover>
                    //       <thead>
                    //         <tr>
                    //           <th style={{ width: '3%'}} className="text-center">No</th>
                    //           <th style={{ width: '57%'}} className="text-left">Details</th>
                    //           <th style={{ width: '15%'}} className="text-left">Person</th>
                    //           <th style={{ width: '25%'}} className="text-left">Date</th>
                    //         </tr>
                    //       </thead>
                    //       <tbody>
                    //         {
                    //           dataList.map((item, i) => (
                    //             <tr key={i}>
                    //               <td className="text-center">
                    //                   {page === 1 ?
                    //                       i+1 : ( limit * (page-1) ) + (i+1)
                    //                   }
                    //               </td>
                    //               <td className="text-left">
                    //                 <ul className='list-data'>
                    //                   <li>Source : {item?.source}</li>
                    //                   <li>Module : {item?.module}</li>
                    //                   <li>Method : {item?.method}</li>
                    //                   <li>URL : {item?.access_url.split('?')[0]}</li>
                    //                 </ul>
                    //               </td>
                    //               <td className="text-left">{item?.createdBy?.first_name} {item?.createdBy?.middle_name} {item?.createdBy?.last_name}</td>
                    //               <td className="text-left">{moment(item?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                    //             </tr>
                    //           ))
                    //         }
                    //       </tbody>
                    //     </Table>
                        
                    //   </Card.Body>
                    //   <Card.Footer>
                    //     <Row>
                    //       <Col lg={3}>
                    //         <p>Total Data: {rows} Page: {rows ? page : 0} of {pages}</p>
                    //       </Col>
                    //       <Col lg={9}>
                    //         <nav
                    //           className="pagination float-sm-right"
                    //           key={rows}
                    //           role="navigation"
                    //           aria-label="pagination"
                    //         >
                    //           <ReactPaginate
                    //             previousLabel={"Prev"}
                    //             nextLabel={"Next"}
                    //             pageCount={pages}
                    //             onPageChange={changePage}
                    //             containerClassName={"pagination-list pagination"}
                    //             pageLinkClassName={"pagination-link page-link"}
                    //             previousLinkClassName={"pagination-previous page-link"}
                    //             nextLinkClassName={"pagination-next page-link"}
                    //             activeLinkClassName={"pagination-link is-current"}
                    //             disabledLinkClassName={"pagination-link is-disabled"}
                    //             activeClassName={"active"}
                    //             pageClassName={"page-item"}
                    //           />
                    //         </nav>
                    //       </Col>
                    //     </Row>
                    //   </Card.Footer>
                    // </Card>
                      
                    : ''
                  }
                </Col>
              </Row>
            </Container>
          </div>
          {/* <div className="right-box float-sm-right">
          </div> */}
          {/* <div className="content">
            
          </div> */}
          
        </main>
      </div>
      <Footer />
    </>
  )
}
export default Dashboard
