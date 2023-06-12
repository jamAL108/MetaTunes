import {
    NAVCOLOR,
    LOGINCOLOR
} from '../propsaction';

const initialstate ={
    navcolor:false,
    logincolor:false
}


const props =(state=initialstate , action) =>{
    switch(action.type){
        case NAVCOLOR:
            return{
                ...state , navcolor:action.payload
            }
        case LOGINCOLOR:
            console.log(action.payload);
            return{
                ...state , logincolor:action.payload
            }    
        default:
            return state;    
    }
}

export default props;