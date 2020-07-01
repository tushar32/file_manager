import axios from 'axios';

 const setAuthToken = token => {
    if(token){
        
        axios.defaults.headers.common['x-auth-token'] = token;
        axios.defaults.headers.common['Accept'] = 'application/json';

    }

}

export default setAuthToken;