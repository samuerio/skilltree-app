import React, {Component} from 'react';

class Skills extends Component{
    render(){
        return(
            <div className="my-skills">
                {this.props.children}
            </div>
        );
    }
}

export default Skills;