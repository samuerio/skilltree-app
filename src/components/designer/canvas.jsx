import React,{Component} from 'react';
import {Button,Select,Input,message} from 'antd';
import {initDesigner} from '../../designer/index';

class Canvas extends Component{

    constructor(props){
        super(props);
        //初始化画图对象的引用
        this.graph = null;
        this.saveConfig = this.saveConfig.bind(this);
        this.addMindNode = this.addMindNode.bind(this);
        this.deleteMindNode = this.deleteMindNode.bind(this);
    }

    saveConfig(){
        let {saveCanvasData} = this.props;
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
        message.success('配置保存成功!');
    }

    addMindNode(){
        let graph = this.graph;
        if(graph.selected){
            graph.addNode(graph.selected, {});
        }
    }

    deleteMindNode(){
        let graph = this.graph;
        if(graph.selected){
            if(graph.selected.isRootNode()){
                console.log('cannot cancel root node');
            }else{
                graph.removeNode(graph.selected);
                graph.setSelected(null);
            }
        }
    }

    render(){
        return(
            <div>
                <div className="header">
                    <Button type="ghost" onClick={this.saveConfig}>保存设计器配置</Button>
                    <Button type="ghost" onClick={this.addMindNode}>新增</Button>
                    <Button type="ghost" onClick={this.deleteMindNode}>删除</Button>
                </div>
                <div style={{backgroundColor:'rgb(242, 242, 242)',marginTop:'10px',position:'relative'}} >
                    <canvas id="designer_grids"></canvas>
                    <div id="mindmap-canvas" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%'}}></div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //初始化设计器
        let {viewBox,mindNodes} = this.props.designer.data;
        if(this.props.isVisible){//若Canvas为未隐藏状态则进行初始化
            this.graph = initDesigner(viewBox,mindNodes);
        }
    }

    componentDidUpdate(){
        //初始化设计器
        let {viewBox,mindNodes} = this.props.designer.data;
        if(this.props.isVisible){
            this.graph &&  this.graph.gRenderer.paper.remove();
            this.graph = null;
            //更新之前:要将原来的渲染效果消除!
            this.graph = initDesigner(viewBox,mindNodes);
        }
    }
}

export default Canvas;