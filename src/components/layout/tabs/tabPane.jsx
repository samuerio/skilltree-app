import React,{Component} from 'react';

class TabPane extends Component{
    render(){
        let {defaultActiveAlias,alias} = this.props;
        let hideClass = defaultActiveAlias !== alias ? 'hide' : '';

        return(
            <div className={hideClass}>
                {this.props.children}
            </div>
        );
    }
}

export default TabPane;