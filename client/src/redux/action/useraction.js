import{
 LOGIN ,
 SIGNUP ,
 LOGINERROR ,
 SIGNUPERROR, 
 USERDATA,
 LOGOUT
} from '../actiontypes';
import { LOGINCOLOR } from '../propsaction';

const URL= "http://localhost:8000";
//

export const login = (formdata,navigate)=>async(dispatch)=>{
    try{
       const api =`${URL}/user/login`;
       const res = await fetch(api,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdata)
        });
       const msg = await res.json();
       console.log(msg);
       if(res.status === 200 ){
            dispatch({type:LOGIN ,payload:true });
            dispatch({type:LOGINCOLOR,payload:false});
            dispatch({type:USERDATA , payload:msg.response});
    }else if(res.status === 400 || res.status===404){
      console.log(msg.error);
      dispatch({type:LOGINERROR ,payload:msg.error})
    }
    }catch(err){
      console.log(err);
    }
}

export const logout = (navigate)=>async(dispatch)=>{
  try{
    dispatch({type:LOGOUT , payload:true});
    navigate("/");
  }catch(err){
    console.log(err);
  }
}

export const signup = (formdata,navigate)=>async(dispatch)=>{
  try{
     const api =`${URL}/user/register`;
     const res = await fetch(api,{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
       },
      body: JSON.stringify(formdata)
      });
     const msg = await res.json();
     console.log(msg);
     if(res.status === 200 ){
          dispatch({type:LOGINCOLOR,payload:false});
          dispatch({type:SIGNUP ,payload:true });
  }else if(res.status === 400 || res.status===404){
    dispatch({type:SIGNUPERROR ,payload:msg.error});
  }
  }catch(err){
    console.log(err);
  }
}