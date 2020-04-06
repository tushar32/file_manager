import {
    ALL_NODES
} from '../actions/types';

const initialState = {
    nodeTree: null,
    error:'',
    loading: true
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case ALL_NODES:
            return {
                ...state ,
                nodeTree: payload,
                error:'',
                loading: false
            }
        
        default:
            return state;  
    }
  }