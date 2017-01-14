import React, {Component,PropTypes} from 'react';

import NavBar from '../layout/navbar.jsx';
import Overview from '../content/overview.jsx';
import SkillTrees from '../content/skillTrees.jsx';

import Sidebar from '../layout/sidebar/index.jsx';
import Icon from '../common/icon.jsx';
import ContentWrapper from '../layout/contentWrapper.jsx';


export const SIDEBAR_ALIAS = {
    overview:'overview',
    skilltrees:'skilltrees',
    tasks:'tasks'
}


class UserCenter extends Component{

    constructor(props) {
        super(props);
        this.sideBarClick = this.sideBarClick.bind(this);
    }

    sideBarClick(alias){
        switch(alias){
            case SIDEBAR_ALIAS.overview:
                this.context.router.push('/user');
                break;
            case SIDEBAR_ALIAS.skilltrees:
                this.context.router.push('/user/'+alias);
                break;
        }
    }

    render(){
        //States
        let {form,isFetching,userCenter} = this.props;
        //Dispatchs
        let {fetchSkills,skillFilter,designerTabClick,
                        addFieldVal,removeField,saveCanvasData} = this.props;

        let indexMenu;//来源于路由,由路由维护
        let {skills,designer} = userCenter;

        let childrenWithProps = React.Children.map(this.props.children,(child)=>{
            let typeName = child.type.name;
            indexMenu = typeName.toLowerCase();
            switch(typeName){
                case 'Overview':
                    return React.cloneElement(child,
                        {skills,isFetching,fetchSkills,skillFilter,designerTabClick});
                case  'SkillTrees':
                    return React.cloneElement(child,
                        {skills,designer,isFetching,form,
                            addFieldVal,removeField,fetchSkills,skillFilter,designerTabClick,saveCanvasData});
            }
        });
        return (
            <div>
                <NavBar />
                <Sidebar selectedKey={indexMenu}  onClick={this.sideBarClick} >
                    <Sidebar.Item alias={SIDEBAR_ALIAS.overview}>
                        <img src='/src/assets/images/logo2.png' />
                    </Sidebar.Item>
                    <Sidebar.Item alias={SIDEBAR_ALIAS.skilltrees}>
                        <Icon type="tree" /><span className="menu-title">技能</span>
                    </Sidebar.Item>
                    <Sidebar.Item alias={SIDEBAR_ALIAS.tasks}>
                        <Icon type="task" /><span className="menu-title">任务</span>
                    </Sidebar.Item>
                </Sidebar>
                <ContentWrapper>
                    {childrenWithProps}
                </ContentWrapper>
            </div>
        )
    }
}

UserCenter.contextTypes = {
    router: PropTypes.object.isRequired
};


export default UserCenter;

