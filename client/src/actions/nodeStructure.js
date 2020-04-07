import {
    ALL_NODES,
    IMAGE_FILES
} from './types';
import axios from 'axios';

export const getNodeTree = () => async dispatch => {
    try {
        const res = await axios.get('/api/node-tree');

        dispatch({
            type: ALL_NODES,
            payload: res.data
        })
    } catch (error) {
        
    }
};

export const getFiles = (path) => async dispatch => {
    console.log('action', path);
    
    try {
        const res = await axios.get('/api/node-tree/files?path='+path);
        dispatch({
            type: IMAGE_FILES,
            payload: res.data
        })       
    } catch (error) {
        
    }
};