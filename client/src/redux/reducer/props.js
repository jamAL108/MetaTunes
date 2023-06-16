import {
    NAVCOLOR,
    LOGINCOLOR,
    ARTISTID,
    USEREXIT
    
} from '../propsaction';

const initialstate ={
    navcolor:false,
    logincolor:false,
    artistid:{},
    userexit:false
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
                console.log(action.payload);
            return{
                ...state , artistid:action.payload
                }
            case USEREXIT:
                return{
                    ...state , userexit:action.payload
                }    
        default:
            return state;    
    }
}

export default props;
