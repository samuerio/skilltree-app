import * as actions from '../actions/constants'


export default function(state={menuFilter:'skillTree'},action){
    switch(action.type){
        case actions.USER_MENU_FILTER_CLICK:
            return Object.assign({},state,{menuFilter:action.menuFilter});
        default:
            return state;
    }
}