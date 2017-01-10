import React , {Component} from 'react';

class Sidebar extends Component{
    render(){
        let {selectedKey,onClick} = this.props;
        let childrenWithProps = React.Children.map(this.props.children,
            (child)=>React.cloneElement(child,{
                selectedKey:selectedKey,
                onClick:onClick
            })
        );
        return (<div className="sidebar">{childrenWithProps}</div>);
    }
}

export default Sidebar ;