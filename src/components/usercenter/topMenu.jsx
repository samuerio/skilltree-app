import React, {Component} from 'react';

class TopMenu extends Component{
    render(){
        return(
            <div className="topMenu">
                <a href="https://developer.mozilla.org" >
                    <img src="/src/assets/images/logo.png" style={{height:'60px'}} />
                </a>
            </div>
        )
    }
}

export default TopMenu;