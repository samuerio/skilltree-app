import React, {Component} from 'react';

class Header extends Component{
    render(){
        let {title} = this.props;
        return(
            <div className="header">
                {title}
                {this.props.children}
            </div>
        )
    }
}

export default Header;