import{
 LOGIN ,
 SIGNUP ,
 LOGINERROR ,
 SIGNUPERROR, 
 USERDATA,
 LOGOUT,
 ALLARTIST,
 ARTISTDETAIL
} from '../actiontypes';
import { LOGINCOLOR } from '../propsaction';

const URL= "https://meta-tunes.onrender.com";
//http://localhost:8000

export const getallartist = ()=>async(dispatch)=>{
  try{
    const api =`${URL}/common/getallartist`;
    const res = await fetch(api,{
     method: "GET",
     headers: {
       "Content-Type":"application/json"
      }
     });
    const msg = await res.json();
    console.log(msg);
    if(res.status === 200 ){
      const dat = msg.response;
      console.log(dat);
      dispatch({type:ALLARTIST,payload:msg.response});
    }
 }catch(err){
   console.log(err);
 }
}

export const getartist = (formdata)=>async(dispatch)=>{
  try{
    const api =`${URL}/common/artist/${formdata._id}`;
    const res = await fetch(api,{
     method: "GET",
     headers: {
       "Content-Type":"application/json"
      }
     });
    const msg = await res.json();
    console.log(msg);
    if(res.status === 200 ){
      const dat = msg.response;
      console.log(dat);
      dispatch({type:ARTISTDETAIL,payload:msg.response});
    }
 }catch(err){
   console.log(err);
 }
}



export const getallsong = ()=>async(dispatch)=>{
  try{
    const api =`${URL}/common/getallsong`;
    const res = await fetch(api,{
     method: "GET",
     headers: {
       "Content-Type":"application/json"
      }
     });
    const msg = await res.json();
    console.log(msg);
    if(res.status === 200 ){
      const data = msg.response;
      console.log(data);
        localStorage.setItem("song",JSON.stringify(data));
    }
 }catch(err){
   console.log(err);
 }
}



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