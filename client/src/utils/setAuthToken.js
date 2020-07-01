import axios from 'axios';
import https from 'https';

 const setAuthToken = token => {
    const agent = new https.Agent({  
        rejectUnauthorized: false
      });
    axios.defaults.httpsAgent = agent;
    
    if(token){
        
        axios.defaults.headers.common['x-auth-token'] = token;
        axios.defaults.headers.common['Accept'] = 'application/json';

    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

}

export default setAuthToken;