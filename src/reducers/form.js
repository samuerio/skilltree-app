import {ADD_FIELD_VAL,REMOVE_FIELD} from '../actions/constants';

export default function(state={},action){
    switch(action.type){
        case ADD_FIELD_VAL:
            let{fieldName,fieldVal} = action;
            return {...state,...{
                [fieldName]:fieldVal
            }};
        case REMOVE_FIELD:
            let rtObj = {...state};
            delete rtObj[action.fieldName];
            return rtObj;
        default:
            return state;
    }
}