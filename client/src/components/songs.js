import React, { useEffect , useState } from 'react'
import './songs.css';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import { addfavourites , removefavourites } from '../redux/action/useraction';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getallsong } from '../redux/action/useraction';
import {
  SETCURRENTTRACK , SETPLAYING , SETTRACKLIST
} from '../redux/playertypes';
const Song = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const store = useSelector((state)=>state);
  const [songs,setsongs]=useState([]);
    const [show,setshow]=useState(false);
    const [array , setarray]=useState([]);
    const [random , setrandom]=useState([]);

    // const { currentTrack, isPlaying } = useSelector((state) => state.player);

    
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
      if(store.user.allsong.length!==0){
        let dat = store.user.allsong;
        for(var i=0;i<dat.length;i++){
          dat[i].idx=i;
        }
        const data = dat;
        localStorage.setItem("song",JSON.stringify(data));

        let iddx =[];
        let randoms=[];
        let j=0;
        while(randoms.length!==8){
         const randomsong = data[(Math.floor(Math.random() * (data.length)))];
         if(randoms.indexOf(randomsong) === -1 && (randomsong.language==="english" || randomsong.language==="hindi")){
           randoms.push(randomsong);
         iddx[j]=randomsong.like;
         j++;
         }
        }
        setrandom(randoms);
        setarray(iddx);
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.allsong])

    useEffect(()=>{
      if(random.length!==0){
      let temp = [...random];
       for(var i=0;i<temp.length;i++){
        if(temp[i].name.length>14){
           temp[i].dummytitle=temp[i].name.substring(0,12)+"...";
        }else{
          temp[i].dummytitle=temp[i].name;
        }
        let artistss="";
        for(var k=0;k<temp[i].artist.length;k++){
           artistss+=temp[i].artist[k]+",";
        }
        var temp1 = artistss.substring(0,artistss.length-1);
        if(temp1.length>13){
          temp[i].dummyartist=temp1.substring(0,12)+"...";
          console.log(temp1);
       }else{
         temp[i].dummyartist=temp1;
       }
      }
      setsongs(temp);
      setshow(true);
    }
                // eslint-disable-next-line react-hooks/exhaustive-deps
    },[random])

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

  return (
    <div className="songs">
       <ToastContainer />
       <div className="heading">
          <h1>You may like <PlayCircleIcon className='play' /></h1>
         <p onClick={(e)=>{
            e.preventDefault();
           navigate('/artist');
            }} >see more</p>
            </div>
            {show===false &&(
                    <div className='spin'>
                    <ColorRing
                      visible={true}
                      height="90"
                      width="90"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#EE4950','#EE4950','#EE4950','#EE4950','#EE4950']}
                    />
                          </div>
            )}
       {show===true &&(
        <>
            <div className="items">
            {songs.map((item,idx)=>(
              <div className="boxzzy" key={idx}   onClick={(e)=>{
                playsong(item);
              }} >
              <div className="image" >
       <img src={item.imageURL}
 alt={item.name} />
   </div>       
   <div className="below">
    <div className="left">
                <h2>{item.dummytitle}</h2>
                <p className="ppp">
                  {item.dummyartist}
                </p>
                </div>
                <div className="right">
                  {array[idx]===false && user &&(
                  <FavoriteBorderIcon className='nolike' onClick={(e)=>{
                     e.preventDefault();
                     e.stopPropagation();
                     toast.success("Your favourites have been updated", {
                      position: toast.POSITION.TOP_CENTER,
                      draggablePercent: 60,
                      autoClose:500,
                      hideProgressBar:true
                    });
                     let arr = [...array];
                     arr[idx]=true;
                     setarray(arr);            
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
                  {array[idx]===true && user &&(
                    <FavoriteIcon className='like'  onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    toast.success("Your favourites updated", {
                      position: toast.POSITION.TOP_CENTER,
                      draggablePercent: 60,
                      autoClose:500,
                      hideProgressBar:true
                    });
                    let arr = [...array];
                     arr[idx]=false;
                     setarray(arr); 
                    const temp = JSON.parse(localStorage.getItem("song"));
                    temp[item.idx].like=false;
                    temp[item.idx].totallikes--;
                    localStorage.setItem("song",JSON.stringify(temp));
                    const obj={
                      person:user.username,
                      id:item._id
                   }
                   dispatch(removefavourites(obj))
                    }}/>
                  )}
                </div>
                </div>
                </div>
            ))}
           </div>
           </>
       )}
      </div>
  );
}

export default Song;
