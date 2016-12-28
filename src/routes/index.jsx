import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import UserCenter from '../components/usercenter/userCenter.jsx';
import Overview from '../components/usercenter/overview.jsx';
import SkillTree from '../components/area/skillTree.jsx';



class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}


let routes = (
    <Route path='/' component={App} >
        <Route path='user' component= {UserCenter}>
            <IndexRoute component={Overview} />
            <Route path='skilltrees/:state' component={SkillTree} />
        </Route>
    </Route>
);

/*
 <IndexRoute component={UserCenter} />
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