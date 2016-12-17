import React,{Component} from 'react';
import NavBar from './navbar.jsx';
import SkillCard from './skillCard.jsx';

class ContentArea extends Component{
    render(){
        return(
            <div className="content">
                <NavBar/>
                <div className="cards">
                    <div className="row">
                        <div className="col-md-4">
                            <SkillCard renderClass = "content-success" />
                            <SkillCard renderClass = "content-info" />
                            <SkillCard />
                        </div>
                        <div className="col-md-4">
                            <SkillCard renderClass = "content-success" />
                        </div>
                        <div className="col-md-4">
                            <SkillCard renderClass = "content-info" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentArea;