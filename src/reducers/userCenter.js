import * as actions from '../actions/constants'
import deepAssign from 'deep-assign';
import {MENU_FILTER_CLICK} from '../actions/constants'


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
        default:
            return state;
    }
}