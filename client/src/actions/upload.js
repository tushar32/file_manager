import axios from 'axios';
import { getFiles } from './nodeStructure';

export const upload = (data,path) => async dispatch => {
    try {
        await axios.post(process.env.REACT_APP_API_ENDPOINT+'/api/upload',data);

        dispatch(getFiles(path))
    } catch (error) {
        
    }
};