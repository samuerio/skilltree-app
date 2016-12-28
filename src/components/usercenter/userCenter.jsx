import React, {Component} from 'react';

import TopMenu from './topMenu.jsx';
import Sidebar from './sidebar.jsx';

class UserCenter extends Component{
    render(){
        return (
            <div>
                <TopMenu />
                <Sidebar />
                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UserCenter;