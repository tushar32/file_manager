import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (alerts, timeout = 5000) => dispatch => {
   
    dispatch({
        type: SET_ALERT,
        payload: alerts 
    })

   // setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}