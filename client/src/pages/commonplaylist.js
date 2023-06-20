import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BeatLoader from "react-spinners/BeatLoader";
import Nav from '../components/nav';
import '../css/commonplaylist.css';
import { commonplaylist } from '../redux/action/useraction';
import { COMMONPLAYLIST } from '../redux/actiontypes';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../components/popup';
import { CANCEL } from '../redux/propsaction';
const CreatePlaylist = () => {
    const dispatch = useDispatch();
    const [spin,setspin]=useState(false);
    const navigate = useNavigate();
    const store = useSelector((state)=>state);
    const [playlists,setplaylists] = useState([]);
    const [popup , setpopup]=useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        dispatch(commonplaylist());
        setspin(true);
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(store.user.commonplaylist.length!==0){
            setplaylists(store.user.commonplaylist);
            setspin(false);
            dispatch({type:COMMONPLAYLIST , payload:[]});
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.commonplaylist]);
    useEffect(()=>{
       if(store.props.cancel===true){
        setpopup(false);
        dispatch({type:CANCEL , payload:false});
       }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.props.cancel])
  return (
     <div className="createplaylist">
        <Nav/>
        {popup===true &&(
            <Popup/>
        )}
         {spin===true &&(
            <div className="spin">
                 <BeatLoader color="#EE4950" />
            </div>
         )}
         {spin===false &&(
            <div className="others">
                 <div className="heading">
                    <h1>Playlists</h1>
                    <p>Here are some curated playlist from users</p>
                 </div>
                 <div className="lineey"></div>
                 <div className="playlistsss">
                      <div className="addplay" onClick={(e)=>{
                           e.preventDefault();
                           if(!user){
                               setpopup(true);
                           }else{
                           navigate('/addplaylist');
                           }
                    }}>
                      <div className="icon">
                      <AddIcon className="adddd"/>
                      </div>
                      <p>Create new Playlist</p>
                    </div>
                    {playlists.map((item,idx)=>(
                      <div className="box" onClick={(e)=>{
                        e.preventDefault();
                        console.log(item);
                        navigate(`/playlist/${item._id}`);
                      }}  key={idx}>
                        <div className="image">
                        <img src={item.image.myfile} alt='piic'/>
                        </div>
                        <div className="names">
                        <h1>{item.name}</h1>
                        {(user && user.username===item.author) ?
                          <p>You</p>
                         : 
                         <p>{item.author}</p>
                        }
                        </div>
                      </div>
                    ))}
                   </div>
            </div>
         )}
     </div>
  )
}

export default CreatePlaylist;