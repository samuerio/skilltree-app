import React, {Component} from 'react';

import NavBar from '../navbar.jsx';
import Overview from '../content/overview.jsx';
import SkillTree from '../content/skillTree.jsx';

import Sidebar from '../sidebar/index.jsx';
import Icon from '../common/icon.jsx';


class UserCenter extends Component{

    render(){
        let {form,isFetching,userCenter,menuClick,fetchSkills,
            skillFilter,designerTabClick,addFieldVal,removeField,saveCanvasData} = this.props;
        let {indexMenu,skills,designer} = userCenter;

        let children = null;
        switch (indexMenu){
            case 'overview':
                children = <Overview skills={skills} isFetching={isFetching}
                                     fetchSkills={fetchSkills}
                                     skillFilter={skillFilter}
                                     menuClick={menuClick}
                                     designerTabClick = {designerTabClick} />;
                break;
            case 'skilltree':
                children = <SkillTree
                    skills={skills}
                    designer = {designer}
                    isFetching={isFetching}
                    form={form}
                    addFieldVal = {addFieldVal}
                    removeField = {removeField}
                    fetchSkills={fetchSkills}
                    skillFilter={skillFilter}
                    designerTabClick = {designerTabClick}
                    saveCanvasData = {saveCanvasData}
                />;
        }

        return (
            <div>
                <NavBar />
                <Sidebar selectedKey={indexMenu}  onClick={(alias)=>{
                    menuClick(alias);
                    switch(alias){
                        case 'overview':
                            skillFilter('own');
                            break;
                        case 'skilltree':
                            skillFilter('all');
                            break;
                    }
                }} >
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
                <div className="wrapper">
                    {children}
                </div>
            </div>
        )
    }
}


export default UserCenter;