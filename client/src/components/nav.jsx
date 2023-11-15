import React,{useEffect, useState} from 'react';
import Icon from '../images/note-xxl.png';
import '../scss/nav.scss';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { LOGINCOLOR } from '../redux/propsaction';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from '../redux/action/useraction';
import { LOGOUT } from '../redux/actiontypes';
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state)=>state);
  const [menu , setmenu]=useState(false);
  const [home , sethome] = useState(false);
  const [artist,setartist] = useState(false);
  const [favourites , setfavourites] = useState(false);
  const [playlist , setplaylist] = useState(false);
  const [login,setlogin] =useState(false);
  const sidebar = JSON.parse(localStorage.getItem("sidebar"));
  const side = sidebar.index;
  const data = JSON.parse(localStorage.getItem("user"));
  const [profiley,setprofile] = useState(false);
  useEffect(()=>{
    if(window.location.href.includes(("profile")) || window.location.href.includes(("createartist"))){
      setprofile(true)
    }else{
      setprofile(false)
    }
  },[])
  useEffect(()=>{
    if(data){
      if(data?.username?.length!==0){
      setlogin(true);
      }
   }else{
     setlogin(false);
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    console.log("outside");
    if(store.user.logout===true){
      console.log("inside");
      setlogin(false);
      setlogin(false);
      setlogin(false);
      setlogin(false);
      setlogin(false);
      console.log(login);

      console.log("nhjerhbvejsrkc");
      console.log("nkjerhdcnufiewbjniurebjdcgbrf");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      const sample = JSON.parse(localStorage.getItem("user"));
    if(sample){
      if(sample.username.length!==0){
      setlogin(true);
      }else{
        setlogin(false);
      }
   }else{
     setlogin(false);
   }

   dispatch({type:LOGOUT , payload:false});
   console.log(login);
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.user.logout])
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.props.logincolor])
  return (
    <nav className='nav'>
        <div className="header">
            <img src={Icon} alt="LOGO" />
            <h1>MetaTunes</h1>
            {menu===false &&(
            <MenuIcon className="icon" onClick={(e)=>{
               e.preventDefault();
               setmenu(true);
               const temp = document.querySelector(".nav");
               const temp1 = document.querySelector(".menu");
               const temp2 = document.querySelector(".line");
               const temp3 = document.querySelector(".lower");
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
               const temp3 = document.querySelector(".lower");
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
            navigate("/newartist")
          }}>
             <div className={artist ? "active" : "notactive"}>
           <SearchIcon className='icons'/>
           <h2>Our Artists</h2>
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
        <div className="lower">
        {login===false &&(
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
        )}
        {login===true &&(
          <div className="user">
            <div className="box" id='coolor' style={profiley===true ? {backgroundColor:"#EE4950",color:"#f5f5f5"} : {backgroundColor:"transparent",color:"#EE4950"}} onClick={(e)=>{
              e.preventDefault()
              sethome(false);
              setartist(false);
              setfavourites(false);
              setplaylist(false);
              sidebar.index=900;
              localStorage.setItem("sidebar",JSON.stringify(sidebar));
              navigate("/profile")
            }} >
            <AccountCircleOutlinedIcon className='icon' />
             <h1>{data?.username}</h1>
            </div>
            <div className="box" onClick={(e)=>{
              e.preventDefault();
              dispatch(logout(navigate));
            }} >
              <LogoutOutlinedIcon className='icon'/>
              <h1>Logout</h1>
            </div>
            </div>
        )}
        </div>
    </nav>
  )
}

export default Nav;
