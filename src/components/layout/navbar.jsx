import React, {Component} from 'react';

class NavBar extends Component{
    render(){
        return(
            <div className="navbar">
                <a className="inline-block" href="https://developer.mozilla.org" >
                    <img src="/src/assets/images/logo.png" style={{height:'60px'}} />
                </a>
            </div>
        )
    }
}

export default NavBar;