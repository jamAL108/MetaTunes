import React from 'react'
import { useNavigate } from 'react-router-dom';
import './loginalert.css';
const Loginalert = (props) => {
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
            navigate('/login');
        }} >Login</button>
    </div>
  )
}

export default Loginalert;