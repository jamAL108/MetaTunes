import React,{useEffect,useState} from 'react'
import Loginalert from '../components/loginalert';
import '../css/favourites.css';
import Nav from '../components/nav';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LOGINCOLOR } from '../redux/propsaction';
import {getfavourites , removefavourites} from '../redux/action/useraction';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FAVLOADING from '../components/favloading';
import { EMPTYFAVS, FAVOURITES } from '../redux/actiontypes';
const Favourities = () => {
  const store= useSelector((state)=>state);
  const dispatch = useDispatch();
  const [favourite,setfavourite] = useState([]);
  const [spin,setspin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("sidebar"));
    console.log(data);
    if(data.index!==2){
    data.index=2;
    localStorage.setItem("sidebar",JSON.stringify(data));
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    console.log(store.props.logincolor);
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

  const [auth , setauth] = useState(false);
  const error="please login to see your favourites";
  useEffect(()=>{
    const extrabeat_user = JSON.parse(localStorage.getItem("user"));
    if(extrabeat_user){
      setauth(true);
      setspin(true);
      const obj={
        person:extrabeat_user.username
      }
      dispatch(getfavourites(obj));
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [array , setarray] = useState([]);
  useEffect(()=>{
      if(store.user.favourites.length!==0){
          setarray(store.user.favourites);
          console.log(store.user.favourites);
          dispatch({type:FAVOURITES, payload:[]})
        
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.user.favourites])

  useEffect(()=>{
      if(array.length!==0){
        const song = JSON.parse(localStorage.getItem("song"));
        let temp = [...array];
        for(var i=0;i<temp.length;i++){
         for(var j=0;j<song.length;j++){
          let name =temp[i].name;
          if(name===song[j].name){
            temp[i].idx=song[j].idx;
          }
         }
        }
        setfavourite(temp);
        setspin(false);
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[array])
  useEffect(()=>{
    if(store.user.emptyfav===true){
      console.log("heuekjv");
      dispatch({type:EMPTYFAVS,payload:false});
      setspin(false);
    }
          // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.user.emptyfav])
  return (
     <div className="favourites">
         <Nav/>
         {auth===false &&(
          <Loginalert query={error} />
         )}
         {auth===true &&(
          <div className="others">
           {spin===true &&(
                <FAVLOADING/>
            )}
            {spin===false &&(
              <>
              <div className="heading">
                <h1>Favourite Songs</h1>
                <p>Your favourite song</p>
              </div>
              <div className="lineyyyyyyy"></div>
              {favourite.length===0 && spin===false  &&(
                <h2 className='nosong'>you have'nt liked any song yet...</h2>
              )}
              {favourite.length!==0 && spin===false &&(
  <div className="songlistyy">
  {favourite.map((item,idx)=>(
      <div className="box" key={idx} >
        <div className="left">
        <div className="image">
        <img src={item.imageURL} alt="pic" />
        </div>
        <div className="names">
          <h2>{item.name}</h2>
          <p>{item.artist}</p>
        </div>
      </div>
      <div className="right">
        <PlayCircleIcon className='play' />
        { user &&(
        <FavoriteIcon className='like' onClick={(e)=>{
          e.preventDefault();
          const temp = JSON.parse(localStorage.getItem("song"));
          temp[item.idx].like=false;
          let small = [...favourite];
          small.splice(idx,1);
          setfavourite(small);
          localStorage.setItem("song",JSON.stringify(temp));
          const obj={
            person:user.username,
            id:item._id
         }
         dispatch(removefavourites(obj));
        }} />
        )}
      </div>
      </div>
  ))}
</div>
              )}
              </>
              )}
          </div>
         )}
     </div>
  )
}
export default Favourities;