import React,{Component} from 'react';
import {Button,Select,Input} from 'antd';
import SkillInfoForm from './skillInfoForm.jsx'
const Option = Select.Option;



import {initDesigner} from '../../designer/index';


class SkillDesigner extends Component{
    constructor(props) {
        super(props);
        //初始化画图对象的引用
        this.graph = null;
    }

    render(){
        let {form,designer,designerTabClick,addFieldVal,saveCanvasData} = this.props;
        let {indexTab} = designer;

        let $tabContent = <div>{indexTab+'的tab内容为空'}</div>;
        if(indexTab === 'canvas'){
            $tabContent = (
                <div>
                    <div className="header">
                        <Button type="ghost" onClick={()=>{

                            let viewBox = this.graph.gRenderer.paper.canvas.getAttribute('viewBox');
                            if(viewBox){
                                let paramArr = viewBox.split(" ");
                                viewBox = {
                                    x:paramArr[0],
                                    y:paramArr[1],
                                    width:paramArr[2],
                                    height:paramArr[3]
                                }
                            }else{
                                viewBox = {
                                    x:"0",
                                    y:"0",
                                    width:"1000",
                                    height:"1000"
                                }
                            }

                            let mindNodes = this.graph.getJSON();
                            saveCanvasData(viewBox,mindNodes);
                        }}>保存设计器配置</Button>
                        <Button type="ghost" onClick={()=>{
                            let graph = this.graph;
                             if(graph.selected){
                                graph.addNode(graph.selected, {});
                            }
                        }}>新增</Button>
                        <Button type="ghost" onClick={()=>{
                             let graph = this.graph;
                              if(graph.selected){
                                    if(graph.selected.isRootNode()){
                                        console.log('cannot cancel root node');
                                    }else{
                                        graph.removeNode(graph.selected);
                                        graph.setSelected(null);
                                    }
                                }
                        }}>删除</Button>
                    </div>
                    <div style={{backgroundColor:'rgb(242, 242, 242)',marginTop:'10px',position:'relative'}} >
                        <canvas id="designer_grids"></canvas>
                        <div id="mindmap-canvas" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%'}}></div>
                    </div>
                </div>
            );
        }else  if(indexTab === 'info'){
            $tabContent = (<SkillInfoForm designer={designer} formData={form} addFieldVal={addFieldVal} submitSkillInfo={this.submitSkillInfo} />);
        }

        return(
            <div className="designer">
                <div className="designer-nav-wrapper">
                    <nav className="designer-nav">
                                <span>
                                    <a className={indexTab === 'info' ? 'nav-item selected' : 'nav-item'}
                                                onClick={
                                                    ()=>(indexTab !== 'info') && designerTabClick('info')
                                                }>
                                        <i className="icon icon-info"></i><span>基本信息</span>
                                    </a>
                                </span>
                                <span>
                                    <a className={indexTab === 'canvas' ? 'nav-item selected' : 'nav-item'}
                                                onClick={()=>designerTabClick('canvas')} >
                                        <i className="icon icon-puzzle"></i><span>设计器</span>
                                    </a>
                                </span>
                    </nav>
                </div>
                {$tabContent}
            </div>
        )
    }

    /**
     * 当indexTab为canvas时,要进行设计器的初始化
     * @param newProps
     */
    componentDidUpdate(){
        let {indexTab,data} = this.props.designer;
        let {viewBox,mindNodes} = data;
        if(indexTab === 'canvas'){
            //初始化设计器
            this.graph = initDesigner(viewBox,mindNodes);
        }else{
            this.graph = null;
        }
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

export default SkillDesigner;