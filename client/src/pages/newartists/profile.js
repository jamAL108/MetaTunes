import React, { useEffect, useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import Nav from '../../components/nav';
import Loginalert from '../../components/loginalert';
import './profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getdetails } from '../../redux/action/useraction';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [auth , setauth] = useState(false);
    const [spin,setspin] = useState(false);
    const store = useSelector((state)=>state);
    const error = "Please Login to See Your Profile"
    const [detail,setdetail] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(()=>{
        const extrabeat_user = JSON.parse(localStorage.getItem("user"));
        if(extrabeat_user){
          setauth(true);
          setspin(true);
          const obj={
            person:extrabeat_user.username
          }
          dispatch(getdetails(obj));
        }
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
       if(Object.keys(store.user.userdetails).length!==0){
        console.log(store.user.userdetails)
         setdetail(store.user.userdetails)
         setspin(false)
       }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.userdetails])

  return (
    <div className="Profile">
         <Nav/>
         {auth===false &&(
          <Loginalert query={error} />
         )}
         {auth===true &&(
        <div className="others">
        {spin===true ? (
                <div className='spin'>
                <BeatLoader color="#EE4950" />
                </div>
        ): 
        <>
        <div className="heading">
            <h1>Profile</h1>
            <p>All your Details Related to this App.</p>
        </div>
        <div className="lineey"></div>
        <div className="main">
          <div className="left">
             <h2>Username : {detail.data.username}</h2>
             <p>Liked songs : {detail.data.favourites.length}</p>
             <p>Yours Playlists : {detail.data.playlist.length}</p>
          </div>
          <div className="right">
              {detail.isArtist===false ? (
                <>
                 <h3>Become an Artist , upload Your Songs here and earn money</h3>
                 <button onClick={(e)=>{
                   e.preventDefault()
                   navigate("/createartist")
                 }}>Become an Artist</button>
                 </>
              ) : (
                <h1>hello</h1>
              )}
          </div>
        </div>
        </> 
        }  
        </div>
         )}
    </div>
  )
}

export default Profile