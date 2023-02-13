import Api from '../config/Api';
import { toast } from 'react-toastify';
import * as geolib from 'geolib';
require('dotenv').config()

const mongoose = require('mongoose');

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

export const getStyles = () => {
  const menuStyle = sessionStorage.getItem('styles');
  if (menuStyle) return JSON.parse(menuStyle);
  else return null;
}

export const getPermissions = () => {
  const user = getUser();
  if (user) return user.role_id.role;
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}
export const getLatitude = () => {
  return sessionStorage.getItem('latitude') || null;
}
export const getLongitude = () => {
  return sessionStorage.getItem('longitude') || null;
}

export const getLocation =  () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
      sessionStorage.setItem('latitude', position.coords.latitude)
      sessionStorage.setItem('longitude', position.coords.longitude)
    })
  } else {
    toast.error('Geolocation is not supported by your browser')
  }
}
export const getNotification = async () => {
  if (!("Notification" in window)) {
    console.log("Browser does not support desktop notification");
  } else {
    Notification.requestPermission();
  }
}
export const getGeneral =  () => {
  const generalStr = sessionStorage.getItem('general');
  if (generalStr) return JSON.parse(generalStr);
  else return null;
}

export const getDistance =  (lat1, lat2, long1, long2) => {
  return geolib.getDistance({ latitude: lat1, longitude: long1 }, { latitude: lat2, longitude: long2 })
}

export const getApplicationSetting = async () => {
  await Api().get('generals').then(respGeneral => {
    console.log(respGeneral);
    sessionStorage.setItem('general', JSON.stringify(respGeneral.data))
  })
}

export const getPath = () => {
  const pathURL = window.location.pathname.split('/');
  return pathURL[1];
}


// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('general');
  sessionStorage.removeItem('latitude');
  sessionStorage.removeItem('longitude');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const setTabActive = (tab) => {
  sessionStorage.setItem('tabActive', tab);
}

export const getTabActive = () => {
  const tab = sessionStorage.getItem('tabActive');
  if (tab) return tab;
  else return null;
}

export const checkPermissions = async () => {
  const menu = getPath();
  const user = getUser();
  if( !user )
  {
    return null;
  }

  if( menu !== 'logs' )
  {
    let formData = new FormData();
    formData.append('module', menu); 
    formData.append('method', 'GET'); 
    formData.append('source', 'ADMIN'); 
    formData.append('request_id', ''); 
    formData.append('access_url', window.location.pathname); 
    formData.append('lat', sessionStorage.getItem('latitude')); 
    formData.append('long', sessionStorage.getItem('longitude')); 
    let formObject = Object.fromEntries(formData.entries());
    
    console.log(formObject)
    await Api().post('activitys', formObject)
  }
  

  let distance = getDistance(JSON.parse(sessionStorage.getItem('general')).latitude, sessionStorage.getItem('latitude'), JSON.parse(sessionStorage.getItem('general')).longitude, sessionStorage.getItem('longitude'));
  
  if( user.allow_remote === false && JSON.parse(sessionStorage.getItem('general')).radius < distance )
  {
    if( user.role_id.role === 'su' )
    {
      return sessionStorage.getItem('token');
    }
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('general');
    sessionStorage.removeItem('latitude');
    sessionStorage.removeItem('longitude');
    return null
  }
  else
  {
    if( user.role_id.role === 'su' )
    {
      return sessionStorage.getItem('token');
    }
    else
    {
      if( menu === '' || menu === 'dashboard' || menu === 'profile' || menu === 'changepassword' )
      {
        return sessionStorage.getItem('token');
      }
      else{
        if( user.permissions && user.permissions.find(element => element.page_id.source === 'ADMIN' && element.page_id.path === menu  ) )
        {
          return sessionStorage.getItem('token');
        }
        return null
      }
    }
  }
}

export const checkMenu = ( menu ) => {
  const user = getUser();
  if( !user )
  {
    return null;
  }
  
  if( user.role_id.role === 'su' )
  {
    return sessionStorage.getItem('token');
  }
  else
  {
    if( user.permissions && user.permissions.find(element => element.page_id.source === process.env.REACT_APP_PERMISSIONS_SOURCE && element.page_id.path === menu  ) )
    {
      return sessionStorage.getItem('token');
    }
  }
}
