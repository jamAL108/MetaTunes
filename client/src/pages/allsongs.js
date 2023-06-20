import React, { useEffect , useState } from 'react'
import '../css/allsongs.css';
import Nav from '../components/nav';
const Allsong = () => {
    const song = JSON.parse(localStorage.getItem("song"));
    console.log(song);
    const [show,setshow]=useState(false);
    useEffect(()=>{
      if(song.length!==0){
         setshow(true);
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="songs">
         <Nav/>
       {show===true &&(
        <div className='other'>  
            <div className="heading">
            <h1>Songs</h1>
            <p>Discover new Songs</p>
            </div>
            <div className="items">
            {song.map((item,idx)=>(
              <div className="bob" key={idx}>
                <div className="imagey">
                <img src={item.imageURL} alt={item.name} />
                </div>
                <div className="names">
                <h1>{item.name}</h1>
                <p>{item.artist}</p>
                </div>
                </div>
            ))}
           </div>
           </div>
       )}
      </div>
  );
}

export default Allsong;