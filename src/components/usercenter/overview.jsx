import React, {Component} from 'react';
import Projects from './projects.jsx';
import Tasks from './tasks.jsx';
import Activitys from './activitys.jsx';
import {Row,Col} from 'antd';

class Overivew extends Component{
    render(){
        return(
            <section className="user-index">
                <Row gutter={16} >
                    <Col className="gutter-row" span={15} >
                        <Projects />
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