
import{
    LOGOUT,
 LOGIN ,
 SIGNUP ,
 LOGINERROR ,
 SIGNUPERROR ,
 USERDATA
} from '../actiontypes.js';
const initialstate={
    authordata:null,
    login:false,
    signup:false,
    loginerror:"",
    signuperror:"",
    logout:false
}  

const User =(state=initialstate , action) =>{
    switch(action.type){
        case LOGIN:
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 3); 
            const token={
                auth:"Auth-Token",
                expiresIn:expirationDate.toISOString()
            }
            console.log(action.payload);
            localStorage.setItem("token",JSON.stringify(token));
                return {
                    ...state , login:action.payload
                }
        case USERDATA:
            const data = action.payload;
            localStorage.setItem("user",JSON.stringify(data))
            return state;   
        case LOGOUT:
            return{
                ...state , logout:action.payload
            }
        case LOGINERROR:
            return{
                ...state , loginerror:action.payload
            }
        case SIGNUP:
            return{
                ...state ,signup:action.payload
            }    
         case SIGNUPERROR:
            return{
                 ...state , signuperror:action.payload
            }
        default:
            return state;    
        }
    }

    export default User;