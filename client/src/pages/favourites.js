import React,{useEffect,useState} from 'react'
import Loginalert from '../components/loginalert';
import '../css/favourites.css';
import Nav from '../components/nav';
const Favourities = () => {
  const [auth , setauth] = useState(false);
  const error="please login to see your favourites";
  useEffect(()=>{
    const extrabeat_user = JSON.parse(localStorage.getItem("extrabeat_user"));
    if(extrabeat_user){
      setauth(true);
    }
  },[])

  return (
     <div className="favourites">
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
export default Favourities;