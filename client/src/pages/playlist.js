import React,{useEffect,useState} from 'react'
import Loginalert from '../components/loginalert';
import '../css/playlist.css';
import Nav from '../components/nav';
const Playlist = () => {
  const [auth , setauth] = useState(false);
  const error="please login to see your playlist";
  useEffect(()=>{
    const extrabeat_user = JSON.parse(localStorage.getItem("extrabeat_user"));
    if(extrabeat_user){
      setauth(true);
    }
  },[])

  return (
     <div className="playlist">
         <Nav/>
         {auth===false &&(
          <Loginalert query={error} />
         )}
         {auth===true &&(
          <h1>hi jmala</h1>
         )}
     </div>
  )
}
export default Playlist;