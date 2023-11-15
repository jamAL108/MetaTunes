import React, { useEffect , useRef, useState } from 'react'
import Nav from '../components/nav';
import { LOGINCOLOR } from '../redux/propsaction';
import { useDispatch, useSelector  } from 'react-redux';
import Song from '../components/songs';
import '../scss/home.scss';
import Allartist from '../components/allartist';
import Genre from '../components/genre'
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import {
  SETCURRENTTRACK , SETPLAYING , SETTRACKLIST
} from '../redux/playertypes';
import CloseIcon from '@mui/icons-material/Close';
import Topchart from '../components/topcharts';
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
const [display,setdisplay]=useState(false);
const refffu = useRef(null);
useEffect(()=>{
  const inputElement=document.querySelector('.inputs');
  inputElement.addEventListener('focus', function() {
    setdisplay(true);
    const land = document.querySelector('.other');
    console.log(land);
    document.body.style.overflowY="hidden";
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[refffu.current]);
const [artist,setartist]=useState([]);
const [songs,setsong]=useState([]);
const [playlist,setplaylist]=useState([]);
const URL = "https://meta-tunes.onrender.com";
  const func1 =async()=>{
    try{
     const api =`${URL}/common/getallthree`;
     const res = await fetch(api,{
      method: "GET",
      headers: {
        "Content-Type":"application/json"
       }
      });
     const msg = await res.json();
     setplaylist(msg.response.playlists);
     setsong(msg.response.songs);
     setartist(msg.response.artists);
  }catch(err){
    console.log(err);
  }
}
useEffect(()=>{
  func1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
const [tempsong,settempsong]=useState([]);
const [tempartist,settempartist]=useState([]);
const [tempplaylist,settempplaylist]=useState([]);
const search=(e)=>{
  console.log(songs)
  console.log(artist)
  console.log(playlist)
  if(!e){
    console.log("hello");
  }else{
    let input = e;
    console.log(input);
const tempS = songs.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())).slice(0, 5);
    settempsong(tempS);
    const tempA = artist.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())).slice(0, 5);
    settempartist(tempA);
    const tempP = playlist.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())).slice(0, 5);
    settempplaylist(tempP);
  }
}
const addcomma= (name)=>{
  return name.join(", ");
}
const playsong = (item) => {
  dispatch({type:SETCURRENTTRACK , payload:item})
  let list =[];
  list.push(item);
  const data ={
    list:list,
    index:0
  }
  dispatch({type:SETTRACKLIST , payload:data})
  dispatch({type:SETPLAYING , payload:true})
};

function debounce(func,d){
  let timer;
  return function(){
    if(timer) clearTimeout(timer);
    setTimeout(func,d);
  }
}

const timery = debounce(()=>{
  search(refffu.current.value)
},800)

  return (
    <div className='home'>
    <Nav/>
    <div className="other">
    <div className="search">
      <input type="text" ref={refffu} placeholder='Search' className='inputs' onChange={timery}   />
      {refffu?.current===document.activeElement && ( 
          <CloseIcon className='inside' onClick={(e)=>{
         e.preventDefault();
         const inputEle=document.querySelector('.inputs');
         inputEle.value="";
         document.body.style.overflowY="scroll";
        inputEle.blur();
        setdisplay(false);
      }} />)}
    </div>
    {display===true && (
      <div className="searching" onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation();
      }}> 
         {tempartist.map((item,idx)=>(
           <div className="box" key={idx} onClick={(e)=>{
            e.preventDefault();
           document.body.style.overflowY="hidden";
            navigate(`/artist/${item._id}`);
            const inputEle=document.querySelector('.inputs');
            inputEle.blur();
           }}>
              <div className="image">
                <img src={item.imageURL} alt="artist" />
              </div>
              <div className="names">
                <h1>{item.name}</h1>
                <p>• Artist</p>
              </div>
           </div>
         ))}
         {tempsong.map((item,idx)=>(
           <div className="box" key={idx} onClick={(e)=>{
            e.preventDefault();
          //  const land = document.querySelector('.other');
           document.body.style.overflowY="hidden";
              playsong(item);
              const inputEle=document.querySelector('.inputs');
              inputEle.blur();
              setdisplay(false);
              refffu.current.value="";
           }}>
              <div className="image">
                <img src={item.imageURL} alt="artist" />
              </div>
              <div className="names">
                <h1>{item.name}</h1>
                <div className="down">
                <p>• Song</p>
                <h2>{addcomma(item.artist)}</h2>
                </div>
              </div>
           </div>
         ))}
         {tempplaylist.map((item,idx)=>(
           <div className="box" key={idx} onClick={(e)=>{
            e.preventDefault();
           document.body.style.overflowY="hidden";
            navigate(`/playlist/${item._id}`);
            const inputEle=document.querySelector('.inputs');
            inputEle.blur();
           }}>
              <div className="image">
                <img src={item.image.myfile} alt="artist" />
              </div>
              <div className="names">
                <h1>{item.name}</h1>
                <div className="down">
                <p>• Playlist</p>
                <h2>{item.author}</h2>
                </div>
              </div>
           </div>
         ))}
      </div>
    )}
    <div className="line"></div>
    <div className="allplaylist">
      <div className="support">
      <div className="item">
      <h2>Awesome Playlists</h2>
      <p>Listen to the best playlists curated by us and our users.</p>
      <button onClick={(e)=>{
        e.preventDefault();
        navigate("/commonplaylist");
      }} >Listen now</button>
      </div>
      </div>
    </div>
    <div className="lineyy"></div>
    <Allartist/>
    <Song/>
    <Section/>
    <Topchart/>
    <Genre/>
    <div className="lineyyyyyy"></div>
    <div className="lineyyyyyy"></div>
    <div className="lineyyyyyy"></div>
    </div>
    </div>
  )
}

export default Landing;
