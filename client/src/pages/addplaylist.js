import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Nav from '../components/nav';
import AddIcon from '@mui/icons-material/Add';
import '../css/addplaylist.css';
import $ from 'jquery';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BeatLoader from "react-spinners/BeatLoader";
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { createplaylist } from '../redux/action/useraction';
import { PLAYLISTCREATED } from '../redux/actiontypes';

const Addplaylist = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [coverpic,setcoverpic] = useState({
        name:"",
        myfile:""
    })
    const [info , setinfo] = useState({
      name:"",
      description:"",
      toggle:false
    })
    const song = JSON.parse(localStorage.getItem("song"));
    const [selected , setselected]=useState([]);
    const [songs,setsongs]=useState([]);
    const [mainsongs,setmainsongs]=useState([]);
    useEffect(()=>{
     let arr=[...song];
     for(var i=0;i<song.length;i++){
         arr[i].added=false;
     }
     setsongs(arr);
     setmainsongs(arr);
               // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
      console.log(selected)
    },[selected])
    useEffect(()=>{
       if(!user){
        toast.warn("PLease login to create playlists", {
            position: toast.POSITION.TOP_CENTER,
            draggablePercent: 60,
            autoClose:2000,
            hideProgressBar:false
          });
          navigate("/");
       }else{
          handledefault();
       }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handledefault=async(e)=>{
        setcoverpic({...coverpic , myfile:"https://firebasestorage.googleapis.com/v0/b/metatunes-2195e.appspot.com/o/musiccoverpic%2Fdefault_cover.jpg?alt=media&token=19ea7923-6e55-41b7-887c-3467f056aadf" , name:"default"});
      }
    const handlecoverpic=async(e)=>{
        const file= e.target.files[0];
        const base64 = await convertbase64(file);
        setcoverpic({...coverpic , myfile:base64 , name:file.name});
      }
     function convertbase64(file){
          return new Promise((resolve,reject)=>{
            const filereader = new FileReader();
            filereader.readAsDataURL(file);
            filereader.onload=()=>{
                resolve(filereader.result);
            };
            filereader.onerror=(error)=>{
                reject(error);
            }
          })
     }
     $("#profileImage").unbind("click").bind("click",function(e) {
      e.preventDefault();
      console.log("helo");
      $("#imageUpload").click();
  });

  const [songlist,setsonglist]=useState([]);
  useEffect(()=>{
     if(songs.length!==0){
      let array=[];
      for(var i=1;i<=5;i++){
      const randomsong = songs[(Math.floor(Math.random() * (songs.length)))];
      if(array.indexOf(randomsong)===-1){
        array.push(randomsong);
      }
         console.log("hey");
      }
      setsonglist(array);
      showBoxes();
     }
          // eslint-disable-next-line react-hooks/exhaustive-deps
  },[songs])




  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const refresh =async()=>{
   
    let arr=[];
    setsonglist(arr);
    await delay(1400); // 3000 milliseconds = 3 seconds
    if(songs){
      let array=[];
      while(array.length!==5){
      const randomsong = songs[(Math.floor(Math.random() * (songs.length)))];
      if((selected.indexOf(randomsong) === -1) && (array.indexOf(randomsong) === -1)){
         array.push(randomsong);
      }else{
        continue;
       }
      }
      const boxes = document.getElementsByClassName(".box");
      for(var i=0;i<boxes.length;i++){
        boxes[i].style.opacity="0";
      }
      setsonglist(array);
      showBoxes();
    }
  }
   

  const boxes = document.getElementsByClassName(".box");
  // console.log(boxes);
  function showBoxes() {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.style.animationDelay = `${i * 0.5}s`; // Set animation delay based on index
    }
  }
showBoxes();







useEffect(()=>{
    if(songlist.length===2 && selected.length!==0){
      newrefresh();
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
},[songlist])
const newrefresh =async()=>{
  if(songs){
    let array=[...songlist];
    while(array.length!==5){
    const randomsong = songs[(Math.floor(Math.random() * (songs.length)))];
    if(array.indexOf(randomsong) === -1 && selected.indexOf(randomsong) === -1 && songlist.indexOf(randomsong) === -1){
       array.push(randomsong);
     }else{
      continue;
     }
    }
    const boxes = document.getElementsByClassName(".box");
    for(var i=0;i<boxes.length;i++){
      boxes[i].style.opacity="0";
    }
    setsonglist(array);
    showBoxes();
  }
}
   

const create =()=>{
  if(info.name===""){
    toast.warn("please enter playlist name", {
      position: toast.POSITION.TOP_CENTER,
      draggablePercent: 60,
      autoClose:4000,
      hideProgressBar:false
    });
  }else if(selected.length===0){
    toast.warn("empty playlist cannot be created please add some songs", {
      position: toast.POSITION.TOP_CENTER,
      draggablePercent: 60,
      autoClose:5000,
      hideProgressBar:false
    });
  }else{
    const obj ={
      username:user.username,
      info:info,
      coverpic:coverpic,
      songs:selected
    }
    console.log(obj);
    dispatch(createplaylist(obj,navigate));
  }
}

const store = useSelector((state)=>state);
useEffect(()=>{
  if(store.user.playlistcreated===true){
  toast.success("Playlist Created", {
    position: toast.POSITION.TOP_CENTER,
    draggablePercent: 60,
    autoClose:4000,
    hideProgressBar:true
  });
  dispatch({type:PLAYLISTCREATED , payload:false});
  navigate("/playlist");
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.user.playlistcreated])





const handlesearch =(e)=>{
    if(!e.target.value){
      refresh();
    }else{
      const temp = mainsongs.filter(item=>item.name.includes(e.target.value));
      setsonglist(temp);
    }
}


  return (
    <div className="addplaylist">
        <ToastContainer/>
        <Nav/>
        <div className="others">
            <div className="header">
                <h1>create Playlist</h1>
                <button onClick={create} >Create <AddIcon className='add' /></button>
            </div>
            <div className="lineeyy"></div>
            <form action="POST">
                   <div className="private">
                    <h1>Make the playlist private ?</h1>
                           <div className="toggle-container">
                                 <input
                                type="checkbox"
                               id="toggle"
                                checked={info.toggle}
                               onChange={(e)=>{
                                const val = info.toggle;
                                setinfo({...info , toggle:!val});
                               }}
                                  />
                                   <label htmlFor="toggle" className="toggle">
                                             <div className="toggle-handle"></div>
                                       </label> 
                            </div>
                   </div>
                        <p>Cover pic (optional)</p>
                           <div className="profile-pic">
                          <label className="-label" id='profileimage' htmlFor="file">
                             <span className="glyphicon glyphicon-camera"></span>
                                           <span id='profileImage' >Change Image</span>
                                              </label>
                                                <input
                                            type="file"
                                            id="imageUpload"
                                            className="form-input"
                                            required
                                            name='myfile'
                                            onChange={(e) =>{
                                              console.log("nfkjebccfr")
                                               handlecoverpic(e)}}
                                        />
                      <img src={coverpic.myfile} id="profileImage" width="200" alt='heyy'/>
                       </div>
                       <div className="input">
                        <div className="item1" id='team'>
                          <label htmlFor="input1">Playlist name <span>*</span></label>
                          <input type="text" maxLength={20} value={info.name} className='name' onChange={(e)=>{
                            setinfo({...info , name:e.target.value})
                          }} />
                        </div>
                        <div className="item1">
                          <label htmlFor="input1">Playlist Description (optional)</label>
                          <textarea className='para' value={info.description} maxLength={100} cols="4" rows="4" onChange={(e)=>{
                            setinfo({...info , description:e.target.value})
                          }} />
                        </div>
                       </div>
            </form>
            <div className="songadd">
                 <div className="head">
                  <h1>Add song</h1>
                  <button onClick={(e)=>{
                    e.preventDefault();
                    refresh();
                  }} >Refresh<RefreshIcon/></button>
                 </div>
                 <div className="lineeeeey"></div>
                 <div className="songlist">
                 <div className="search">
                   <input type="text" placeholder='Search Songs'  onChange={handlesearch}  />
                      <SearchIcon className='inside' />
                    </div>
                  {songlist.length===0 &&(
                      <div className="spin">
                        <BeatLoader color="#EE4950" />
                      </div>
                  )}
                  {songlist.length!==0 && (
                    <>
                 {songlist.map((item,idx)=>(
                           <div className="box"   key={idx} >
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
                          {item.added===false &&(
                           <AddCircleOutlineOutlinedIcon className='add' onClick={(e)=>{
                            e.preventDefault();
                            let idddx = mainsongs.indexOf(item);
                            let ar =[...mainsongs];
                            ar[idddx].added=true;
                            setmainsongs(ar);
                            let arr = [...songlist];
                            arr.splice(idx,1);
                            setsonglist(arr);
                            let idxx= songs.indexOf(item);
                            songs.splice(idxx,1);
                            let array = [...selected];
                            array.push(item);
                            setselected(array);
                           }}/>
                           )}
                           {item.added===true &&(
                             <CheckCircleOutlineIcon className='added' onClick={(e)=>{
                              e.preventDefault();
                              console.log("hkerbve");
                              toast.warn("This Song Is Already In Your Playlist", {
                                position: toast.POSITION.TOP_CENTER,
                                draggablePercent: 60,
                                autoClose:4000,
                                hideProgressBar:false
                              });
                             }}/>
                            )} 
                         </div>
                         </div>
                ))}
                </>
                )}
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Addplaylist