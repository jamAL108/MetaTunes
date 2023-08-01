import React, { useEffect , useState } from 'react'
import '../scss/artist.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallartist } from '../redux/action/useraction';
 import { ARTISTID  } from '../redux/propsaction';
import { ALLARTIST } from '../redux/actiontypes';
import { ColorRing } from 'react-loader-spinner';
const Allartist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state)=>state);
    const [show,setshow]=useState(false);
    const [artist,setartist]=useState([]);
    
    useEffect(()=>{
      
    
        dispatch(getallartist());
       
                   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
      if(artist.length!==0){
         setshow(true);
      }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
       if(store.user.allartist.length!==0){
        localStorage.setItem("artist",JSON.stringify(store.user.allartist));
        const array = store.user.allartist;
        let artistsey=[];
        dispatch({type:ALLARTIST , payload:[]})
        while(artistsey.length!==8){
        const randomartist = array[(Math.floor(Math.random() * (array.length)))];
        if(artistsey.indexOf(randomartist)===-1){
        artistsey.push(randomartist);
        }
        }
        setartist(artistsey);
        setshow(true);
       }
                 // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.allartist])
  return (
    <div className="artists">
                  <div className="heading">
            <h1>You may Know</h1>
            <p onClick={(e)=>{
              e.preventDefault();
              navigate('/artists');
            }} >see more</p>
            </div>
      {show===false && artist.length===0 &&(
      <div className='spin'>
<ColorRing
  visible={true}
  height="90"
  width="90"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#EE4950','#EE4950','#EE4950','#EE4950','#EE4950']}
/>
      </div>
      )}
       {show===true &&(
        <>
            <div className="items">
            {artist.map((item,idx)=>(
              <div className="boxbuzz" onClick={(e)=>{
                e.preventDefault();
                dispatch({type:ARTISTID , payload:item});
                console.log(item);
                navigate(`/artist/${item._id}`);
              }} key={idx}>
                <div className="image">
                <img src={item.imageURL} loading='lazy' alt={item.name} />
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
