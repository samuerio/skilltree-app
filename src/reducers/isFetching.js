import {FETCHING_DATA,RECEIVE_DATA} from '../actions/constants'

/**
 * 处理全局fetching状态的reducer
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state=false,action){
    switch(action.type){
        case FETCHING_DATA:
            return Object.assign({},state,{isFetching:true});
        case RECEIVE_DATA:
            return Object.assign({},state,{isFetching:false});
        default:
            return state;
    }
}