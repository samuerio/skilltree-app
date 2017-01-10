import React, {Component} from 'react';
import SkillDesigner from '../designer/skillDesigner.jsx'
import Icon from '../common/icon.jsx';
import StateMenu from '../layout/stateMenu/index.jsx';
import Skills from '../common/skills/index.jsx'

class SkillTree extends Component{

    constructor(props) {
        super(props);
        this.addSkill = this.addSkill.bind(this);
    }

    addSkill(){
        let {skillFilter,designerTabClick} = this.props;
        skillFilter('create');
        designerTabClick('info');
    }

    render(){
        let {form,designer,skills,fetchSkills,isFetching,
            skillFilter,designerTabClick,addFieldVal,removeField,saveCanvasData} = this.props;

        let content ,contentProps ;
        if(skills.filter === 'create'){
            contentProps = {designer,form,
                designerTabClick,addFieldVal,removeField,saveCanvasData}
            content = <SkillDesigner {...contentProps} />
        }else{
            contentProps = {skills,isFetching,fetchSkills}
            const titleMap = {
                'all':'所有技能',
                'own':'由我创建'
            }
            content = (
                <Skills>
                    <Skills.Header title={titleMap[skills.filter]} />
                    <Skills.Group {...contentProps} />
                </Skills>
            );
        }
        return(
            <div>
                <StateMenu selectedAlias={skills.filter} onClick={(alias)=>{
                    skillFilter(alias);
                }}  >
                    <StateMenu.Header title='技能' desc='按我创建的、参与的和归档的技能分类' addable onAdd={this.addSkill} />
                    <StateMenu.Item alias="all">
                        <Icon type="tree" /><span>所有技能</span>
                    </StateMenu.Item>
                    <StateMenu.Item alias="own">
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

export default SkillTree;