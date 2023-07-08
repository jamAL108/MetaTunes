import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import {
	NEXTTRACK,
	PREVTRACK,
	SETPLAYING,
} from '../../redux/playertypes';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import  SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const MusicPlayer = () => {
	const audioref = useRef(null);
	const dispatch = useDispatch();
	const store =
		useSelector((state) => state);
	const isEndOfTracklist = store.player.currentIndex === store.player.trackList.length - 1;
	
	const [songDetails, setSongDetails] = useState(null);
	//eslint-disable-next-line
	const [audioPlaying, setAudioPlaying] = useState(
		audioref?.current && !audioref?.current?.paused
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
        console.log("nissssssssss");
	},[audioref?.current?.playing])

    // const user = JSON.parse(localStorage.getItem("user"));
	useEffect(()=>{
         if(audioPlaying){
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
		setSongDetails((prev) => {
			return { ...prev, time: 0 };
		});
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

	useEffect(() => {
		setSongDetails({
			volume: 1,
			time: audioref?.current
				? Math.round(
						(audioref?.current.currentTime / audioref?.current.duration) * 100
				  ) // eslint-disable-line no-mixed-spaces-and-tabs
				: 0,
			shuffle: false,
			repeat: false,
		});
	 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audioref.current]);

	const seekPoint = (e) => {
		audioref.current.currentTime = (e.target.value / 100) * audioref.current.duration;

		setSongDetails((prev) => ({
			...prev,
			time: Math.round(
				(audioref.current.currentTime / audioref.current.duration) * 100
			),
		}));
	};


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
			return text.join(",");
		}
	}
	const convertToMins = (value) => {
		const mins = Math.floor(value / 60);
		const secs = Math.round(value - mins * 60, 2);
		const formattedSeconds = secs < 10 ? "0" + secs : secs;
		return `${mins}:${formattedSeconds}`;
	};
	const [show,setshow]=useState(false);
	const bigscreeen=()=>{
		if(window.screen.width<900){
			const music = document.querySelector(".music");
			document.body.style.overflowY="hidden";
			music.classList.add("up");
				setshow(true);
		}
	};
	useEffect(()=>{
       if(show===false){
		const music = document.querySelector(".music");
		if(music.classList.contains("up")){
		music.classList.remove("up");
		}
	   }
	},[show])
    const addcomma= (name)=>{
         return name.join(", ");
	}

	return (
			<div className="music" onClick={(e)=>{
				e.preventDefault();
				console.log(audioref.current.currentTime);
				console.log(audioref.current?.duration);
				bigscreeen();
			}} >
				{show === true && (
					<>
					<div className="big"
					style={{
			backgroundImage: `url(${store.player.currentTrack?.imageURL})`,
			filter: "blur(70px)",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			minHeight:"100vh",
			minWidth:"100vw",
			transform:"scale(1.2)",
		}}>
					</div>
					<div className="iconss">
                    <KeyboardArrowDownIcon className="iconeeyy" onClick={(e)=>{
					    e.preventDefault();
						e.stopPropagation();
						document.body.style.overflowY="scroll";
						console.log("nwuegfi3ufhowf");
						setshow(false);
					}} />
					<h1>now playing</h1>
					</div>
					<div className="boxie"></div>
					</>
				)}
				<div className="left">
					<div className="image">
						<img src={store.player.currentTrack?.imageURL} alt="piccy" />
					</div>
					<div className="names">
						<h1 className="h1">{show===false ? TruncateText(store.player.currentTrack?.name,9) : store.player.currentTrack?.name }</h1>
						<p className="p">{show===false ? Truncatearr(store.player.currentTrack?.artist,9) : addcomma(store.player.currentTrack?.artist) }</p>
					</div>
				</div>
				{show === true &&(
				     <div className="plain">
					 <Box className='slide' width={300}>
					 <Slider className="dabba" defaultValue={0} onChange={seekPoint}
				value={!isNaN(songDetails?.time) ? songDetails?.time : 0} aria-label="Default" valueLabelDisplay="off" sx={{ color: "#E4E4E6" , height:"4px" }} />
				   </Box>
				   <div className="down">
				   <h1>
				{audioref.current ? convertToMins(audioref.current?.currentTime) : "0:00"}
			</h1>
			<h1>
					{audioref.current ? convertToMins(audioref.current?.duration) : "0:00"}
					</h1>
				   </div>
				   </div>
				)}
				<div className="middle">
				<button>
				<SkipPreviousIcon onClick={(e)=>{
					e.preventDefault();
					e.stopPropagation();
					handlePreviousSong();
				}} className="iconey" />
			</button>
			<button className="bttttn">
				{!store.player.isPlaying  ? <PlayArrowIcon  className="icon" onClick={(e)=>{
					e.preventDefault();
					e.stopPropagation();
                     handlepalypause();
				}} /> : <PauseIcon className="icon" onClick={(e)=>{
					e.preventDefault();
					e.stopPropagation();
					handlepalypause();
				}} />}
			</button>
			<button>
				<SkipNextIcon  onClick={(e)=>{
					e.preventDefault();
					e.stopPropagation();
					handleNextSong();
				}}  className="iconey" size={16} />
			</button>
				</div>
				{/* <div className="right">
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
                </div> */}
				<audio
				     ref={audioref}
					 src={store.player.currentTrack?.songURL} 
					 onEnded={handleEnded}
					 onPause={() => setAudioPlaying(false)}
					 onPlay={() => setAudioPlaying(true)}
					 onTimeUpdate={() => {
						setSongDetails((prev) => ({
							...prev,
							time: Math.round(
								(audioref.current.currentTime / audioref.current.duration) *
									100
							),
						}));
					}}
					 >
				</audio>
				</div>
	);
};
export default MusicPlayer;
