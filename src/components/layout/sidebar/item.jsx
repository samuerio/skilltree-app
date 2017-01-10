import React,{Component} from 'react';

class Item extends Component{
    render(){
        let {onClick,selectedKey,alias} = this.props;
        let extraClass = selectedKey === alias ? 'active' : '';

        return (
        <a className={`item ${extraClass}`} onClick={()=>onClick(alias)} >
            {this.props.children}
        </a>)
    }
}

export default Item;