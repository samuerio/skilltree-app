import React , {Component} from 'react';

class Icon extends Component{
    render(){
        let {type} = this.props;
        return(<i className={`icon icon-${type}`}></i>)
    }
}

export default Icon;