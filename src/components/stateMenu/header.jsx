import React,{Component} from 'react';
import Icon from '../common/icon.jsx'

class Header extends Component{
    render(){
        let{title,desc,addable,onAdd} = this.props;
        let addButton = <a onClick={onAdd} ><Icon type='plus'/></a>;
        return(
            <header>
                {title}
                {addable && addButton}
                <article>
                    {desc}
                </article>
            </header>
        );
    }
}

export default Header;