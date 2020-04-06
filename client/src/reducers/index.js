import { combineReducers } from 'redux';
import register from './auth';
import alert from './alert';
import nodeStructure from './nodeStructure';

export default combineReducers({
    register,
    alert,
    nodeStructure

});