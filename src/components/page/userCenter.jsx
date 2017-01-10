import React, {Component} from 'react';

import NavBar from '../layout/navbar.jsx';
import Overview from '../content/overview.jsx';
import SkillTree from '../content/skillTree.jsx';

import Sidebar from '../layout/sidebar/index.jsx';
import Icon from '../common/icon.jsx';
import ContentWrapper from '../layout/contentWrapper.jsx';


class UserCenter extends Component{

    constructor(props) {
        super(props);
        this.sideBarClick = this.sideBarClick.bind(this);
    }

    sideBarClick(alias){
        let {menuClick,skillFilter} = this.props;
        menuClick(alias);
        switch(alias){
            case 'overview':
                skillFilter('own');
                break;
            case 'skilltree':
                skillFilter('all');
                break;
        }
    }

    render(){
        //States
        let {form,isFetching,userCenter} = this.props;
        //Dispatchs
        let {menuClick,fetchSkills,skillFilter,designerTabClick,
            addFieldVal,removeField,saveCanvasData} = this.props;

        let {indexMenu,skills,designer} = userCenter;
        let content = null,contentProps = null;
        switch (indexMenu){
            case 'overview':
                contentProps  = {skills,isFetching,fetchSkills,skillFilter,
                    menuClick,designerTabClick}
                content = <Overview {...contentProps} />;
                break;
            case 'skilltree':
                contentProps = {skills,designer,isFetching,form,
                    addFieldVal,removeField,fetchSkills,skillFilter,designerTabClick,saveCanvasData}
                content = <SkillTree {...contentProps} />;
        }

        return (
            <div>
                <NavBar />
                <Sidebar selectedKey={indexMenu}  onClick={this.sideBarClick} >
                    <Sidebar.Item alias="overview">
                        <img src='/src/assets/images/logo2.png' />
                    </Sidebar.Item>
                    <Sidebar.Item alias="skilltree">
                        <Icon type="tree" /><span className="menu-title">技能</span>
                    </Sidebar.Item>
                    <Sidebar.Item alias="task">
                        <Icon type="task" /><span className="menu-title">任务</span>
                    </Sidebar.Item>
                </Sidebar>
                <ContentWrapper>
                    {content}
                </ContentWrapper>
            </div>
        )
    }
}


export default UserCenter;