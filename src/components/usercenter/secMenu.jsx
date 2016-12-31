import React,{Component} from 'react';

class SecMenu extends Component{
    render(){
        return(
            <div className="secMenu">
                <header>
                    技能
                    <a><i className="icon icon-plus"></i></a>
                    <article>
                        按我创建的、参与的和归档的技能分类
                    </article>
                </header>
                <a className="item">
                    <i className="icon icon-tree"></i><span>所有技能 (1)</span>
                </a>
                <a className="item active">
                    <i className="icon icon-edit"></i><span>由我创建 (1)</span>
                </a>
            </div>
        );
    }
}

export default SecMenu;