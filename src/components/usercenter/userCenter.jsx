import React, {Component} from 'react';

import TopMenu from './topMenu.jsx';
import Sidebar from './sidebar.jsx';
import Overview from './overview.jsx';
import SkillTree from './skillTree.jsx';

class UserCenter extends Component{
    render(){
        let {isFetching,userCenter,menuClick,fetchSkills,skillFilter} = this.props;
        let {indexMenu,skills} = userCenter;

        let children = null;
        switch (indexMenu){
            case 'overview':
                children = <Overview skills={skills} isFetching={isFetching} fetchSkills={fetchSkills} />;
                break;
            case 'skilltree':
                children = <SkillTree
                    skills={skills}
                    isFetching={isFetching}
                    fetchSkills={fetchSkills}
                    skillFilter={skillFilter}
                />;
        }

        return (
            <div>
                <TopMenu />
                <Sidebar indexMenu={indexMenu} menuClick={menuClick}  skillFilter={skillFilter}  />
                <div className="wrapper">
                    {children}
                </div>
            </div>
        )
    }
}

export default UserCenter;