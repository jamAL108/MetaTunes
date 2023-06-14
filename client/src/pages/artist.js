import React, { useEffect , useState } from 'react'
import '../css/allartist.css';
import Nav from '../components/nav';
const Allartist = () => {
    const artist = JSON.parse(localStorage.getItem("artist"));
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
              <div className="boxbuzz" key={idx}>
                <img src={item.imageURL} alt={item.name} />
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