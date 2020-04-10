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

export const deleteFile = ({ file_name,current_path, path }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ file_name, path })
    try {
        await axios.post('/api/node-tree/delete',data,options);

        dispatch(getFiles(current_path));
            
    } catch (error) {
        
    }
};

export const createFolder = ({ file_name,current_path, path }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ file_name, path })
    try {
        await axios.post('/api/node-tree/create-folder',data,options);

        dispatch(getFiles(current_path));
            
    } catch (error) {
        
    }
};

export const renameFolder = ({ folder_name,current_path, path }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ folder_name, path })
    try {
        await axios.post('/api/node-tree/rename-folder',data,options);

        dispatch(getFiles(current_path));
            
    } catch (error) {
        
    }
};



