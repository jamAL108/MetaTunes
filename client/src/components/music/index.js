import { useEffect, useRef, useState } from "react";
// import {
// 	Button,
// 	Flex,
// 	Hide,
// 	SimpleGrid
// } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import {
	NEXTTRACK,
	PREVTRACK,
	SETPLAYING,
} from '../../redux/playertypes';
import {
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled
} from "react-icons/tb";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { addfavourites , removefavourites } from "../../redux/action/useraction";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const MusicPlayer = () => {
	const audioref = useRef(null);
	const dispatch = useDispatch();
	const store =
		useSelector((state) => state);
	const isEndOfTracklist = store.player.currentIndex === store.player.trackList.length - 1;
	//eslint-disable-next-line
	const [audioPlaying, setAudioPlaying] = useState(
		audioref?.current && audioref.current?.playing
	);
	const [helper,sethelper]=useState(false);
	useEffect(()=>{
      const play = JSON.parse(localStorage.getItem("play"));
	  if(play){
		console.log("nkwrwbekrsvb");
		sethelper(true);
		console.log(helper);
	  }
	    // eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
    const [like,setlike]=useState(false);
	useEffect(()=>{
        console.log(audioref.current?.playing);
	},[audioref.current?.playing])

    const user = JSON.parse(localStorage.getItem("user"));

	useEffect(()=>{
         if(audioPlaying){
			console.log("nkjerbvwui3rhi73folfi");
			dispatch({type:SETPLAYING , payload:true});
		 }else{
			dispatch({type:SETPLAYING , payload:false});
		 }
		   // eslint-disable-next-line react-hooks/exhaustive-deps
	},[audioPlaying])

	useEffect(()=>{
       if(store.player.isPlaying===true){
		  Play();
		  console.log("hgewyjefr");
		    // eslint-disable-next-line react-hooks/exhaustive-deps
	   }
	},[store.player.isPlaying])

	useEffect(()=>{
        audioref.current.currentTime=0;
		setlike(store.player.currentTrack?.like);
		console.log(like);
		Play();
		console.log(store.player.currentTrack.artist);
		  // eslint-disable-next-line react-hooks/exhaustive-deps
	},[store.player.currentTrack?._id])

	const Play =async()=>{
		await audioref.current?.play();
	}
	const Pause =async()=>{
		await audioref.current?.pause();
	}
   
	const handlepalypause = ()=>{
		if(store.player.isPlaying){
			Pause();
			dispatch({type:SETPLAYING , payload:false});
		}else{
			Play();
			dispatch({type:SETPLAYING , payload:true});
		}
	}

	const handleNextSong = () => {
		if (store.player.trackList.length === 1) {
			restartSong();
		} else {
			dispatch({type:NEXTTRACK});
		}
	};

	const handlePreviousSong = () => {
		if (store.player.trackList.length === 1) {
			restartSong();
		} else {
			dispatch({type:PREVTRACK});
		}
	};

	const restartSong = () => {
		audioref.current.currentTime = 0;
		audioref.current.play();
	};

	const handleEnded = () => {
		switch (store.player.repeatStatus) {
			case "OFF":
				if (!isEndOfTracklist) {
					handleNextSong();
				}
				break;
			case "TRACKLIST":
				handleNextSong();
				break;
			case "SINGLE":
				audioref.current.play();
				break;

			default:
				break;
		}
	};
	const TruncateText=(text,length)=>{
         if(text.length>length){
			return text.slice(0,length)+"...";
		 }else{
			return text;
		 }
	}
	const Truncatearr=(text,length)=>{
		let bigtext = text.join(",");
		if(bigtext.length>length){
			return bigtext.slice(0,length)+"...";
		 }else{
			return bigtext;
		 }
	}
	return (
		<>   
			<div className="music">
				<div className="left">
					<div className="image">
						<img src={store.player.currentTrack?.imageURL} alt="piccy" />
					</div>
					<div className="names">
						<h1>{TruncateText(store.player.currentTrack?.name,9)}</h1>
						<p>{Truncatearr(store.player.currentTrack?.artist,9)}</p>
					</div>
				</div>
				<div className="middle">
				<button>
				<TbPlayerTrackPrevFilled onClick={handlePreviousSong} className="iconey" />
			</button>
			<button>
				{!store.player.isPlaying  ? <AiFillPlayCircle className="icon" onClick={(e)=>{
					e.preventDefault();
                     handlepalypause();
				}} /> : <AiFillPauseCircle className="icon" onClick={(e)=>{
					e.preventDefault();
					handlepalypause();
				}} />}
			</button>
			<button>
				<TbPlayerTrackNextFilled onClick={handleNextSong}  className="iconey" size={16} />
			</button>
				</div>
				<div className="right">
                  {like===false && user &&(
                  <FavoriteBorderIcon className='nolike' onClick={(e)=>{
                     e.preventDefault();
                     toast.success("Your favourites have been updated", {
                      position: toast.POSITION.TOP_CENTER,
                      draggablePercent: 60,
                      autoClose:500,
                      hideProgressBar:true
                    });
                     setlike(true);           
                     const temp = JSON.parse(localStorage.getItem("song"));
                     temp[store.player.currentTrack.idx].like=true;
                     temp[store.player.currentTrack.idx].totallikes++;
                     localStorage.setItem("song",JSON.stringify(temp));
                     const obj={
                        person:user.username,
                        id:store.player.currentTrack?._id
                     }
                     dispatch(addfavourites(obj))
                  }} />
                  )}
                  {like===true && user &&(
                    <FavoriteIcon className='like'  onClick={(e)=>{
                    e.preventDefault();
                    toast.success("Your favourites updated", {
                      position: toast.POSITION.TOP_CENTER,
                      draggablePercent: 60,
                      autoClose:500,
                      hideProgressBar:true
                    });
					setlike(false);
                    const temp = JSON.parse(localStorage.getItem("song"));
                    temp[store.player.currentTrack.idx].like=false;
                    temp[store.player.currentTrack.idx].totallikes--;
                    localStorage.setItem("song",JSON.stringify(temp));
                    const obj={
                      person:user.username,
                      id:store.player.currentTrack?._id
                   }
                   dispatch(removefavourites(obj))
                    }}/>
                  )}
                </div>
				<audio
				     ref={audioref}
					 src={store.player.currentTrack?.songURL} 
					 onEnded={handleEnded}
					 autoPlay={false}
					 >
				</audio>
				</div>
		</>
	);
};
export default MusicPlayer;