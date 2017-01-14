import * as actions from './constants'


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
        type:actions.RECEIVE_SKILLS,
        data:skills
    }
}

export function skillFilter(filter){
    return{
        type:actions.SKILL_FILTER,
        filter:filter
    }
}

export function designerTabClick(tabName){
    return{
        type:actions.DESIGN_TAB_CLICK,
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
        type:actions.FETCHING_DATA
    }
}

/**
 * 接收到数据
 * @returns {{type}}
 */
function receiveData(){
    return{
        type:actions.RECEIVE_DATA
    }
}

/**
 * 添加表单字段值
 * @param fieldName
 * @param filedVal
 * @returns {{type, fieldName: *, fieldVal: (fieldVal|*)}}
 */
export function addFieldVal(fieldName,filedVal){
    return {
        type:actions.ADD_FIELD_VAL,
        fieldName:fieldName,
        fieldVal:filedVal
    }
}

/**
 * 存储canvas数据到state
 * @param viewBox
 * @param mindNodes
 * @returns {{type, viewBox: *, mindNodes: Array}}
 */
export function saveCanvasData(viewBox,mindNodes = []){
    return {
        type:actions.SAVE_CANVAS_DATA,
        viewBox:viewBox,
        mindNodes:mindNodes
    }
}

/**
 * 移除表单字段
 * @param fieldName
 * @returns {{type, fieldName: *}}
 */
export function removeField(fieldName){
    return {
        type:actions.REMOVE_FIELD,
        fieldName:fieldName
    }
}


