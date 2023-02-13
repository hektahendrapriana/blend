import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ProSidebarProvider } from 'react-pro-sidebar';

require('dotenv').config()

ReactDOM.render(
    <ProSidebarProvider>
        <App />
    </ProSidebarProvider>
, document.getElementById('root'));