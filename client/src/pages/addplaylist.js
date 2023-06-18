import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Nav from '../components/nav';
import AddIcon from '@mui/icons-material/Add';
import '../css/addplaylist.css';
import $ from 'jquery';
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
                          <label htmlFor="input1">Description (optional)</label>
                          <textarea className='para' value={info.description} maxLength={100} cols="4" rows="4" onChange={(e)=>{
                            setinfo({...info , description:e.target.value})
                          }} />
                        </div>
                       </div>
            </form>
        </div>
    </div>
  )
}

export default Addplaylist