import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../scss/loginalert.scss';
import { useDispatch } from 'react-redux';
import { LOGINCOLOR } from '../redux/propsaction';
const Loginalert = (props) => {
  const dispatch = useDispatch();
  const {
    query
  } = props;
  console.log(query);
    const navigate = useNavigate();
  return (
    <div className="loginalert">
        <h2>{query}</h2>
        <button onClick={(e)=>{
            e.preventDefault();
            if(window.screen.width<900){
              dispatch({type:LOGINCOLOR , payload:true});
              }
              if(window.screen.width>900){
              const data = JSON.parse(localStorage.getItem("sidebar"));
              data.index=-1;
              localStorage.setItem("sidebar",JSON.stringify(data));
              }
            navigate('/login');
        }} >Login</button>
    </div>
  )
}

export default Loginalert;