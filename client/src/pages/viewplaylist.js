import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Nav from '../components/nav';
import PlaylistLoad from '../components/playlistload';
import '../scss/viewplaylist.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {removefavourites , addfavourites} from '../redux/action/useraction';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector } from 'react-redux';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import {
  SETCURRENTTRACK , SETPLAYING , SETTRACKLIST
} from '../redux/playertypes';
const Viewplaylist = () => {
    const { id } = useParams();
    const { currentTrack , isPlaying } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const [playlist , setplaylist]=useState({});
    const [show , setshow] = useState(false);
    const URL= "https://meta-tunes.onrender.com";
    const [temp,settemp]=useState({});
    const [array , setarray]=useState([]);
    const func =async()=>{
        try{
         const api =`${URL}/common/playlist/${id}`;
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
    useEffect(()=>{
      func();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
       if(Object.keys(temp).length!==0){
        console.log("heey");
        let songey =[];
        const songs = JSON.parse(localStorage.getItem("song"));
        let idx =[];
            for(var i=0;i<temp.songs.length;i++){
                for(var j=0;j<songs.length;j++){
                     if(temp.songs[i]===songs[j]._id){
                        songey.push(songs[j]);
                        idx[i]=songs[j].like;
                        console.log("heey");
                     }
                }
            }
            console.log(songey);
            const obj ={
                Type:temp.type,
                author:temp.author,
                name:temp.name,
                description:temp.description,
                image:temp.image,
                likes:temp.likes,
                songs:songey,
            }
            setplaylist(obj);
            setshow(true);
            setarray(idx);
       }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[temp])

    const playsong = (item) => {
      let j=0;
      for(var i=0;i<playlist.songs.length;i++){
        if(playlist.songs[i]._id=== item._id){
           j=i;
           break;
        }
      }

    dispatch({type:SETCURRENTTRACK , payload:item})
    let list =playlist.songs;
    const data ={
      list:list,
      index:j
    }
    dispatch({type:SETTRACKLIST , payload:data})
    dispatch({type:SETPLAYING , payload:true})
  };
  return (
    <div className="Viewplaylist">
        <Nav/>
        <ToastContainer />
        <div className="others">
            {show===false &&(
                <PlaylistLoad/>
            )}
            {show===true &&(
                <>
            <div className="heading">
                <div className="image">
                    <img src={playlist.image.myfile} alt="url" />
                </div>
                <div className="names">
                    <p>From - <span>{playlist.author}</span></p>
                    <h1>{playlist.name}</h1>
                    <p className='desc'>{playlist.description}</p>
                </div>
                <div className="below">
                {user && user.username===playlist.author &&(
                    <button><BorderColorIcon className='icon'/> Edit</button>
                )}
                {user && user.username!==playlist.author &&(
                    <FavoriteBorderIcon/>
                )}
                <div className="likes">
                   {playlist.likes} likes
                </div>
                </div>
            </div>
            <div className="down">
              <div className="up">
                <h1>Songs</h1>
                <div className="play">
                  <PlayArrowIcon/>
                <h1 onClick={(e)=>{
                  e.preventDefault();
                  if(playlist.songs.length!==0){
                  playsong(playlist.osngs[0]);
                  }
                }} > Play All</h1>
                </div>
              </div>
              <div className="dash"></div>
                <div className="songlist">
                     {playlist.songs.map((item,idx)=>(
                                            <div className="box" key={idx} >
                                            <div className="left">
                                            <div className="image">
                                            <img src={item.imageURL} alt="pic" />
                                            </div>
                                            <div className="main">
                                            <div className="names">
                                              <h2>{item.name}</h2>
                                              <p>{item.artist}</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="right">
                                            {currentTrack?._id ===item._id && isPlaying  ? (
                                                   <h1 className='playing'><GraphicEqIcon className='icon'/>playing</h1>
                                            ): (
                                              <PlayCircleIcon className='play' onClick={(e)=>{
                                                e.preventDefault();
                                                playsong(item);
                                              }} />
                                            )}
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
            </>
            )}
             <div className="lineyyyyyy"></div>
             <div className="lineyyyyyy"></div>
        </div>
    </div>
  )
}

export default Viewplaylist