import{
 LOGIN ,
 SIGNUP ,
 LOGINERROR ,
 SIGNUPERROR, 
 USERDATA,
 LOGOUT,
 ALLARTIST,
 FAVOURITES,
 EMPTYFAVS,
 EMPTYPLAYS,
 PLAYLISTS,PLAYLISTCREATED,COMMONPLAYLIST , ALLSONG , CATEGORIES , USERDETAILS  , ARTISTCREATED
} from '../actiontypes';
import { LOGINCOLOR , USEREXIT } from '../propsaction';

// const URL= "https://meta-tunes.onrender.com";
const URL = "http://localhost:8000"

export const getdetails=(data)=>async(dispatch)=>{
  try{
    const api =`${URL}/user/getdetails`;
    const res = await fetch(api,{
     method: "POST",
     headers: {
       "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
     });
    const msg = await res.json();
    console.log(msg);
    if(res.status === 200 ){
      const dat = msg.response;
      console.log(dat);
      dispatch({type:USERDETAILS,payload:msg.response});
    }
 }catch(err){
   console.log(err);
 }
}

export const createartist=(data)=>async(dispatch)=>{
  try{
    const api =`${URL}/user/createartist`;
    const res = await fetch(api,{
     method: "POST",
     headers: {
       "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
     });
    const msg = await res.json();
    console.log(msg);
    if(res.status === 200 ){
      const dat = msg.response;
      console.log(dat);
      dispatch({type:ARTISTCREATED,payload:true});
    }
 }catch(err){
   console.log(err);
 }
}


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


export const getallsong=(username)=>async(dispatch)=>{
   try{
        const obj={
          username:username
        }
       const res = await fetch("https://meta-tunes.onrender.com/common/getsongs",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(obj)
        });
       const msg = await res.json();
       console.log(msg);
       if(res.status === 200 ){
            let data = msg.response;
            dispatch({type:ALLSONG , payload:data});
    }
  }catch(err){
      console.log(err);
    }
}

export const getplaylists = (formdata) =>async(dispatch)=>{
  try{
    const api =`${URL}/user/getplaylists`;
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
      if(msg.response.length===0){
        console.log("heeloo");
          dispatch({type:EMPTYPLAYS,payload:true});
      }else{
        dispatch({type:PLAYLISTS , payload:msg.response});
    }
 }
 }catch(err){
   console.log(err);
 }
}

export const getfavourites = (formdata) =>async(dispatch)=>{
  try{
    const api =`${URL}/user/getfavourites`;
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
      if(msg.response.length===0){
        console.log("heeloo");
          dispatch({type:EMPTYFAVS,payload:true});
      }else{
        dispatch({type:FAVOURITES , payload:msg.response});
    }
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
    dispatch({type:USEREXIT , payload:false});
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

export const addfavourites = (formdata)=>async()=>{
  try{
     const api =`${URL}/user/addfavourites`;
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
        console.log("good");
     }
  }catch(err){
    console.log(err);
  }
}

export const removefavourites = (formdata)=>async()=>{
  try{
     const api =`${URL}/user/removefavourites`;
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
        console.log("good");
     }
  }catch(err){
    console.log(err);
  }
}


export const createplaylist = (formdata)=>async(dispatch)=>{
  try{
    const api =`${URL}/user/createplaylist`;
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
       console.log("good");
       dispatch({type:PLAYLISTCREATED  , payload:true});
    }
 }catch(err){
   console.log(err);
 }
}


export const commonplaylist = ()=>async(dispatch)=>{
  try{
    const api =`${URL}/common/commonplaylist`;
    const res = await fetch(api,{
     method: "GET",
     headers: {
       "Content-Type":"application/json"
      }
     });
    const msg = await res.json();
    console.log(msg);
    if(res.status === 200 ){
       console.log("good");
       dispatch({type:COMMONPLAYLIST  , payload:msg.response});
    }
  }catch(err){
    console.log(err);
  }
}

export const categories = (formdata)=>async(dispatch)=>{
try{
  const api =`${URL}/common/categories`;
  const res = await fetch(api,{
   method: "POST",
   headers: {
     "Content-Type":"application/json"
    },
    body:JSON.stringify(formdata)
   });
  const msg = await res.json();
  console.log(msg);
  if(res.status === 200 ){
     console.log("good");
     dispatch({type:CATEGORIES  , payload:msg.response});
  }
}catch(err){
  console.log(err);
}
}


