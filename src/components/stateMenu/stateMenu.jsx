import React,{Component} from 'react';

class StateMenu extends Component{
    render(){
        let {selectedAlias,onClick} = this.props;
        let childrenWithProps = React.Children.map(this.props.children,
            (child)=>React.cloneElement(child,{
                selectedAlias,onClick
            })
        )
        return(
            <div className="secMenu">{childrenWithProps}</div>
        );
    }
}

export default StateMenu;