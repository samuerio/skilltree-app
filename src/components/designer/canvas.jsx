import React,{Component} from 'react';
import {Button,Select,Input,message} from 'antd';
import CanvasRuntime from '../../app/designer';

class Canvas extends Component{

    constructor(props){
        super(props);
        //初始化画图对象的引用
        this.canvasRuntime = null;

        this.saveConfig = this.saveConfig.bind(this);
        this.addMindNode = this.addMindNode.bind(this);
        this.deleteMindNode = this.deleteMindNode.bind(this);
    }

    saveConfig(){
        let {saveCanvasData} = this.props;

        let viewBox = this.canvasRuntime.getViewBox();
        if(!viewBox){
            viewBox = {
                x:"0",
                y:"0",
                width:"1000",
                height:"1000"
            }
        }

        let mindNodes = this.canvasRuntime.getMindNodes();
        saveCanvasData(viewBox,mindNodes);
        message.info('配置保存成功!');
    }

    addMindNode(){
        this.canvasRuntime.addNode();
    }

    deleteMindNode(){
        this.canvasRuntime.deleteNode();
    }

    render(){
        return(
            <div>
                <div className="header">
                    <Button type="ghost" onClick={this.saveConfig}>保存设计器配置</Button>
                    <Button type="ghost" onClick={this.addMindNode}>新增</Button>
                    <Button type="ghost" onClick={this.deleteMindNode}>删除</Button>
                </div>
                <div id="designer" style={{backgroundColor:'rgb(242, 242, 242)',marginTop:'10px',position:'relative'}} >
                    <div id="mindmap-canvas" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%'}}></div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //初始化设计器
        let {viewBox,mindNodes} = this.props.designer.data;
        if(this.props.isVisible){//若Canvas为未隐藏状态则进行初始化
            this.canvasRuntime = new CanvasRuntime(viewBox,mindNodes);
        }
    }

    componentDidUpdate(){
        //初始化设计器
        let {viewBox,mindNodes} = this.props.designer.data;
        if(this.props.isVisible){
            if(!this.canvasRuntime){
                this.canvasRuntime = new CanvasRuntime(viewBox,mindNodes);
            }else{
                this.canvasRuntime.reload(viewBox,mindNodes);
            }
        }
    }
}

export default Canvas;