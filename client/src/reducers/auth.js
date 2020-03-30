import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null
}

export default function(state = initialState,actions){
    const{ type, payload } = actions;

    switch(type){

        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuth: true,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuth: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_FAILED:
        case LOGOUT:

            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuth: null,
                loading:true
            }   

        default:
            return state; 

    }
}