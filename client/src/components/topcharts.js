import React,{useEffect, useState} from 'react'
import Chart from './chart'
import {
  SETCURRENTTRACK , SETPLAYING , SETTRACKLIST
} from '../redux/playertypes';
import './topchart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { PROCEED } from '../redux/actiontypes';
const Topchart = () => {
  const [data,setdata] = useState([]);
  const dispatch = useDispatch()
  const store = useSelector((state)=>state)
  useEffect(()=>{
    setdata(Chart)
                // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Chart])

  useEffect(()=>{
    if(data.length!==0){
    console.log(data)
    }
                // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])


  useEffect(()=>{
   if(store.user.proceed===true){
    console.log("TRUEEEE")
    if(data.length!==0){
      const song = JSON.parse(localStorage.getItem("song"));
          let arr =[];
          console.log(song.length);
          console.log(data.length);
          for(var i=0;i<data.length;i++){
            for(var j=0;j<song.length;j++){
              if(data[i].name===song[j].name){
                console.log(data[i].name)
                arr.push(song[j]);
                break;
              }
            }
          }
          console.log(arr)
          setdata(arr)
          dispatch({type:PROCEED,payload:false})
        }
   }
               // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.user.proceed])



  const playsong = (item) => {
    console.log(data)
    let j=0;
    for(var i=0;i<data.length;i++){
      if(data[i].name=== item.name){
         j=i;
         break;
      }
    }
  dispatch({type:SETCURRENTTRACK , payload:item})
  let list = data;
  const datas ={
    list:list,
    index:j
  }
  dispatch({type:SETTRACKLIST , payload:datas})
  dispatch({type:SETPLAYING , payload:true})
};

  return (
    <div className="topchart">
      <div className="charts">
        <h1>Top chart</h1>
        <div className="boxyes">
            {data.length!==0 && data.map((item,idx)=>(
                 <div className="box" onClick={(e)=>{
                  e.preventDefault();
                  playsong(item)
                 }}>
                  <h2>{idx+1}</h2>
                  <div className="small">
                    <img src={item.imageURL} alt="erg" />
                    <div className="names">
                      <h1>{item.name}</h1>
                      <p>{item.artist}</p>
                    </div>
                  </div>
                 </div>
              ))}
        </div>
        </div>
    </div>
  )
}

export default Topchart