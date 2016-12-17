import React, {Component} from 'react';
import SideBar from './sidebar.jsx';
import StateMenu from './stateMenu.jsx';
import ContentArea from './contentArea.jsx';

class UserCenter extends Component{
    render(){
        return (
            <div>
                <SideBar  />
                <div className="wrapper">
                    <StateMenu />
                    <ContentArea />
                </div>
            </div>
        )
    }
}

export default UserCenter;