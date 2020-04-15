import {
    IMAGE_FILES,
    NO_FILES,
    UPLOAD
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
            case NO_FILES:
                return {
                    ...state ,
                    nodeTreeFiles: null,
                    error:'',
                    loading: true
                }
    
            
        case UPLOAD:
        return {
            ...state
        }
        
        default:
            return state;  
    }
  }