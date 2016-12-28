import React, {Component} from 'react';
import {Row,Col} from 'antd';
import Card from './card.jsx';

class Projects extends Component {
    render(){
        return(
            <div className="my-projects">
                <div className="header">
                    我的技能
                    <a  className="more-link" >查看所有</a>
                    <a  className="more-link">+创建技能&nbsp;</a>
                </div>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8} >
                        <Card />
                    </Col>
                    <Col className="gutter-row" span={8} >
                        <Card />
                    </Col>
                    <Col className="gutter-row" span={8} >
                        <Card />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Projects;