import React, { useEffect , useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../scss/categories.scss';
import {
    SETCURRENTTRACK , SETPLAYING , SETTRACKLIST
  } from '../redux/playertypes';
  import { useDispatch } from 'react-redux';
  import BeatLoader from "react-spinners/BeatLoader";
const Categories = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const [show,setshow]=useState(false);
  const dispatch = useDispatch();
  const [temp ,settemp]=useState({});
  useEffect(()=>{
    setshow(false);
     funct();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const URL ="https://meta-tunes.onrender.com";
  const funct= async()=>{
    try{
        const api =`${URL}/common/categories/${id}`;
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
          settemp(msg.response);
        }
     }catch(err){
       console.log(err);
     }
  }
  const [artist,setartist]=useState([]);
  const [songs,setsong]=useState([]);
  const [playlist,setplaylist]=useState([]);
  useEffect(()=>{
    if(Object.keys(temp).length!==0){
        if(temp.artist.length!==0){
            setartist(temp.artist);
        }
        if(temp.song.length!==0){
            setsong(temp.song);
        }
        if(temp.playlist.length!==0){
            setplaylist(temp.playlist);
        }
        setshow(true);
    }
  },[temp])

  const playsong = (item) => {
    let j=0;
    for(var i=0;i<songs.length;i++){
      if(songs[i]?._id === item?._id){
         j=i;
         break;
      }
    }

  dispatch({type:SETCURRENTTRACK , payload:item})
  let list =songs;
  const data ={
    list:list,
    index:j
  }
  dispatch({type:SETTRACKLIST , payload:data})
  dispatch({type:SETPLAYING , payload:true})
};
const Truncatearr=(text,length)=>{
    const widh = window.screen.width;
    if(widh<940){
    let bigtext = text.join(",");
    if(bigtext.length>length){
        return bigtext.slice(0,length)+"...";
     }else{
        return bigtext;
     }
    }else{
        return text;
    }
}
const TruncateText=(text,length)=>{
    const widh = window.screen.width;
    if(widh<940){
     if(text.length>length){
        return text.slice(0,length)+"...";
     }else{
        return text;
     }
    }else{
        return text;
    }
}
  return (
    <div className="categories">
        {show===false && (
          <div className="spin">
              <BeatLoader color="#EE4950" />
                </div>
        )}
        {show===true && (
            <div className="others">
         <div className="up">
            <ArrowBackIcon className='icon' onClick={(e)=>{
                e.preventDefault();
                navigate("/");
            }}/>
            <h1>categories</h1>
         </div>
         <div className="title">
            <h1>{id}</h1>
         </div>
         {artist.length!==0 && (
            <div className="artistsection">
                <h1>Trending Artists</h1>
                <div className="boxes">
                    {artist.map((item,idx)=>(
                        <div className="box" onClick={(e)=>{
                            e.preventDefault();
                            navigate(`/artist/${item._id}`);
                        }} key={idx}>
                            <div className="image">
                                <img src={item.imageURL} alt="fed" />
                            </div>
                            <div className="name">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
         )}
         {songs.length!==0 && (
            <div className="songsection">
            <h1>{id} Songs</h1>
            <div className="boxes">
                {songs.map((item,idx)=>(
                    <div className="box" onClick={(e)=>{
                        e.preventDefault();
                        playsong(item);
                    }} key={idx}>
                        <div className="image">
                            <img src={item.imageURL} alt="fed" />
                        </div>
                        <div className="names">
                            <h1>{TruncateText(item.name,9)}</h1>
                            <h1 className='fade'>{Truncatearr(item.artist,9)}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
         )}
        {playlist.length!==0 && (
            <div className="playlistsection">
            <h1>{id} Playlists</h1>
            <div className="boxes">
                {playlist.map((item,idx)=>(
                    <div className="box" onClick={(e)=>{
                        e.preventDefault();
                        navigate(`/playlist/${item._id}`);
                    }} key={idx}>
                        <div className="image">
                            <img src={item.image.myfile} alt="fed" />
                        </div>
                        <div className="names">
                            <h1>{item.name}</h1>
                            <h1>{item.author}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
         )}
          <div className="lineyyyyyy"></div>
         </div>
         )}
    </div>  
  )
}

export default Categories