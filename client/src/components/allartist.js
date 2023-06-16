import React, { useEffect , useState } from 'react'
import './allartist.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallartist } from '../redux/action/useraction';
 import { ARTISTID  } from '../redux/propsaction';

import { ColorRing } from 'react-loader-spinner';
const Allartist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state)=>state);
    const [show,setshow]=useState(false);
    const [artist,setartist]=useState([]);
    const data = JSON.parse(localStorage.getItem("artist"));
    useEffect(()=>{
       if(data){
        setartist(data);
        setshow(true);
       }else{
        dispatch(getallartist());
       }
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
        setartist(store.user.allartist);
        setshow(true);
        localStorage.setItem("artist",JSON.stringify(store.user.allartist));

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
