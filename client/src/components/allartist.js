import React, { useEffect , useState } from 'react'
import './allartist.css';
import { useNavigate } from 'react-router-dom';
const Allartist = () => {
  const navigate = useNavigate();
    const artist = JSON.parse(localStorage.getItem("artist"));
    const [show,setshow]=useState(false);
    useEffect(()=>{
      if(artist.length!==0){
         setshow(true);
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="artists">
       {show===true &&(
        <>
            <div className="heading">
            <h1>You may Know</h1>
            <p onClick={(e)=>{
              e.preventDefault();
              navigate('/artists');
            }} >see more</p>
            </div>
            <div className="items">
            {artist.map((item,idx)=>(
              <div className="boxbuzz" key={idx}>
                <div className="image">
                <img src={item.imageURL} alt={item.name} />
                </div>
                <h1>{item.name}</h1>
                </div>
            ))}
           </div>
           </>
       )}
      </div>
  );
}

export default Allartist;