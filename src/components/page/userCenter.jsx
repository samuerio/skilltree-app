import React, {Component} from 'react';

import NavBar from '../navbar.jsx';
import Sidebar from '../sidebar.jsx';
import Overview from '../content/overview.jsx';
import SkillTree from '../content/skillTree.jsx';

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
                <Sidebar indexMenu={indexMenu} menuClick={menuClick}  skillFilter={skillFilter}  />
                <div className="wrapper">
                    {children}
                </div>
            </div>
        )
    }
}

export default UserCenter;