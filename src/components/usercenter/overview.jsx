import React, {Component} from 'react';
import Skills from './skills.jsx';
import Tasks from './tasks.jsx';
import Activitys from './activitys.jsx';
import {Row,Col} from 'antd';

class Overivew extends Component{
    render(){
        let {skills,isFetching,fetchSkills} = this.props;
        return(
            <section className="user-index">
                <Row gutter={16} >
                    <Col className="gutter-row" span={15} >
                        <Skills skills={skills}  isFetching={isFetching} fetchSkills={fetchSkills} />
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