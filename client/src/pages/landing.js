import React, { useEffect } from 'react'
import Nav from '../components/nav';
import { LOGINCOLOR } from '../redux/propsaction';
import { useDispatch, useSelector  } from 'react-redux';
import Song from '../components/songs';
import '../css/home.css';
import SearchIcon from '@mui/icons-material/Search';
import Allartist from '../components/allartist';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
const Landing = () => {
  const store= useSelector((state)=>state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const dat={};
  const arrrr=[];
  const dataaa = false;
  const play = JSON.parse(localStorage.getItem("play"));
  const playing = JSON.parse(localStorage.getItem("playing"));
  useEffect(()=>{
  if(!play && !playing){
    console.log("nerkb");
    localStorage.setItem("play",JSON.stringify(dat));
    localStorage.setItem("tracks",JSON.stringify(arrrr));
    localStorage.setItem("playing",JSON.stringify(dataaa));
  }else{
    console.log("hello");
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("sidebar"));
    data.index=0;
    localStorage.setItem("sidebar",JSON.stringify(data));
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
      <p>Created by our Team and other users</p>
      <button onClick={(e)=>{
        e.preventDefault();
        navigate("/commonplaylist");
      }} >Listen now</button>
      </div>
    </div>
    <div className="lineyy"></div>
    <Allartist/>
    <Song/>
    <Section/>
    <div className="lineyyyyyy"></div>
    <div className="lineyyyyyy"></div>
    <div className="lineyyyyyy"></div>
    </div>
    </div>
  )
}

export default Landing;
