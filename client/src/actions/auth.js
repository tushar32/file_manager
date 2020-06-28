import {   
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_FAILED,
    LOGOUT,
    SET_ALERT
 } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {

    if(localStorage.token){
        //setAuthToken will set the token in the header to send to /api/login
        // It's helper function
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get(process.env.REACT_APP_API_ENDPOINT+'/api/auth');
        
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
       
    } catch (error) {
        dispatch({
            type: AUTH_FAILED,
        })
    }

}

export const register = ({ name,email,password }) => async dispatch => {
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({ name,email,password });
    
    try {
        const res = await axios.post(process.env.REACT_APP_API_ENDPOINT+'/api/auth/register', body, options)

        console.log('res.data',res.data);
        
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            dispatch({
                type: SET_ALERT,
                payload: errors 
            });
        }
        dispatch({
            type:REGISTER_FAIL,
        });
    }
}

export const login  = ({ email,password }) => async dispatch => {

    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({ email,password });

    try {
        const res = await axios.post(process.env.REACT_APP_API_ENDPOINT+'/api/auth/login', body, options)
   console.log(res.data);
   
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
             
        if(errors) {
            dispatch({
                type: SET_ALERT,
                payload: errors 
            });
        }

        dispatch({
            type:AUTH_FAILED,
        });
    }
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
   // dispatch({ type: CLEAR_PROFILE });
  };