import React, {Component} from 'react';
import SecMenu from './secMenu.jsx';
import Skills from '../usercenter/skills.jsx';

class SkillTree extends Component{
    render(){
        return(
            <div>
                <SecMenu />
                <div className="container" >
                    <Skills />
                </div>
            </div>
        )
    }
}

export default SkillTree;