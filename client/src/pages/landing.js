import React, { useEffect } from 'react'
import Nav from '../components/nav';
import { LOGINCOLOR } from '../redux/propsaction';
import { useDispatch, useSelector } from 'react-redux';
import Song from '../components/songs';
import '../css/home.css';
import SearchIcon from '@mui/icons-material/Search';
import {  getallsong } from '../redux/action/useraction';
import Allartist from '../components/allartist';
const Landing = () => {
  const store= useSelector((state)=>state);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("sidebar"));
    data.index=0;
    localStorage.setItem("sidebar",JSON.stringify(data));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    let username="";
    if(!user){
       username="";
    }else{
       username=user.username
    }
    dispatch(getallsong(username));
          // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
     const user = JSON.parse(localStorage.getItem("user"));
     const token = JSON.parse(localStorage.getItem("token"));
     if(user && token){
     if( new Date(token.expirationDate) < new Date()){
         localStorage.removeItem("user");
         localStorage.removeItem("token");
     }
    }
  },[])
  useEffect(()=>{
    if(store.props.logincolor===true){
      if(window.screen.width<900){
      document.body.style.backgroundColor = "#141414";
      const temp = document.querySelector(".icon");
      temp.style.display="block";
      const temp1 = document.querySelector(".nav");
      temp1.style.backgroundColor="#09090B";
      dispatch({type:LOGINCOLOR , payload:false})
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <div className='home'>
    <Nav/>
    <div className="other">
    <div className="search">
      <input type="text" placeholder='Search'  />
      <SearchIcon className='inside' />
    </div>
    <div className="line"></div>
    <div className="allplaylist">
      <div className="item">
      <h2>Awesome Playlists</h2>
      <p>Created by out Team and other users</p>
      <button>Listen now</button>
      </div>
    </div>
    <div className="lineyy"></div>
    <Allartist/>
    <div className="liney"></div>
    <Song/>
    <div className="lineyy"></div>
    </div>
    </div>
  )
}

export default Landing;
