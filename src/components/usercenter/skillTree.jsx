import React, {Component} from 'react';
import SecMenu from './secMenu.jsx';
import SkillGroup from '../usercenter/skillGroup.jsx';

class SkillTree extends Component{
    render(){
        let {skills,fetchSkills,isFetching,skillFilter} = this.props;
        return(
            <div>
                <SecMenu skillFilter = {skillFilter} filter={skills.filter} />
                <div className="container"  >
                    <div className="my-skills">
                        <div className="header">
                            由我创建
                        </div>
                        <SkillGroup skills={skills} isFetching={isFetching} fetchSkills={fetchSkills} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SkillTree;