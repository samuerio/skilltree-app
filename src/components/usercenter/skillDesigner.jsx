import React,{Component} from 'react';
import {Button,Select,Input} from 'antd';
const Option = Select.Option;



import {initDesigner} from '../../designer/index';


class SkillDesigner extends Component{
    render(){
        let {designer,designerTabClick} = this.props;
        let {indexTab} = designer;

        let $tabContent = <div>{indexTab+'的tab内容为空'}</div>;
        if(indexTab === 'canvas'){
            $tabContent = (
                <div>
                    <div className="header">
                        <Button type="ghost">保存</Button>
                        <Button type="ghost">新增</Button>
                        <Button type="ghost">删除</Button>
                    </div>
                    <div style={{backgroundColor:'rgb(242, 242, 242)',marginTop:'10px',position:'relative'}} >
                        <canvas id="designer_grids"></canvas>
                        <div id="mindmap-canvas" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%'}}></div>
                    </div>
                </div>
            );
        }else  if(indexTab === 'info'){
            $tabContent = (
                <div>
                    <div className="field">
                        <Select size="large" defaultValue="lucy" style={{ width: 120 }} >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>Disabled</Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        <Input size="large" placeholder="技能名称" />
                    </div>
                    <div className="field">
                        <Input type="textarea" rows={4} />
                    </div>
                </div>
            );
        }

        return(
            <div className="designer">
                <div className="designer-nav-wrapper">
                    <nav className="designer-nav">
                                <span>
                                    <a className={indexTab === 'info' ? 'nav-item selected' : 'nav-item'}
                                                onClick={()=>designerTabClick('info')}>
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
        let indexTab = this.props.designer.indexTab;
        if(indexTab === 'canvas'){
            //初始化设计器
            initDesigner();
        }
    }
}

export default SkillDesigner;