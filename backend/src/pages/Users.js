import React, { useState, useEffect } from 'react';
import { checkMenu } from '../Utils/Common';
import DefaultLayout from '../component/DefaultLayout';
import Footer from '../component/Footer';
import Api from '../config/Api';

import { AiOutlinePlus, AiFillEdit, AiFillDelete, AiOutlineUnlock, AiOutlineLock } from 'react-icons/ai'
import { GoVerified ,GoUnverified } from "react-icons/go";
import { CgBlock, CgUnblock } from "react-icons/cg";
import { SiMinutemailer } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";


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
import moment from 'moment'
import Badge from 'react-bootstrap/Badge';
import { confirm } from "react-confirm-box";
import { FiSearch } from "react-icons/fi";

function Users() {
  const history = useHistory()
  const [dataList, setDataList] = useState([])

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const newDate = new Date(Date.now() + (1*24*60*60*1000));
  
  useEffect(() => {
    getDataList()        
  }, [page, keyword]);

  const getDataList = async () => {
    await Api().get(`users?filter=${keyword}&fields=first_name,middle_name,last_name,email,user_name,mobile_phone,gender&page=${page}&limit=${limit}`)
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
      await Api().delete(`users/${id}`)
      .then((response) => response)
      .then((res) => {
        if( res.status === 200 ){
          for (let i = dataList.length - 1; i >= 0; --i) {
            if (dataList[i]._id === id) dataList.splice(i, 1);
          }
          setDataList(dataList);
          history.push('/users')
        }
      })
      .catch((err) => {
          
      });
    }
  }

  const handleVerified = async (e) => {
    const id = e.target.attributes.getNamedItem("data-id").value
    const verifiedData = {};

    const confirm_action = await confirm("Anda yakin ingin memverifikasi akun ini?");
    if (confirm_action) {
      await Api().get(`users/${id}`)
      .then((response) => response)
      .then((dataUser) => {
          if( dataUser.status === 200 )
          {
            verifiedData.blockExpires = dataUser.data.blockExpires;
  
            if( dataUser.data.verified === true )
            {
              verifiedData.verified = false;
            }
            else{
              verifiedData.verified = true;
            }
            Api().patch(`users/verify/${id}`, verifiedData)
            .then((response) => response)
            .then((res) => {
              if( res.status === 200 ){
                getDataList();
                history.push('/users')
              }
            })
            .catch((err) => {
                
            });
          }
      })
      .catch((err) => {
      });
    }
  }

  function blockedTimes(date, days) {
    if( days > 0 )
    {
      var netDate = new Date();
    }
    else{
      var netDate = new Date();
    }
    
    netDate.setDate(netDate.getDate() + days);
    return moment(netDate).format();
  }

  const handleChangeStatus = async (e) => {
    const id = e.target.attributes.getNamedItem("data-id").value
    const statusData = {};

    const confirm_action = await confirm("Anda yakin ingin mengubah status akun ini?");
    if (confirm_action) {
      await Api().get(`users/${id}`)
      .then((response) => response)
      .then((dataUser) => {
          if( dataUser.status === 200 )
          {
            statusData.verified = dataUser.data.verified;
            if( Date.parse(dataUser.data.blockExpires) > new Date() )
            {
              statusData.blockExpires = blockedTimes(dataUser.data.blockExpires,-1);
            }
            else{
              statusData.blockExpires = blockedTimes(dataUser.data.blockExpires, 1);
            }
            Api().patch(`users/verify/${id}`, statusData)
            .then((response) => response)
            .then((res) => {
              if( res.status === 200 ){
                getDataList();
                history.push('/users')
              }
            })
            .catch((err) => {
                
            });
          }
      })
      .catch((err) => {
      });
    }
  }

  const handleSendEmail = async (e) => {
    const confirm_action = await confirm("Anda yakin ingin mengirim email verifikasi ke akun ini?");
    if (confirm_action) {
    }
  }

  const handleRemote = async (e) => {
    const id = e.target.attributes.getNamedItem("data-id").value
    const allowData = {};

    const confirm_action = await confirm("Anda yakin ingin mengubah status akun ini?");
    if (confirm_action) {
      await Api().get(`users/${id}`)
      .then((response) => response)
      .then((dataUser) => {
          if( dataUser.status === 200 )
          {
            if( dataUser.data.allow_remote === true )
            {
              allowData.allow_remote = false;
            }
            else{
              allowData.allow_remote = true;
            }
            Api().patch(`users/allowremote/${id}`, allowData)
            .then((response) => response)
            .then((res) => {
              if( res.status === 200 ){
                getDataList();
                history.push('/users')
              }
            })
            .catch((err) => {
                
            });
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
                    <h1 className="m-0">Users</h1>
                    </Col>
                    <Col sm={2}>
                      { checkMenu('adduser') &&
                              <Link to="adduser"><Button variant="outline-primary" className="btn-upload"><AiOutlinePlus /> Add User</Button></Link>
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
                        <th style={{ width: '5%'}} className="text-center">No</th>
                        <th style={{ width: '20%'}} className="text-left">Name</th>
                        <th style={{ width: '10%'}} className="text-left">Role</th>
                        <th style={{ width: '54%'}} className="text-left">Details</th>
                        <th style={{ width: '7%'}} className="text-left">Status</th>
                        <th style={{ width: '4%'}} className="text-left"></th>
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
                            <td className="text-left">{item.first_name} {item.middle_name} {item.last_name}</td>
                            <td className="text-left">{item.role_id.name}</td>
                            <td className="text-left">
                              Username : <br />
                              {item.user_name} <br />

                              Email : <br />
                              {item.email}<br />

                              MobilePhone : <br/>
                              {item.mobile_phone}
                            </td>
                            <td className="text-left">
                              <Badge bg={ item.verified ? 'success' : 'warning' }>{ item.verified ? 'Verified' : 'Unverified' }</Badge><br /><br />
                              <Badge bg={ Date.parse(item.blockExpires) > Date.parse(new Date()) ? 'danger' : 'info' }>{ Date.parse(item.blockExpires) > Date.parse(new Date()) ? 'Blocked' : 'Unblock' }</Badge>
                            </td>
                            <td className="text-left">
                              <NavDropdown title="Action" className='' id="basic-nav-dropdown">
                                  { checkMenu('sendverification') && item.verified === false && item.role_id.role !== 'su' ? 
                                    <NavDropdown.Item href="#" onClick={handleSendEmail} data-id={item._id}><SiMinutemailer /> Send Verification</NavDropdown.Item> 
                                    : ''
                                  }
                                  { checkMenu('edituser') && 
                                      <NavDropdown.Item href={ "edituser/" + item._id }><AiFillEdit /> Change</NavDropdown.Item>
                                  }
                                  { checkMenu('verifieduser') && item.role_id.role !== 'su' && 
                                      <NavDropdown.Item href="#" onClick={handleVerified} data-id={item._id}>{ item.verified ? <GoUnverified /> : <GoVerified /> } { item.verified ? ' Unverifying' : ' Verifying' }</NavDropdown.Item>
                                  }
                                  { checkMenu('changestatususer') && 
                                      <NavDropdown.Item href="#" onClick={handleChangeStatus} data-id={item._id}>{ Date.parse(item.blockExpires) > Date.parse(new Date()) ? <CgUnblock /> : <CgBlock /> } { Date.parse(item.blockExpires) > Date.parse(new Date()) ? ' Unblock' : ' Block' }</NavDropdown.Item>
                                  }
                                  { checkMenu('changepassworduser') && item.role_id.role !== 'su' ? 
                                      <NavDropdown.Item href={ "changepassworduser/" + item._id }><RiLockPasswordFill /> Change Password</NavDropdown.Item>
                                    : ''
                                  }
                                  { checkMenu('deleteuser')  && item.role_id.role !== 'su' && 
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
export default Users
