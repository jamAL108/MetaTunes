import React, { useEffect } from 'react'
import Nav from '../components/nav';
import { LOGINCOLOR } from '../redux/propsaction';
import { useDispatch, useSelector } from 'react-redux';
const Landing = () => {
  const store= useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("sidebar"));
    data.index=0;
    localStorage.setItem("sidebar",JSON.stringify(data));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    if(store.props.logincolor===true){
      if(window.screen.width<900){
      document.body.style.backgroundColor = "#141414";
      const temp = document.querySelector(".icon");
      temp.style.display="block";
      const temp1 = document.querySelector(".nav");
      temp1.style.backgroundColor="#09090B";
      dispatch({type:LOGINCOLOR , payload:false})
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <Nav/>
  )
}

export default Landing;