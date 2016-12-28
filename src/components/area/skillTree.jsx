import React, {Component} from 'react';
import SecMenu from './secMenu.jsx';
import Projects from '../usercenter/projects.jsx';

class SkillTree extends Component{
    render(){
        return(
            <div>
                <SecMenu />
                <div className="container" >
                    <Projects />
                </div>
            </div>
        )
    }
}

export default SkillTree;