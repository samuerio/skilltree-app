import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import UserCenter from '../container/usercenter.jsx';
//import SkillCenter from 'container/skilltreecenter.jsx';
//import SkillTreeArea from 'container/skilltreearea.jsx'
//import TasksArea from 'container/tasksarea.jsx'
//import TaskArea from 'container/taskarea.jsx'
//import AccountArea from 'container/accountarea.jsx'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


//class App extends Component {
//    render() {
//        return (
//            <div>{this.props.children}</div>
//        )
//    }
//}

const App = React.createClass({
    getInitialState() {
        return {
            current: 'mail',
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    },
    render() {
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="inline"
            >
                <Menu.Item key="mail">
                    <Icon type="mail" />Navigation One
                </Menu.Item>
                <Menu.Item key="app" disabled>
                    <Icon type="appstore" />Navigation Two
                </Menu.Item>
                <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                </Menu.Item>
            </Menu>
        );
    },
});

//let routes = (
//    <Route path='/' component={App} >
//        <IndexRoute component={UserCenter} />
//        <Route path='user/' component= {UserCenter} />
//    </Route>
//);
let routes = (
    <Route path='/' component={App} >
    </Route>
);

/*
 <Route path='user/' component= {UserCenter} />
     <Route path='skilltrees/:state' component={SkillTreeArea} />
     <Route path='tasks/:state' component={TasksArea} />
     <Route path='account' component={AccountArea} />
     </Route>
     <Route path='u/:username/s/:skilltreename/' component={SkillCenter}>
     <Route path="task/:taskId" component={TaskArea} />
     <Route path="tasks/:state" component={TasksArea} />
 </Route>
 */

export default routes;