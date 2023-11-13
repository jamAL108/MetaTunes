import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Nav from '../..//components/nav';
import AddIcon from '@mui/icons-material/Add';
import '../../scss/addplaylist.scss';
import { useDispatch , useSelector} from 'react-redux';
import $ from 'jquery'
import './createArtist.scss'
import { createartist } from '../../redux/action/useraction';
import {ARTISTCREATED} from '../../redux/actiontypes';

const Createartist = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [coverpic,setcoverpic] = useState({
        name:"",
        myfile:""
    })
    const store = useSelector((state)=>state);
    useEffect(()=>{
       if(!user){
        toast.warn("PLease login to become an Artist", {
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
    const [info , setinfo] = useState({
        name:"",
        description:"",
        language:""
      })
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

const create =()=>{
  if(info.name===""){
    toast.warn("please enter name", {
      position: toast.POSITION.TOP_CENTER,
      draggablePercent: 60,
      autoClose:4000,
      hideProgressBar:false
    });
  }else if(info.description===""){
    toast.warn("Please Write some description about yourself", {
      position: toast.POSITION.TOP_CENTER,
      draggablePercent: 60,
      autoClose:5000,
      hideProgressBar:false
    });
  }else if(info.language===""){
    toast.warn("please Enter Language", {
      position: toast.POSITION.TOP_CENTER,
      draggablePercent: 60,
      autoClose:5000,
      hideProgressBar:false
    });
  }else{
    const obj ={
      info:info,
      coverpic:coverpic,
      id:user._id
    }
    console.log(obj);
    dispatch(createartist(obj,navigate));
  }
}

useEffect(()=>{
  if(store.user.artistcreated===true){
  toast.success("Playlist Created", {
    position: toast.POSITION.TOP_CENTER,
    draggablePercent: 60,
    autoClose:4000,
    hideProgressBar:true
  });
  dispatch({type:ARTISTCREATED , payload:false});
  navigate("/profile");
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.user.artistcreated])


     
$("#profileImage").unbind("click").bind("click",function(e) {
    e.preventDefault();
    console.log("helo");
    $("#imageUpload").click();
});

  return (
    <div className="addplaylist" id='createartist'>
        <ToastContainer/>
        <Nav/>
        <div className="others">
            <div className="header">
                <h1>Become an Artist</h1>
                <button onClick={create}>Create <AddIcon className='add' /></button>
            </div>
            <div className="lineeyy"></div>
            <form action="POST">
                        <p>Cover pic<span>*</span></p>
                           <div className="profile-pic">
                          <label className="-label" id='profileimage' htmlFor="file">
                             <span className="glyphicon glyphicon-camera"></span>
                    <span id='profileImage'>Change Image</span>
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
                       <div className="input" style={{gap:"1.5rem"}}>
                        <div className="item1" id='team' style={{marginTop:"2rem"}}>
                          <label htmlFor="input1">Your name <span>*</span></label>
                          <input type="text" maxLength={90} value={info.name} className='name' onChange={(e)=>{
                            setinfo({...info , name:e.target.value})
                          }} />
                        </div>
                        <div className="item1">
                          <label htmlFor="input1">Your brief Description<span>*</span></label>
                          <textarea className='para' value={info.description} maxLength={100} cols="4" rows="4" onChange={(e)=>{
                            setinfo({...info , description:e.target.value})
                          }} />
                        </div>
                        <div className="item1">
                          <label htmlFor="input1">Your preferred Language<span>*</span></label>
                          <input className='para' value={info.language} onChange={(e)=>{
                            setinfo({...info , language:e.target.value})
                          }} />
                        </div>
                       </div>
            </form>
        </div>
    </div>
  )
}

export default Createartist