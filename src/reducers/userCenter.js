import * as actions from '../actions/constants'
import deepAssign from 'deep-assign';
import {RECEIVE_SKILLS,DESIGN_TAB_CLICK,SAVE_CANVAS_DATA} from '../actions/constants'


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
            rsObj = {...state};
            rsObj.skills.data = action.data;
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