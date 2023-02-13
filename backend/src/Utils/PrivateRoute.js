import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken, checkPermissions } from './Common';
import history from './History'

function PrivateRoute({ component: Component, ...rest }) {
  
  return (
    <Route
      {...rest}
      // render={(props) => checkPermissions()  ? <Component {...props} /> : history.push('/login')}
      render={(props) => checkPermissions()  ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;