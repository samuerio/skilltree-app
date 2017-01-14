import React,{Component} from 'react';
import SkillInfoForm from './form.jsx';
import SkillCanvas from './canvas.jsx';
import Icon from '../common/icon.jsx';
import Tabs from '../layout/tabs/index.jsx';


class Designer extends Component{

    render(){
        let {form,designer,designerTabClick,addFieldVal,saveCanvasData} = this.props;

        return(
            <Tabs defaultActiveAlias={designer.indexTab} onChange={(alias)=>designerTabClick(alias)} >
                <Tabs.TabPane  tab={<span><Icon type="info" />基本信息</span>}  alias = 'info' >
                    <SkillInfoForm {...{designer,addFieldVal}}  formData={form} />
                </Tabs.TabPane>
                <Tabs.TabPane  tab={<span><Icon type="puzzle" />设计器</span>}  alias = 'canvas' >
                    <SkillCanvas  {...{designer,saveCanvasData}}
                        isVisible={designer.indexTab === 'canvas'? true : false} />
                </Tabs.TabPane>
            </Tabs>
        )
    }


    /**
     * 当设计器销毁时,删除form上的设计器表单字段
     */
    componentWillUnmount(){
        let {removeField,saveCanvasData} = this.props;
        ['name','description'].map(function(fieldName){
            removeField(fieldName);
        });
        //重置Canvas参数
        saveCanvasData({
            x:"0",
            y:"0",
            width:"1000",
            height:"1000"
        },[]);
    }
}

export default Designer;