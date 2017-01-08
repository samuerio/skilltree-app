import React,{Component} from 'react';

class Task extends Component{
    render(){
        return(
            <div className="task">
                <i className="icon icon-box"></i>
                <div className="title">
                    <textarea defaultValue={'创建一个任务'} />
                </div>
                <div className="created-time">
                                        <span className="mr10">
                                            <i className="icon icon-calendar"></i>
                                        </span>
                    <span className="mr10" style={{color:'#666'}} >#1</span>
                    <span className="mr10 ">secretary</span>
                                        <span className="mr10">
                                            <a>
                                                <i className="icon icon-clock"></i>
                                                <span>11-03 12:00</span>
                                            </a>
                                        </span>
                                        <span className="mr10">
                                            <a>
                                                <i className="icon icon-comments"></i>
                                                <span>0</span>条评论
                                            </a>
                                        </span>
                </div>
            </div>
        )
    }
}

export default Task;