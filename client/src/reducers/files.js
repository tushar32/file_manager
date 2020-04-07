import {
    IMAGE_FILES
} from '../actions/types';

const initialState = {
    nodeTreeFiles: null,
    error:'',
    loading: true
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case IMAGE_FILES:
            return {
                ...state ,
                nodeTreeFiles: payload,
                error:'',
                loading: false
            }
        
        default:
            return state;  
    }
  }