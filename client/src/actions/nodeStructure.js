import {
    ALL_NODES,
    IMAGE_FILES,
    NO_FILES
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
        //call reducer to make nodetree files set to null
        // so that loader can be set
        dispatch({
            type: NO_FILES
        });

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

export const renameFolder = ({ old_name,current_path, path,new_name }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({old_name, new_name,current_path,path })
    try {
        await axios.post('/api/node-tree/rename-folder',data,options);

        dispatch(getFiles(current_path));
        dispatch(getNodeTree());
    
    } catch (error) {
        
    }
};

export const deleteFolder = ({ folder_name,current_path, path }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ folder_name,current_path, path })
    try {
        await axios.post('/api/node-tree/delete-folder',data,options);

        dispatch(getFiles(current_path));
        dispatch(getNodeTree());
            
    } catch (error) {
        
    }
};

export const createDocument = ({ file_name,current_path, path }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ file_name, path })
    try {
        await axios.post('/api/node-tree/new-document',data,options);

        dispatch(getFiles(current_path));
            
    } catch (error) {
        
    }
};

export const readFile = ({ fileName, filePath }) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ filePath, fileName })
    try {
        return await axios.post('/api/node-tree/read-file',data,options);
            
    } catch (error) {
        
    }
};

export const saveFile = (fileContent, filePath ) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const data = JSON.stringify({ fileContent, filePath })
    try {
       return await axios.post('/api/node-tree/save-file',data,options);
        
        
    } catch (error) {
        
    }
};

export const goBack = (current_path) => async dispatch => {
   
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
      const newPath = current_path.split('/').slice().join('/');

    try {
        dispatch(getFiles(newPath));
            
    } catch (error) {
        
    }
};

