import {
    NAVCOLOR,
    LOGINCOLOR,
    ARTISTID
    
} from '../propsaction';

const initialstate ={
    navcolor:false,
    logincolor:false,
    artistid:""
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
            case ARTISTID:
            return{
                ...state , artistid:action.payload
                }
        default:
            return state;    
    }
}

export default props;
