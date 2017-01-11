import React,{Component} from 'react';
import Nav from './nav.jsx';

class Tabs extends Component{

    constructor(props){
        super(props);
        //根据props来初始化State状态
        let {defaultActiveAlias,onChange} = props;
        this.state = {
            defaultActiveAlias,
            onChange
        }
        this.tabClick = this.tabClick.bind(this);
    }

    tabClick(alias){
        this.setState({
            defaultActiveAlias:alias
        })
    }

    render(){
        let {defaultActiveAlias,onChange} = this.state;
        let navs = [];
        let _self = this;

        let childrenWithProps = React.Children.map(this.props.children,(child) => {
            let {alias,tab} = child.props;
            navs.push(<Nav {...{defaultActiveAlias,alias,onChange}} navClick={_self.tabClick} key={alias} >{tab}</Nav>)
            return React.cloneElement(child, {
                        defaultActiveAlias
            })
        });

        return(
            <div className="designer">
                <div className="designer-nav-wrapper">
                    <nav className="designer-nav">
                        {navs}
                    </nav>
                </div>
                {childrenWithProps}
            </div>
        )
    }

    componentWillReceiveProps(newProps) {
        let {defaultActiveAlias,onChange} = newProps
        this.setState({
            defaultActiveAlias,onChange
        });
    }
}

export default Tabs;