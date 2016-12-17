import React,{Component} from 'react';

class SkillCard extends Component{
    render(){
        let {renderClass} = this.props;
        renderClass += ' content';
        return(
            <div className="card">
                <div className= {renderClass} >
                    <h6 className="category text-danger">
                        <i className="material-icons">trending_up</i> Trending
                    </h6>

                    <h4 className="card-title">
                        <a href="#pablo">Java Core Skill</a>
                    </h4>

                    <div className="footer">
                        <div className="author">
                            <a href="#pablo">
                                <img src="/src/assets/img/faces/christian.jpg" alt="..." className="avatar img-raised" />
                                    <span>Lord Alex</span>
                            </a>
                        </div>
                        <div className="stats">
                            <i className="material-icons">favorite</i> 342 ·
                            <i className="material-icons">chat_bubble</i> 45
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SkillCard ;