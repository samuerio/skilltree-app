import * as actions from '../actions/constants'
import deepAssign from 'deep-assign';
import {RECEIVE_SKILLS,SKILL_FILTER,DESIGN_TAB_CLICK,SAVE_CANVAS_DATA} from '../actions/constants'


let initialState = {
    indexMenu:'overview',
    skills:{
        filter:'own',
        data:[]
    },
    designer:{
        indexTab:'info/canvas',
        data:{
            viewBox:{
                x:"",
                y:"",
                width:"",
                height:""
            },
            mindNodes:[]
        }
    }
}

export default function(state={
    skills:{
        filter:'own',
        data:[]
    },
    designer:{
        indexTab:'info',
        data:{
            viewBox:{
                x:"0",
                y:"0",
                width:"1000",
                height:"1000"
            },
            mindNodes:[]
        }
    }
},action){
    let rsObj = null;
    switch(action.type){
        case RECEIVE_SKILLS:
            return deepAssign({},state,{
                skills:{
                    data:action.data
                }
            });
        case SKILL_FILTER:
            //当进行filter变动时,要清空data数据
            let {filter} = action;
            rsObj = deepAssign({},state,{
                skills:{
                    filter:filter
                }
            });
            rsObj.skills && (rsObj.skills.data = []);
            return rsObj;
        case DESIGN_TAB_CLICK:
            let {tab} = action;
            return deepAssign({},state,{
                designer:{
                    indexTab:tab
                }
            });
        case SAVE_CANVAS_DATA:
            let {viewBox,mindNodes} = action;
            rsObj = deepAssign({},state,{
                designer:{
                    data:{
                        viewBox:viewBox
                    }
                }
            });
            rsObj.designer.data.mindNodes = mindNodes;
            return rsObj;
        default:
            return state;
    }
}