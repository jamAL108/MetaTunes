
import{
    LOGOUT,
 LOGIN ,
 SIGNUP ,
 LOGINERROR ,
 SIGNUPERROR ,
 USERDATA,
 ALLARTIST,
 ARTISTDETAIL,
 FAVOURITES,
 EMPTYFAVS,
 PLAYLISTS,
 EMPTYPLAYS,PLAYLISTCREATED,COMMONPLAYLIST , ALLSONG , CATEGORIES , USERDETAILS , ARTISTCREATED
} from '../actiontypes.js';
const initialstate={
    authordata:null,
    login:false,
    signup:false,
    loginerror:"",
    signuperror:"",
    logout:false,
    allartist:[],
    artistdetail:{},
    favourites:[],
    emptyfav:false,
    playlists:[],
    emptyplay:false,
    playlistcreated:false,
    commonplaylist:[],
    allsong:[],
    categories:{},
    userdetails:{},
    artistcreated:false
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
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("play");
            localStorage.removeItem("tracks");
            localStorage.removeItem("playing");
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
        case ALLARTIST:
            return{
                ...state , allartist:action.payload
            }
        case ARTISTDETAIL:
            return{
                ...state , artistdetail:action.payload
            }
        case FAVOURITES:
            return{
                ...state , favourites:action.payload
            }
        case EMPTYFAVS:
            return{
                ...state , emptyfav:action.payload
            }
        case PLAYLISTS:
            return{
                ...state , playlists:action.payload
            }
        case EMPTYPLAYS:
            return{
                ...state , emptyplay:action.payload
            } 
        case PLAYLISTCREATED:
            return{
                ...state , playlistcreated:action.payload
            }
        case COMMONPLAYLIST:
            return{
                ...state , commonplaylist:action.payload
            }
        case ALLSONG:
            return{
                ...state , allsong:action.payload
            }
        case CATEGORIES:
            return{
                ...state , categories:action.payload
            }                   
        case USERDETAILS:
            return{
                ...state , userdetails:action.payload
            }
        case ARTISTCREATED:
            return{
                ...state , artistcreated:action.payload
            }
        default:
            return state;    
        }
    }

    export default User;