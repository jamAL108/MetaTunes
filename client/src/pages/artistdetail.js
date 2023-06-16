import React, { useEffect , useState } from 'react'
import '../css/artistdetail.css';

import Loading from '../components/loading';
import Nav from '../components/nav';
import { useDispatch, useSelector } from 'react-redux';
import { ARTISTDETAIL } from '../redux/actiontypes';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useParams } from 'react-router-dom';
const Artistdetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state)=>state)
    const [artist,setartist]=useState({});
    const [show,setshow]=useState(false);
    const URL= "http://localhost:8000";
    const func =async()=>{
    try{
     const api =`${URL}/common/artist/${id}`;
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
       setshow(true);
       dispatch({type:ARTISTDETAIL , payload:{}});
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.artistdetail])

      return (
<div className="art">
  <Nav/>
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
            </div>
        </div>
      ) }
</div>
  )
}

export default Artistdetail;
