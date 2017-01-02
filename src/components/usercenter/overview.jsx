import React, {Component} from 'react';
import SkillGroup from './skillGroup.jsx';
import Tasks from './tasks.jsx';
import Activitys from './activitys.jsx';
import {Row,Col} from 'antd';

class Overivew extends Component{
    render(){
        let {skills,isFetching,fetchSkills,skillFilter,menuClick,designerTabClick} = this.props;
        return(
            <section className="user-index">
                <Row gutter={16} >
                    <Col className="gutter-row" span={15} >
                        <div className="my-skills">
                            <div className="header">
                                我的技能
                                <a  className="more-link" >查看所有</a>
                                <a  className="more-link" onClick={()=>{skillFilter('create');menuClick('skilltree');designerTabClick('info');}}>+创建技能&nbsp;</a>
                            </div>
                            <SkillGroup skills={skills}  isFetching={isFetching} fetchSkills={fetchSkills} />
                        </div>
                        <Activitys />
                    </Col>
                    <Col className="gutter-row" span={9} >
                        <Tasks />
                    </Col>
                </Row>
            </section>
        );
    }
}

export default Overivew;
//<Skills skills={skills}  isFetching={isFetching} fetchSkills={fetchSkills} />