import React, {Component} from 'react';
import {Row,Col} from 'antd';
import Card from './card.jsx';

class SkillGroup extends Component {
    render(){
        let {skills,isFetching} = this.props;
        console.log('render`s props: ');
        console.log(this.props);
        console.log(this);
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
        );
    }
    componentWillMount(){
        let{fetchSkills,skills} = this.props;
        fetchSkills(skills.filter);
    }

    /**
     * 当filter有变动时,重新获取skills数据
     * @param newProps
     */
    componentWillReceiveProps(newProps){
        let{fetchSkills} = newProps;
        console.log(this);
        console.log('newProps: ');
        console.log(newProps);
        console.log('oldProps: ');
        console.log(this.props);
        console.log(this.props === newProps);

        //fetchSkills(newProps.skills.filter);
    }
}

export default SkillGroup;
