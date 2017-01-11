import React,{Component} from 'react';

class Nav extends Component{
    render(){
        let {defaultActiveAlias,alias,onChange,navClick} = this.props;
        let extraClass = defaultActiveAlias === alias ? 'selected' : '';
        return(
            <span>
                <a className={`nav-item ${extraClass}`}
                   onClick={()=>{
                                navClick(alias);
                                defaultActiveAlias !== alias && onChange(alias);
                            }}>
                    {this.props.children}
                </a>
            </span>
        )
    }
}

export default Nav;