import React,{useEffect,useState} from 'react'
import Loginalert from '../components/loginalert';
import '../scss/playlist.scss';
import Nav from '../components/nav';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LOGINCOLOR } from '../redux/propsaction';
import { getplaylists } from '../redux/action/useraction';
import { EMPTYPLAYS, PLAYLISTS } from '../redux/actiontypes';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
const Playlist = () => {
  const [auth , setauth] = useState(false);
  const error="please login to see your playlist";
  const [spin,setspin] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const extrabeat_user = JSON.parse(localStorage.getItem("user"));
    if(extrabeat_user){
      setauth(true);
      setspin(true);
      const obj={
        person:extrabeat_user.username
      }
      dispatch(getplaylists(obj));
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const store= useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
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
useEffect(()=>{
  if(window.location.href.includes('playlist')){
  const data = JSON.parse(localStorage.getItem("sidebar"));
  data.index=3;
  localStorage.setItem("sidebar",JSON.stringify(data));
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
const [playlists,setplaylists]=useState([]);
useEffect(()=>{
   if(store.user.playlists.length!==0){
     setspin(false);
     setplaylists(store.user.playlists);
     dispatch({type:PLAYLISTS, payload:[]})
   }
      // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.user.playlists])
useEffect(()=>{
  if(store.user.emptyplay===true){
      setspin(false);
      dispatch({type:EMPTYPLAYS,payload:false});
  }
     // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.user.emptyplay])
  return (
     <div className="playlist">
         <Nav/>
         {auth===false &&(
          <Loginalert query={error} />
         )}
         {auth===true &&(
          <div className="others">
               {spin===true &&(
                     <div className='spin'>
                      <BeatLoader color="#EE4950" />
                           </div>
            )}
            {spin===false &&(
               <>
                <div className="heading">
                <h1>Your Playlists</h1>
                <p>Create Playlists and enjoyyy..</p>
              </div>
              <div className="lineyyyyyyy"></div>
                {playlists.length===0 && (
                  <div className="sub">
                    <h1 className='noplay'><ErrorIcon/>You Haven't made any playlists yet...</h1>
                    <div className="addplay" onClick={(e)=>{
                           e.preventDefault();
                           navigate('/addplaylist');
                    }} >
                      <div className="icon">
                        <AddIcon className="adddd"/>
                        </div>
                        <p>Create new Playlist</p>
                    </div>
                    </div>
                )}
                {playlists.length!==0 &&(
                   <div className="playlistsss">
                      <div className="addplay" onClick={(e)=>{
                           e.preventDefault();
                           navigate('/addplaylist');
                    }}>
                      <AddIcon className="adddd"/>
                      <p>Create new Playlist</p>
                    </div>
                    {playlists.map((item,idx)=>(
                      <div className="box" onClick={(e)=>{
                        e.preventDefault();
                        console.log(item);
                        navigate(`/playlist/${item._id}`);
                      }} key={idx}>
                        <div className="image">
                        <img src={item.image.myfile} alt='piic'/>
                        </div>
                        <div className="names">
                        <h1>{item.name}</h1>
                        <p>{item.author}</p>
                        </div>
                      </div>
                    ))}
                   </div>

                )}
                </>
            )}
             <div className="lineyyyyyy"></div>
             <div className="lineyyyyyy"></div>
          </div>
         )}
     </div>
  )
}
export default Playlist;