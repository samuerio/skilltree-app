import React, {Component,PropTypes} from 'react';
import Designer from '../designer/index.jsx'
import Icon from '../common/icon.jsx';
import StateMenu from '../layout/stateMenu/index.jsx';
import Skills from '../common/skills/index.jsx'


export const STATE_MENU_ALIAS = {
    all:'all',
    own:'own'
}

class SkillTrees extends Component{

    constructor(props) {
        super(props);
        this.addSkill = this.addSkill.bind(this);
        this.stateMenuClick = this.stateMenuClick.bind(this);
    }

    addSkill(){
        this.context.router.push('/user/skilltrees/create');
    }

    stateMenuClick(alias){
        this.context.router.push('/user/skilltrees/'+alias);
    }

    render(){
        let filter = this.props.params['filter'] || STATE_MENU_ALIAS.all;
        let {form,designer,skills,fetchSkills,isFetching,
                designerTabClick,addFieldVal,removeField,saveCanvasData} = this.props;

        let content ,contentProps ;
        if(filter === 'create'){
            contentProps = {designer,form,
                designerTabClick,addFieldVal,removeField,saveCanvasData}
            content = <Designer {...contentProps} />
        }else{
            contentProps = {skills,isFetching,fetchSkills}
            const titleMap = {
                [STATE_MENU_ALIAS.all]:'所有技能',
                [STATE_MENU_ALIAS.own]:'由我创建'
            }
            content = (
                <Skills>
                    <Skills.Header title={titleMap[filter]} />
                    <Skills.Group {...contentProps} filter={filter}/>
                </Skills>
            );
        }
        return(
            <div>
                <StateMenu selectedAlias={filter} onClick={this.stateMenuClick}  >
                    <StateMenu.Header title='技能' desc='按我创建的、参与的和归档的技能分类' addable onAdd={this.addSkill} />
                    <StateMenu.Item alias={STATE_MENU_ALIAS.all}>
                        <Icon type="tree" /><span>所有技能</span>
                    </StateMenu.Item>
                    <StateMenu.Item alias={STATE_MENU_ALIAS.own}>
                        <Icon type="edit" /><span>由我创建</span>
                    </StateMenu.Item>
                </StateMenu>
                <div className="container"  >
                    {content}
                </div>
            </div>
        )
    }
}

SkillTrees.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SkillTrees;