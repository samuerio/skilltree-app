import React,{Component} from 'react';

class Activitys extends Component{
    render(){
        return(
            <div className="my-activities">
                <div className="header">
                    动态
                </div>
                <div className="inner">
                    <div className="activity-area">
                        <div className="activity-area-head">
                            <div className="start-date"><span>2016-12-14 周三</span></div>
                        </div>
                        <div className="activity">
                            <div className="time-line">14:04</div>
                            <div className="content">
                                <div>
                                    <a>samuerio</a>
                                    <span>在项目<a>samuerio/Demo</a>中</span>
                                    <span>重新开启了XXX</span>
                                </div>
                                <div className="target">
                                    <a>
                                                        <span>
                                                            <i className="icon icon-task"></i>
                                                            <span>创建一个任务</span>
                                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="activity not-bordered">
                            <div className="time-line">14:04</div>
                            <div className="content">
                                <div>
                                    <a>samuerio</a>
                                    <span>在项目<a>samuerio/Demo</a>中</span>
                                    <span>重新开启了XXX</span>
                                </div>
                                <div className="target">
                                    <a>
                                                        <span>
                                                            <i className="icon icon-task"></i>
                                                            <span>创建一个任务</span>
                                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <a className="more" style={{textAlign:'center',marginTop:'10px'}} ><i className="icon icon-down-arrow"></i>加载更多</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Activitys;