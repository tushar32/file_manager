import {
    UPLOAD
} from './types';
import axios from 'axios';

export const upload = (data) => async dispatch => {
    try {
        const res = await axios.post('/api/upload',data);

        // dispatch({
        //     type: UPLOAD,
        //     payload: res.data
        // })
    } catch (error) {
        
    }
};