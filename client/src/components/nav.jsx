import React,{useEffect, useState} from 'react';
import Icon from '../images/note-xxl.png';
import './nav.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { LOGINCOLOR } from '../redux/propsaction';
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state)=>state);
  const [menu , setmenu]=useState(false);
  const [home , sethome] = useState(false);
  const [artist,setartist] = useState(false);
  const [favourites , setfavourites] = useState(false);
  const [playlist , setplaylist] = useState(false);
  const sidebar = JSON.parse(localStorage.getItem("sidebar"));
  console.log(sidebar);
  const side = sidebar.index;
useEffect(()=>{
  if(side===0){
    sethome(true);
  }else if(side===1){
    setartist(true);
  }else if(side===2){
    setfavourites(true);
  }else if(side===3){
    setplaylist(true);
  }
              // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(()=>{
  if(window.screen.width<900){
    if(store.props.navcolor===true){
      const temp = document.querySelector(".icon");
      temp.style.display="none";
      document.body.style.backgroundColor = "#141414";
      const teemp = document.querySelector(".nav");
      teemp.style.backgroundColor="#272729";
    }
  }
                // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.props.navcolor])

useEffect(()=>{
   if(store.props.logincolor===false){
    if(window.screen.width<900){
    const temp = document.querySelector(".icon");
    temp.style.display="block";
    const temp1 = document.querySelector(".nav");
    temp1.style.backgroundColor="#09090B";
    }
   }
},[store.props.logincolor])
  return (
    <nav className='nav'>
        <div className="header">
            <img src={Icon} alt="LOGO" />
            <h1>ExtraBeat</h1>
            {menu===false &&(
            <MenuIcon className="icon" onClick={(e)=>{
               e.preventDefault();
               setmenu(true);
               const temp = document.querySelector(".nav");
               const temp1 = document.querySelector(".menu");
               const temp2 = document.querySelector(".line");
               const temp3 = document.querySelector(".login");
               const temp4 = document.querySelector(".header");
               temp.style.height="100vh";
               temp1.style.display="flex";
               temp1.style.marginTop="6%";
               temp2.style.display="inline-block";
               temp3.style.display="flex";
               temp4.style.borderBottom="none";
               temp4.style.height="10%";
               
            }} />
            )}
            {menu===true &&(
            <CloseIcon className='icon' onClick={(e)=>{
              e.preventDefault();
              setmenu(false);
               const temp = document.querySelector(".nav");
               const temp1 = document.querySelector(".menu");
               const temp2 = document.querySelector(".line");
               const temp3 = document.querySelector(".login");
               const temp4 = document.querySelector(".header");               
               temp.style.height="10%";
               temp1.style.display="none";
               temp1.style.marginTop="10%";
               temp2.style.display="none";
               temp3.style.display="none";
               temp4.style.borderBottom="3px solid #323234";  
               temp4.style.height="100%";             
            }} />
            )}
        </div>
        <div className="menu">
          <div className="item" onClick={(e)=>{
            e.preventDefault();
            sethome(true);
            setartist(false);
            setfavourites(false);
            setplaylist(false);
            sidebar.index=0;
            localStorage.setItem("sidebar",JSON.stringify(sidebar));
            navigate("/");
          }}>
            <div className={home ? "active" : "notactive"}>
            <HomeIcon className='icons'/>
            <h2>Home</h2>
            </div>
          </div>
          <div className="item" onClick={(e)=>{
            e.preventDefault();
            sethome(false);
            setartist(true);
            setfavourites(false);
            setplaylist(false);
            sidebar.index=1;
            localStorage.setItem("sidebar",JSON.stringify(sidebar));
          }}>
             <div className={artist ? "active" : "notactive"}>
           <SearchIcon className='icons'/>
           <h2>Artists</h2>
           </div>
          </div>
          <div className="item" onClick={(e)=>{
            e.preventDefault();
            sethome(false);
            setartist(false);
            setfavourites(true);
            setplaylist(false);
            sidebar.index=2;
            localStorage.setItem("sidebar",JSON.stringify(sidebar));
            navigate("/favourites");
          }} >
             <div className={favourites ? "active" : "notactive"}>
            <FavoriteBorderIcon className='icons'/>
            <h2>Favourites</h2>
            </div>
          </div>
          <div className="item" onClick={(e)=>{
            e.preventDefault();
            sethome(false);
            setartist(false);
            setfavourites(false);
            setplaylist(true);
            sidebar.index=3;
            localStorage.setItem("sidebar",JSON.stringify(sidebar));
            navigate("/playlist");
          }} >
           <div className={playlist ? "active" : "notactive"}>
            <HeadsetIcon className='icons'/>
            <h2>Playlists</h2>
            </div>
          </div>
        </div>
        <div className='line'></div>
        <div className="login" onClick={(e)=>{
           e.preventDefault();
           if(window.screen.width<900){
           dispatch({type:LOGINCOLOR , payload:true});
           } 
           if(window.screen.width>900){
           const data = JSON.parse(localStorage.getItem("sidebar"));
           data.index=-1;
           localStorage.setItem("sidebar",JSON.stringify(data));
           }
           navigate('/login');
          }} >
          login
        </div>
    </nav>
  )
}

export default Nav;