import React, {Component} from 'react';
import SkillGroup from '../common/skillGroup.jsx';
import SkillDesigner from '../designer/skillDesigner.jsx'
import Icon from '../common/icon.jsx';
import StateMenu from '../stateMenu/index.jsx';

class SkillTree extends Component{
    render(){
        let {form,designer,skills,fetchSkills,isFetching,
            skillFilter,designerTabClick,addFieldVal,removeField,saveCanvasData} = this.props;
        let $content = null;
        if(skills.filter === 'create'){
            $content = <SkillDesigner
                designer={designer}
                designerTabClick={designerTabClick}
                form={form}
                addFieldVal = {addFieldVal}
                removeField = {removeField}
                saveCanvasData = {saveCanvasData}
            />
        }else{
            $content = (
                <div className="my-skills">
                    <div className="header">
                        由我创建
                    </div>
                    <SkillGroup skills={skills} isFetching={isFetching} fetchSkills={fetchSkills} />
                </div>
            );
        }
        return(
            <div>
                <StateMenu selectedAlias={skills.filter} onClick={(alias)=>{
                    skillFilter(alias);
                }}  >
                    <StateMenu.Header title='技能' desc='按我创建的、参与的和归档的技能分类' addable onAdd={()=>{
                        skillFilter('create');
                        designerTabClick('info');
                    }} />
                    <StateMenu.Item alias="all">
                        <Icon type="tree" /><span>所有技能</span>
                    </StateMenu.Item>
                    <StateMenu.Item alias="own">
                        <Icon type="edit" /><span>由我创建</span>
                    </StateMenu.Item>
                </StateMenu>
                <div className="container"  >
                    {$content}
                </div>
            </div>
        )
    }
}

export default SkillTree;