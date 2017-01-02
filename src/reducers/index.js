import {combineReducers} from 'redux';
import userCenter from './userCenter';
import isFetching from './isFetching';
import form from './form';



//userCenter为页面级的State
//isFetching为系统级的State
//form为系统级的State
export default combineReducers({
        userCenter,
        isFetching,
        form
    }
);