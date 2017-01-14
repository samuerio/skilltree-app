import React, {Component} from 'react';
import {Row,Col} from 'antd';
import Card from '../card.jsx';
import Loading from '../loading.jsx';

class Group extends Component {

    componentWillMount(){
        let{fetchSkills,filter} = this.props;
        fetchSkills(filter);
    }

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

    /**
     * 当filter有变动时,则重新获取skills数据
     * @param newProps
     */
    componentWillReceiveProps(newProps){
        let{fetchSkills,isFetching,filter} = newProps;
        if(filter !== this.props.filter  && isFetching === false){
            fetchSkills(filter);
        }
    }
}

export default Group;
