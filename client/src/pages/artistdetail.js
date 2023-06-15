import React, { useEffect , useState } from 'react'
import '../css/artistdetail.css';
import Loading from '../components/loading';
import Nav from '../components/nav';
import { useDispatch, useSelector } from 'react-redux';
import { ARTISTDETAIL } from '../redux/actiontypes';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const Artistdetail = () => {
  const dispatch = useDispatch();
  const store = useSelector((state)=>state)
    const [artist,setartist]=useState({});
    const [show,setshow]=useState(false);
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
          <div className="header">
            <div className="image">
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