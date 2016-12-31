import * as actions from '../actions/constants'
import deepAssign from 'deep-assign';
import {MENU_FILTER_CLICK,RECEIVE_SKILLS} from '../actions/constants'


let initialState = {
    indexMenu:'overview',
    skills:{
        filter:'own',
        data:[]
    }
}

export default function(state={
    indexMenu:'overview',
    skills:{
        filter:'own',
        data:[]
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
        default:
            return state;
    }
}