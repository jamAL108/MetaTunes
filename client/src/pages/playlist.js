import React,{useEffect,useState} from 'react'
import Loginalert from '../components/loginalert';
import '../css/playlist.css';
import Nav from '../components/nav';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LOGINCOLOR } from '../redux/propsaction';
const Playlist = () => {
  const [auth , setauth] = useState(false);
  const error="please login to see your playlist";
  useEffect(()=>{
    const extrabeat_user = JSON.parse(localStorage.getItem("extrabeat_user"));
    if(extrabeat_user){
      setauth(true);
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
  const data = JSON.parse(localStorage.getItem("sidebar"));
  data.index=3;
  localStorage.setItem("sidebar",JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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