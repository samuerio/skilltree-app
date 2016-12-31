import {combineReducers} from 'redux';
import userCenter from './userCenter';
import isFetching from './isFetching';



//userCenter为页面级的State
//isFetching为系统级的State
export default combineReducers({
        userCenter,
        isFetching
    }
);