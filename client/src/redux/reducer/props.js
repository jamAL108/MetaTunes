import {
    NAVCOLOR
} from '../propsaction';

const initialstate ={
    navcolor:false
}


const props =(state=initialstate , action) =>{
    switch(action.type){
        case NAVCOLOR:
            return{
                ...state , navcolor:action.payload
            }
        default:
            return state;    
    }
}

export default props;