import React, { useEffect , useState } from 'react'
import '../css/allartist.css';
import Nav from '../components/nav';
import { ARTISTID  } from '../redux/propsaction';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Allartist = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
    const artist = JSON.parse(localStorage.getItem("artist"));
    console.log(artist);
    const [show,setshow]=useState(false);
    useEffect(()=>{
      if(artist.length!==0){
         setshow(true);
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="artistes">
         <Nav/>
       {show===true &&(
        <div className='other'>  
            <div className="heading">
            <h1>Artist</h1>
            <p>Discover new Artists</p>
            </div>
            <div className="items">
            {artist.map((item,idx)=>(
              <div className="boxbuzz" onClick={(e)=>{
                e.preventDefault();
                dispatch({type:ARTISTID , payload:item});
                console.log(item);
                navigate(`/artist/${item._id}`);
              }} key={idx}>
                <div className="image">
                <img src={item.imageURL} alt={item.name} />
                </div>
                <h1>{item.name}</h1>
                </div>
            ))}
           </div>
           </div>
       )}
      </div>
  );
}

export default Allartist;