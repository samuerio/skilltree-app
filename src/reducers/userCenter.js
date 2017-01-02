import * as actions from '../actions/constants'
import deepAssign from 'deep-assign';
import {MENU_FILTER_CLICK,RECEIVE_SKILLS,SKILL_FILTER,DESIGN_TAB_CLICK} from '../actions/constants'


let initialState = {
    indexMenu:'overview',
    skills:{
        filter:'own',
        data:[]
    },
    designer:{
        indexTab:'info/canvas'
    }
}

export default function(state={
    indexMenu:'overview',
    skills:{
        filter:'own',
        data:[]
    },
    designer:{
        indexTab:'info'
    }
},action){
    switch(action.type){
        case MENU_FILTER_CLICK:
            let { indexMenu } = action;
            return Object.assign({},state,{
                indexMenu:indexMenu
            });
        case RECEIVE_SKILLS:
            return deepAssign({},state,{
                skills:{
                    data:action.data
                }
            });
        case SKILL_FILTER:
            //当进行filter变动时,要清空data数据
            let {filter} = action;
            let rtObj = deepAssign({},state,{
                skills:{
                    filter:filter
                }
            });
            rtObj.skills && (rtObj.skills.data = []);
            return rtObj;
        case DESIGN_TAB_CLICK:
            let {tab} = action;
            return deepAssign({},state,{
                designer:{
                    indexTab:tab
                }
            });
        default:
            return state;
    }
}