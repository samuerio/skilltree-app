import React, {Component} from 'react';
import {Row,Col} from 'antd';
import Card from '../card.jsx';
import Loading from '../loading.jsx';

class Group extends Component {
    render(){
        let {skills,isFetching} = this.props;
        if(isFetching){
            return <Loading />
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
        let{fetchSkills,skills,isFetching} = newProps;
        if((!skills.data || skills.data.length) === 0 && isFetching === false){
            fetchSkills(skills.filter);
        }
    }
}

export default Group;
