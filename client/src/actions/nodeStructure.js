import {
    ALL_NODES
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
