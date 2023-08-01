import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import '../scss/popup.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CANCEL } from '../redux/propsaction';
const Popup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="popup">
        <div className="model">
          <div className="upper">
            <h1>not logged in</h1>
             <CloseIcon className='cross' onClick={(e)=>{
              e.preventDefault();
              dispatch({type:CANCEL , payload:true})
             }} />
          </div>
          <div className="middle">
            <h1>please login to create playlist</h1>
          </div>
          <div className="down">
            <button className='cancel' onClick={(e)=>{
              e.preventDefault();
              dispatch({type:CANCEL , payload:true})
             }}>cancel</button>
            <button className='login' onClick={(e)=>{
              e.preventDefault();
              dispatch({type:CANCEL , payload:true})
              navigate("/login");
             }}>login</button>
          </div>
        </div>
    </div>
  )
}

export default Popup