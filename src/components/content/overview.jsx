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
        let {skillFilter,designerTabClick} = this.props;
        //1.切换到skilltree的sidebar栏
        this.context.router.push('/user/'+SIDEBAR_ALIAS.skilltrees);
        //2.skill的filter调整为create
        skillFilter('create');
        //3.设计器的Tab栏调整为info Tab栏
        designerTabClick('info');
    }

    componentWillMount(){
        let {skillFilter} = this.props
        skillFilter('own');
    }

    render(){
        let {skills,isFetching,fetchSkills} = this.props;

        return(
            <section className="user-index">
                <Row gutter={16} >
                    <Col className="gutter-row" span={15} >
                        <Skills >
                            <Skills.Header title='我的技能'>
                                <a  className="more-link" >查看所有</a>
                                <a  className="more-link" onClick={this.createSkill}>+创建技能&nbsp;</a>
                            </Skills.Header>
                            <Skills.Group {...{skills,isFetching,fetchSkills}} />
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