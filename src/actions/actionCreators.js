import {MENU_FILTER_CLICK,FETCHING_DATA,RECEIVE_SKILLS,RECEIVE_DATA,SKILL_FILTER,DESIGN_TAB_CLICK} from './constants'

/**
 * 侧边栏点击事件
 */
export function menuClick(indexMenu){
    return {
        indexMenu:indexMenu,
        type:MENU_FILTER_CLICK
    }
}

/**
 * 获取skills数据
 * @param filter
 */
export function fetchSkills(filter){
    return function(dispatch){
        dispatch(requestData());
        $.post('/skilltree-app/app.action?type=skill',
            {operType:'getList',creator:'111111',filter:filter})
        .then(function(data){
            data = JSON.parse(data);
            if(data.isSuccess){
                dispatch(receiveSkills(data.content));
            }
            dispatch(receiveData());
        })
    }
}

function receiveSkills(skills){
    return {
        type:RECEIVE_SKILLS,
        data:skills
    }
}

export function skillFilter(filter){
    return{
        type:SKILL_FILTER,
        filter:filter
    }
}

export function designerTabClick(tabName){
    return{
        type:DESIGN_TAB_CLICK,
        tab:tabName
    }
}


//-------------------------Global Action

/**
 * 请求数据
 * @returns {{type}}
 */
function requestData(){
    return{
        type:FETCHING_DATA
    }
}

function receiveData(){
    return{
        type:RECEIVE_DATA
    }
}

