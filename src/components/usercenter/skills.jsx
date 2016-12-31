import React, {Component} from 'react';
import {Row,Col} from 'antd';
import Card from './card.jsx';

class Skills extends Component {
    render(){
        let {skills,isFetching} = this.props;
        if(isFetching){
            return <div>正在获取数据,请稍等...</div>
        }

        let skillGroup = {
            0:[],
            1:[],
            2:[]
        }
        if(skills.data && skills.data.length !== 0){
            skills.data.map(function(skill,idx){
                skillGroup[`${idx%3}`].push(<Card key={idx} title={skill.name} />);
            });
        }
        return(
            <div className="my-skills">
                <div className="header">
                    我的技能
                    <a  className="more-link" >查看所有</a>
                    <a  className="more-link">+创建技能&nbsp;</a>
                </div>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8} >
                        {skillGroup['0']}
                    </Col>
                    <Col className="gutter-row" span={8} >
                        {skillGroup['1']}
                    </Col>
                    <Col className="gutter-row" span={8} >
                        {skillGroup['2']}
                    </Col>
                </Row>
            </div>
        );
    }
    componentWillMount(){
        let{fetchSkills,skills} = this.props;
        console.log(this.props);
        fetchSkills(skills.filter);
    }
}

export default Skills;
