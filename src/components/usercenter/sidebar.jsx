import React, {Component} from 'react';
import {Link} from 'react-router';

class Sidebar extends Component{
    render(){
        let menus = [
            {
                type:'overview'
            },
            {
                name:'技能',
                type:'skilltree',
                iconClass : 'icon icon-tree'
            },
            {
                name:'任务',
                type:'task',
                iconClass : 'icon icon-task'
            }
        ]

        let {indexMenu,menuClick} = this.props;
        let $menu = null;
        return(<div className="sidebar">
            {
                $menu = menus.map(function(menu,index){
                    let itemClass = 'item';
                    if(indexMenu === menu.type){
                        itemClass += ' active';
                    }
                    if(menu.type === 'overview'){
                        return (
                            <a className={itemClass} onClick={()=>menuClick('overview')} key={index} ><img src="/src/assets/images/logo2.png" /></a>
                        )
                    }else{
                        return(
                            <a className={itemClass} onClick={()=>menuClick(menu.type)} key={index}>
                                <i className={menu.iconClass}></i>
                                <span className="menu-title">{menu.name}</span>
                            </a>
                        )
                    }
                })
            }
        </div>);
    }
}

//<div className="sidebar"  >
//    <a className="item active" onClick={()=>menuClick('overview')}>
//        <img src="/src/assets/images/logo2.png" />
//    </a>
//    <a className="item" onClick={()=>menuClick('skilltree')} >
//        <i className="icon icon-tree"></i>
//        <span className="menu-title" >技能</span>
//    </a>
//    <a className="item">
//        <i className="icon icon-task"></i>
//        <span className="menu-title" >任务</span>
//    </a>
//</div>


//<div className="sidebar">
//    <Link className="item active" to={'/user'}>
//        <img src="/src/assets/images/logo2.png" />
//    </Link>
//    <Link className="item" to={'/user/skilltrees/created'}>
//        <i className="icon icon-tree"></i>
//        <span className="menu-title" >技能</span>
//    </Link>
//    <Link className="item" to={'/user/tasks'} >
//        <i className="icon icon-task"></i>
//        <span className="menu-title" >任务</span>
//    </Link>
//</div>

export default Sidebar;