import React, { useEffect , useState } from 'react'
import './songs.css';
import { useNavigate } from 'react-router-dom';
const Song = () => {
  const navigate = useNavigate();
  const song = JSON.parse(localStorage.getItem("song"));
  const [songs,setsongs]=useState(song);
    const [show,setshow]=useState(false);
    useEffect(()=>{
      if(songs.length!==0){
         setshow(true);
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
      let temp = [...songs];
       for(var i=0;i<temp.length;i++){
        if(temp[i].name.length>14){
           temp[i].dummytitle=temp[i].name.substring(0,12)+"...";
        }else{
          temp[i].dummytitle=temp[i].name;
        }
        let artistss="";
        for(var k=0;k<temp[i].artist.length;k++){
           artistss+=temp[i].artist[k]+",";
        }
        var temp1 = artistss.substring(0,artistss.length-1);
        if(temp1.length>13){
          temp[i].dummyartist=temp1.substring(0,12)+"...";
          console.log(temp1);
       }else{
         temp[i].dummyartist=temp1;
       }
      }
      setsongs(temp);
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
              <div className="image">
                                <img src={item.imageURL}
 alt={item.name} />
   </div>       
   <div className="below">
                <h2>{item.dummytitle}</h2>
                <p className="ppp">
                  {item.dummyartist}
                </p>
                </div>
                </div>
            ))}
           </div>
           </>
       )}
      </div>
  );
}

export default Song;
