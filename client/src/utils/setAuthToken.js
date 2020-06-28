import axios from 'axios';

 const setAuthToken = token => {
    if(token){
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });
        axios.defaults.httpsAgent = agent;
        axios.defaults.headers.common['x-auth-token'] = token;
        axios.defaults.headers.common['Accept'] = 'application/json';

    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

}

export default setAuthToken;