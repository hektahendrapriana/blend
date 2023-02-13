import React, {Component} from 'react';
import Header from './Header';
import SideBar from './SideBar';

export default class DefaultLayout extends Component {
    render(){
        return (
            <>
                {/* <Header /> */}
                <SideBar />
            </>
        )
    }
}