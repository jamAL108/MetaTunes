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
const Addplaylist = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [coverpic,setcoverpic] = useState({
        name:"",
        myfile:"",
        toggle:false
    })
    const [info , setinfo] = useState({
      name:"",
      description:""
    })
    const [selected , setselected]=useState([]);
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
        console.log(e.target.files[0]);
        console.log("heeeloo");
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
     const song = JSON.parse(localStorage.getItem("song"));
     if(song){
      let array=[];
      for(var i=1;i<=5;i++){
      const randomsong = song[(Math.floor(Math.random() * (song.length)))];
         array.push(randomsong);
         console.log("hey");
      }
      setsonglist(array);
      showBoxes();
     }
          // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const refresh =()=>{
    const song = JSON.parse(localStorage.getItem("song"));
    if(song){
      let array=[];
      while(array.length!==5){
      const randomsong = song[(Math.floor(Math.random() * (song.length)))];
      if(!selected.includes(randomsong)){
         array.push(randomsong);
      }
      }
      const boxes = document.getElementsByClassName(".box");
      for(var i=0;i<boxes.length;i++){
        console.log("heyy");
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

  return (
    <div className="addplaylist">
        <ToastContainer/>
        <Nav/>
        <div className="others">
            <div className="header">
                <h1>create Playlist</h1>
                <button>Create <AddIcon className='add' /></button>
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
                 {songlist.map((item,idx)=>(
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
                           <AddCircleOutlineOutlinedIcon className='add' onClick={(e)=>{
                            e.preventDefault();
                            let array = [...selected];
                            array.push(item);
                            setselected(array);

                           }}/>
                         </div>
                         </div>
                ))}
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Addplaylist