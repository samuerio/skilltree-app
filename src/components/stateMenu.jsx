import React,{Component} from 'react';

class StateMenu extends Component{
    render(){
        return(
            <div className="sec-menu">
                <header>技能中心</header>
                <div style={{paddingLeft:'25px'}} ><button className="btn btn-success btn-xs btn-round">创建技能</button></div>
                <ul className="nav nav-pills nav-pills-info nav-stacked">
                    <li className="active"><a href="#tab1" data-toggle="tab">所有技能</a></li>
                    <li><a href="#tab2" data-toggle="tab">我关注的</a></li>
                </ul>
                <div className="sep"></div>
            </div>
        );
    }
}

export default StateMenu;