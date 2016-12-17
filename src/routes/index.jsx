import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import UserCenter from '../container/usercenter.jsx';
//import SkillCenter from 'container/skilltreecenter.jsx';
//import SkillTreeArea from 'container/skilltreearea.jsx'
//import TasksArea from 'container/tasksarea.jsx'
//import TaskArea from 'container/taskarea.jsx'
//import AccountArea from 'container/accountarea.jsx'


class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

let routes = (
    <Route path='/' component={App} >
        <IndexRoute component={UserCenter} />
    </Route>
);

/*
 <Route path='user/' component= {UserCenter} >
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