import React, { useState, useEffect } from 'react';
import Api from '../config/Api';
import { useHistory, Link } from 'react-router-dom';

import { getUser, removeUserSession, getPermissions, checkMenu, getStyles } from '../Utils/Common';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';

import { FaCriticalRole, FaUsers, FaUserShield, FaUserNurse, FaBookMedical } from 'react-icons/fa';
import { GrUserAdmin } from "react-icons/gr";
import { AiFillDashboard, AiFillDatabase, AiOutlineQrcode, AiOutlineLeft } from "react-icons/ai";
import { BsSignpost2Fill, BsFillFileEarmarkPdfFill, BsCardChecklist, BsCardList } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineEditNote, MdOutlinePassword, MdOutlineAddAlert } from "react-icons/md";
import { RiAdminFill, RiPagesLine, RiNurseLine} from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi";
import { GiDoctorFace, GiArtificialIntelligence, GiArchiveRegister } from "react-icons/gi";
import { confirm } from "react-confirm-box";

function SideBar() {
    const history = useHistory();
    const user = getUser();
    const { collapseSidebar } = useProSidebar();

    useEffect(() => {
    }, []);

    const handleLogout = async () => {
        const confirm_action = await confirm("Anda yakin ingin keluar dari Aplikasi ini?");
        if (confirm_action) {
            removeUserSession();
            history.push('/login');
        }
    }
    const handleMenuIcon = (e) => {
        collapseSidebar();
    }
    return (
        <Sidebar className="main-sidebar sidebar-dark-primary" defaultCollapsed={false}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="user-panel mt-3 d-flex">
                    <div className="image logo">
                        <img src="assets/img/logo_2.png" className="brand-image" />
                    </div>
                </div>
                <div className="user-panel mt-2 d-flex user-info">
                    <div className="image">
                        <img src={ user.avatar ? user.avatar : 'assets/img/user2-160x160.jpg' } className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <Link className="d-block" to="/profile">
                            {user.first_name} {user.middle_name} {user.last_name}
                        </Link>
                        <span className="badge-outline">{user.role_id.name}</span>
                    </div>
                </div>

                <Menu>
                    
                    <MenuItem className="nav-item" component={<Link to="" />} icon={<AiFillDashboard />} >Dashboard</MenuItem>
                    
                    { checkMenu('modules') || checkMenu('users') || checkMenu('roles') || checkMenu('permissions') ?
                        <SubMenu label="Admin" icon={<RiAdminFill />}>
                            { checkMenu('modules') && 
                                <MenuItem component={<Link to="/modules" />} icon={<RiPagesLine />}>Modules</MenuItem>
                            }
                            { checkMenu('roles') && 
                                <MenuItem className="nav-item" component={<Link to="/roles" />} icon={<FaCriticalRole />}>Roles</MenuItem>
                            }
                            { checkMenu('users') && 
                                <MenuItem className="nav-item" component={<Link to="/users" />} icon={<FaUsers />}>Users</MenuItem>
                            }
                            { checkMenu('permissions') && 
                                <MenuItem className="nav-item" component={<Link to="/permissions" />} icon={<FaUserShield />}>Permissions</MenuItem>
                            }
                            { checkMenu('logs') && 
                                <MenuItem className="nav-item" component={<Link to="/logs" />} icon={<FaUserShield />}>Logs</MenuItem>
                            }
                        </SubMenu>
                    : ''}

                    {  checkMenu('zipcodes') || checkMenu('products') || checkMenu('brands') || checkMenu('categorys') ?
                        <SubMenu label="Master Data " icon={<AiFillDatabase />}>
                            { checkMenu('zipcodes') && 
                                <MenuItem className="nav-item" component={<Link to="/zipcodes" />} icon={<BsSignpost2Fill />}>Zip Code</MenuItem>
                            }
                            { checkMenu('products') && 
                                <MenuItem className="nav-item" component={<Link to="/products" />} icon={<BsSignpost2Fill />}>Products</MenuItem>
                            }
                            { checkMenu('brands') && 
                                <MenuItem className="nav-item" component={<Link to="/brands" />} icon={<BsSignpost2Fill />}>Brands</MenuItem>
                            }
                            { checkMenu('categorys') && 
                                <MenuItem className="nav-item" component={<Link to="/categorys" />} icon={<BsSignpost2Fill />}>Categorys</MenuItem>
                            }
                        </SubMenu>
                    : '' }

                    <SubMenu label="Settings " icon={<HiOutlineUsers />}>
                        { checkMenu('general') && 
                            <MenuItem className="nav-item" component={<Link to="/general" />} icon={<GiDoctorFace />}>General</MenuItem>
                        }
                        <MenuItem className="nav-item" component={<Link to="/profile" />} icon={<FaUserNurse />}>Profile</MenuItem>
                        <MenuItem className="nav-item" component={<Link to="/changepassword" />} icon={<MdOutlinePassword />}>Change Password</MenuItem>
                    </SubMenu>
                    <MenuItem className="nav-item" onClick={handleLogout} icon={<RiNurseLine />}>Logout</MenuItem>
                    <MenuItem className="nav-item small-box-grey" onClick={handleMenuIcon} icon={<AiOutlineLeft />}>Hide</MenuItem>
                </Menu>
            </div>
        </Sidebar>
    )
}
export default SideBar;