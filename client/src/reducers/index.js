import { combineReducers } from 'redux';
import register from './auth';
import alert from './alert';

export default combineReducers({
    register,
    alert

});