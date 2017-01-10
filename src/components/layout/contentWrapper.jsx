import React,{Component} from 'react';

class ContentWrapper extends Component{
    render(){
        return( <div className="wrapper">
            {this.props.children}
        </div>)
    }
}

export default ContentWrapper;