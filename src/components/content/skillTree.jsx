import React, {Component} from 'react';
import StateMenu from '../stateMenu.jsx';
import SkillGroup from '../common/skillGroup.jsx';
import SkillDesigner from '../designer/skillDesigner.jsx'

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
                <StateMenu skillFilter = {skillFilter} filter={skills.filter} designerTabClick={designerTabClick} />
                <div className="container"  >
                    {$content}
                </div>
            </div>
        )
    }
}

export default SkillTree;