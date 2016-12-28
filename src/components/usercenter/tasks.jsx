import React, {Component} from 'react';
import Task from './task.jsx';

class Tasks extends Component{
    render(){
        return(
            <div className="my-tasks">
                <div className="header">
                    我的任务
                </div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <a className="more" style={{textAlign:'center',marginTop:'10px'}} ><i className="icon icon-right-arrow"></i>查看我的任务</a>
            </div>
        );
    }
}

export default Tasks;