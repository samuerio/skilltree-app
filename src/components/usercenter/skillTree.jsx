import React, {Component} from 'react';
import SecMenu from './secMenu.jsx';
import Skills from '../usercenter/skills.jsx';

class SkillTree extends Component{
    render(){
        let {skills,fetchSkills,isFetching} = this.props;
        return(
            <div>
                <SecMenu />
                <div className="container"  >
                    <Skills skills={skills} isFetching={isFetching} fetchSkills={fetchSkills} />
                </div>
            </div>
        )
    }
}

export default SkillTree;