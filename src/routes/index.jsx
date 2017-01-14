import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import UserCenter from '../container/userCenter.jsx';
import SkillCenter from '../container/skillCenter.jsx';
import Overview from '../components/content/overview.jsx';
import SkillTrees from '../components/content/skillTrees.jsx';



class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}


let routes = (
    <Route path='/' component={App} >
        <Route path='user' component= {UserCenter} >
            <IndexRoute component={Overview} />
            <Route path='/user/skilltrees' component={SkillTrees} />
            <Route path='/user/skilltrees/(:state)' component={SkillTrees} >
                <IndexRoute component={Overview} />
            </Route>
        </Route>
        <Route path='u/:username/s/:skillname/' component={SkillCenter} />
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