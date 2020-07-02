import axios from 'axios';
import { getFiles } from './nodeStructure';

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({  
        cert: fs.readFileSync('/home/jagatgururampalji/domains/filemanager.jagatgururampalji.org/ssl.key'),
        key: fs.readFileSync('/home/jagatgururampalji/domains/filemanager.jagatgururampalji.org/ssl.cert'),
    })
  });
  

export const upload = (data,path) => async dispatch => {
    try {
        await axiosInstance.post(process.env.REACT_APP_API_ENDPOINT+'/api/upload',data);

        dispatch(getFiles(path))
    } catch (error) {
        
    }
};