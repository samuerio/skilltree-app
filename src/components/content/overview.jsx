import React, {Component,PropTypes} from 'react';
import Tasks from '../common/tasks.jsx';
import Activitys from '../common/activitys.jsx';
import Skills from '../common/skills/index.jsx';
import {Row,Col} from 'antd';
import {SIDEBAR_ALIAS} from '../page/userCenter.jsx';

class Overview extends Component{

    constructor(props) {
        super(props);
        this.createSkill = this.createSkill.bind(this);
    }

    createSkill(){
        this.context.router.push('/user/skilltrees/create');
    }

    render(){
        let {skills,isFetching,fetchSkills} = this.props;

        return(
            <section style={{margin:0,padding:'12px 20px'}}>
                <Row gutter={16} >
                    <Col className="gutter-row" span={15} >
                        <Skills >
                            <Skills.Header title='我的技能'>
                                <a  className="title-action" >查看所有</a>
                                <a  className="title-action" onClick={this.createSkill}>+创建技能&nbsp;</a>
                            </Skills.Header>
                            <Skills.Group {...{skills,isFetching,fetchSkills}} filter='own' />
                        </Skills>
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

Overview.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Overview;