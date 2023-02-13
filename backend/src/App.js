import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './assets/css/App.css';
import Api from './config/Api';
import history from './Utils/History'

import { toast } from 'react-toastify';

import moment from 'moment'
import 'moment/locale/id'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Users from './pages/Users';
import Adduser from './pages/Adduser';
import Edituser from './pages/Edituser';
import Changepassworduser from './pages/Changepassworduser';


import Changepassword from './pages/Changepassword';
import Profile from './pages/Profile';


import Roles from './pages/Roles';
import Addrole from './pages/Addrole';
import Editrole from './pages/Editrole';

import Permissions from './pages/Permissions';
import Addpermission from './pages/Addpermision';
import Editpermission from './pages/Editpermision';
import Listpermissions from './pages/Listpermissions';
import Addpermissionmodule from './pages/Addpermissionmodule';
import Editpermissionmodule from './pages/Editpermissionmodule';

import Zipcodes from './pages/Zipcodes';
import Addzipcode from './pages/Addzipcode';
import Editzipcode from './pages/Editzipcode';

import Modules from './pages/Modules';
import Addmodule from './pages/Addmodule';
import Editmodule from './pages/Editmodule';

import logo from './assets/images/logo_2.png'

import { getStyles, getToken, removeUserSession, setUserSession, getApplicationSetting, getLocation, getGeneral, getDistance, getLatitude, getLongitude, getNotification } from './Utils/Common';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import Logs from './pages/Logs';
import General from './pages/General';

import Reset from './pages/Reset';
import Products from './pages/Products';
import Addproduct from './pages/Addproduct';
import Editproduct from './pages/Editproduct';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  
  useEffect(() => {
    sessionStorage.setItem('styles', JSON.stringify({menuWidth: '250px', collapsed: false}))
    
    getApplicationSetting()
    const token = getToken();
    if (!token) {
      return;
    }
    Api().get('token').then(responseToken => {
      setUserSession(token, responseToken.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
    
  }, []);


  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  if( !getToken() )
  {
    history.push('/login')
  }
  return (
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/reset/:id" component={Reset} />
          <PublicRoute path="/login" component={Login} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
    
          <PrivateRoute path="/modules" component={Modules} />
          <PrivateRoute path="/addmodule" component={Addmodule} />
          <PrivateRoute path="/editmodule/:id" component={Editmodule} />

          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/adduser" component={Adduser} />
          <PrivateRoute path="/changepassworduser/:id" component={Changepassworduser} />
          <PrivateRoute path="/edituser/:id" component={Edituser} />

          <PrivateRoute path="/roles" component={Roles} />
          <PrivateRoute path="/addrole" component={Addrole} />
          <PrivateRoute path="/editrole/:id" component={Editrole} />

          <PrivateRoute path="/permissions" component={Permissions} />
          <PrivateRoute path="/listpermissions/:id" component={Listpermissions} />
          <PrivateRoute path="/addpermission" component={Addpermission} />
          <PrivateRoute path="/editpermission/:id" component={Editpermission} />
          <PrivateRoute path="/addpermissionmodule/:id" component={Addpermissionmodule} />
          <PrivateRoute path="/editpermissionmodule/:role_id/:id" component={Editpermissionmodule} />

          <PrivateRoute path="/zipcodes" component={Zipcodes} />
          <PrivateRoute path="/addzipcode" component={Addzipcode} />
          <PrivateRoute path="/editzipcode/:id" component={Editzipcode} />

          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/addproduct" component={Addproduct} />
          <PrivateRoute path="/editproduct/:id" component={Editproduct} />


          <PrivateRoute path="/changepassword" component={Changepassword} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/logs" component={Logs} />
          <PrivateRoute path="/general" component={General} />
          
          <PrivateRoute path="" component={Dashboard} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
