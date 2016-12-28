import React, {Component} from 'react';
import {Link} from 'react-router';

class Sidebar extends Component{
    render(){
        return(
            <div className="sidebar">
                <Link className="item active" to={'/user'}>
                    <img src="/src/assets/images/logo2.png" />
                </Link>
                <Link className="item" to={'/user/skilltrees/created'}>
                    <i className="icon icon-tree"></i>
                    <span className="menu-title" >技能</span>
                </Link>
                <Link className="item" to={'/user/tasks'} >
                    <i className="icon icon-task"></i>
                    <span className="menu-title" >任务</span>
                </Link>
            </div>
        );
    }
}

//<div className="sidebar">
//    <a className="item active">
//        <img src="/src/assets/images/logo2.png" />
//    </a>
//    <a className="item">
//        <i className="icon icon-tree"></i>
//        <span className="menu-title" >技能</span>
//    </a>
//    <a className="item">
//        <i className="icon icon-task"></i>
//        <span className="menu-title" >任务</span>
//    </a>
//</div>

export default Sidebar;