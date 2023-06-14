import React, { useEffect , useState } from 'react'
import './songs.css';
import { useNavigate } from 'react-router-dom';
const Song = () => {
  const navigate = useNavigate();
  const songs = JSON.parse(localStorage.getItem("song"));
    const [show,setshow]=useState(false);
    useEffect(()=>{
      if(songs.length!==0){
         setshow(true);
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="songs">
       {show===true &&(
        <>
            <div className="heading">
            <h1>Popular Songs</h1>
            <p onClick={(e)=>{
              e.preventDefault();
              navigate('/artists');
            }} >see more</p>
            </div>
            <div className="items">
            {songs.map((item,idx)=>(
              <div className="boxzzy" key={idx}>
                                <img src={item.imageURL} style={{backgroundSize:"cover",
  backgroundPosition:"center"}} alt={item.name} />
                <h2>{item.name}</h2>
                <p className="ppp">
                    {item.artist.map((name,ix)=>(
                        <span key={ix} >{name},</span>
                    ))}
                </p>
                </div>
            ))}
           </div>
           </>
       )}
      </div>
  );
}

export default Song;