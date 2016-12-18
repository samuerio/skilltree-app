import React,{Component} from 'react';

class SideBar extends Component{
    render(){
        return (
            <div className="sidebar">
                <div className="sidebar-logo">
                    <a href="http://www.creative-tim.com" className="simple-text">
                        Creative Tim
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img src="/src/assets/images/faces/avatar.jpg" />
                        </div>
                    </div>
                    <ul className="nav nav-pills nav-pills-rose nav-stacked">
                        <li className="active"><a href="#tab1" data-toggle="tab">技能树</a></li>
                        <li><a href="#tab2" data-toggle="tab">任务</a></li>
                    </ul>
                </div>
                <div className="sidebar-background"></div>
            </div>
        );
    }
}

export default SideBar;