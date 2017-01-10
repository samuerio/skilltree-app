import React,{Component} from 'react';

class Item extends Component{
    render(){
        let {alias,selectedAlias,onClick} = this.props;
        let extraClass = selectedAlias === alias ? 'active' : '';
        return(
            <a  className={`item ${extraClass}`}  onClick={()=>onClick(alias)} >
                {this.props.children}
            </a>
        );
    }
}

export default Item;