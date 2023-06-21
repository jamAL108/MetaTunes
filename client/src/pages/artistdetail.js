import React, { useEffect , useState  } from 'react'
import '../css/artistdetail.css';

import Loading from '../components/loading';
import Nav from '../components/nav';
import { useDispatch, useSelector } from 'react-redux';
import { ARTISTDETAIL } from '../redux/actiontypes';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useParams } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {removefavourites , addfavourites} from '../redux/action/useraction';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import {
  SETCURRENTTRACK , SETPLAYING , SETTRACKLIST
} from '../redux/playertypes';
const Artistdetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { currentTrack , isPlaying } = useSelector((state) => state.player);
  const store = useSelector((state)=>state);
  const user = JSON.parse(localStorage.getItem("user"));
  const [array , setarray]=useState([]);
    const [artist,setartist]=useState({});
    const [show,setshow]=useState(false);
    const URL= "https://meta-tunes.onrender.com";
    const func =async()=>{
    try{
      const obj={
        username:""
      }
      if(!user){
         obj.username="";
      }else{
         obj.username=user.username
      }
     const api =`${URL}/common/artist/${id}`;
     const res = await fetch(api,{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
       },
       body: JSON.stringify(obj)
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
useEffect(()=>{
  setshow(false); 
  func();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    useEffect(()=>{
   console.log(store.props.artistid);
    },[store.props.artistid])
    useEffect(()=>{
   if(Object.keys(store.user.artistdetail).length!==0){
       setartist(store.user.artistdetail);
       dispatch({type:ARTISTDETAIL , payload:{}});
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.artistdetail])
    useEffect(()=>{
      if(Object.keys(artist).length!==0){
      let iddx =[];
      const song = JSON.parse(localStorage.getItem("song"));
      for(var i=0;i<artist.songs.length;i++){
       iddx[i]=artist.songs[i].like;
       for(var j=0;j<song.length;j++){
        let name =artist.songs[i].name;
        if(name===song[j].name){
          artist.songs[i].idx=song[j].idx;
        }
       }
      }
      console.log(artist.songs);
      setarray(iddx);
      setshow(true);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[artist])

    const playsong = (item) => {
      // dispatch({type:SETPLAYING , payload:false})
      console.log(store.player.currentTrack);
      let j=0;
      for(var i=0;i<artist.songs.length;i++){
        if(artist.songs[i]._id=== item._id){
           j=i;
           break;
        }
      }

    dispatch({type:SETCURRENTTRACK , payload:item})
    let list =artist.songs;
    const data ={
      list:list,
      index:j
    }
    dispatch({type:SETTRACKLIST , payload:data})
    dispatch({type:SETPLAYING , payload:true})
    console.log("done");
  };

      return (
<div className="art">
  <Nav/>
  <ToastContainer />
      {show===false && Object.keys(artist).length===0 && (
        <Loading/>
      )}
      {show===true && Object.keys(artist).length!==0 && (
        <div className="others">
          <div className="headery">
            <div className="imagee">
              <img src={artist.artist.imageURL} alt="hey" />
            </div>
            <div className="info">
              <h1>{artist.artist.name}</h1>
              <p>{artist.artist.note}</p>
            </div>
          </div>
          <div className="lineyy"></div>
          <div className="down">
              <div className="up">
                <h1>Songs</h1>
                <div className="play">
                  <PlayArrowIcon/>
                <h1 > Play All</h1>
                </div>
              </div>
              <div className="dash"></div>
              <div className="songlist">
                {artist.songs.map((item,idx)=>(
                    <div className="box"   key={idx} >
                      <div className="left">
                      <div className="image">
                      <img src={item.imageURL} alt="pic" />
                      </div>
                      <div className="main">
                      <div className="names">
                        <h2>{item.name}</h2>
                        </div>
                        <div className="downery">
                          <div className="items">
                            <HeadphonesRoundedIcon className='icon'/> {item.totalstream}
                          </div>
                          <div className="items">
                            <FavoriteRoundedIcon className='icon'/> {item.totallikes}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      { ( currentTrack?._id === item._id && isPlaying )  ?  (
                       <h1 className='playing'><GraphicEqIcon className='icon'/>playing</h1>
                        ) : (
                      <PlayCircleIcon className='play' onClick={(e)=>{
                        e.preventDefault();
                        playsong(item)}
                        } />)}
                      {array[idx]===false && user && (
                      <FavoriteBorderIcon className='nolike' onClick={(e)=>{
                        e.preventDefault();
                        toast.success("Your favourites have been updated", {
                          position: toast.POSITION.TOP_CENTER,
                          draggablePercent: 60,
                          autoClose:500,
                          hideProgressBar:true
                        });
                        let arr = [...array];
                        arr[idx]=true;
                        setarray(arr); 
                        item.totallikes++;   
                        const temp = JSON.parse(localStorage.getItem("song"));
                        temp[item.idx].like=true;
                        temp[item.idx].totallikes++;
                        localStorage.setItem("song",JSON.stringify(temp));
                        const obj={
                           person:user.username,
                           id:item._id
                        }
                        dispatch(addfavourites(obj))
                      }} />
                      )}
                      {array[idx]=== true && user &&(
                      <FavoriteIcon className='like' onClick={(e)=>{
                        e.preventDefault();
                        toast.success("Your favourites have been updated", {
                          position: toast.POSITION.TOP_CENTER,
                          draggablePercent: 60,
                          autoClose:500,
                          hideProgressBar:true
                        });
                        let arr = [...array];
                         arr[idx]=false;
                         setarray(arr); 
                         item.totallikes--;
                        const temp = JSON.parse(localStorage.getItem("song"));
                        temp[item.idx].like=false;
                        temp[item.idx].totallikes--;
                        localStorage.setItem("song",JSON.stringify(temp));
                        const obj={
                          person:user.username,
                          id:item._id
                       }
                       dispatch(removefavourites(obj))
                      }} />
                      )}
                    </div>
                    </div>
                ))}
              </div>
            </div>
        </div>
      ) }
</div>
  )
}

export default Artistdetail;
