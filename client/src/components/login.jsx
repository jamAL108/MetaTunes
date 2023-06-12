import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAVCOLOR } from '../redux/propsaction';
import Nav from './nav';
import './login.css';
const Login = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch({type:NAVCOLOR , payload:true});
                    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const Submit =()=>{
        console.log("helo");
    }
    const navigate = useNavigate();
  return (
    <div className="login">
        <Nav/>
        <div className="other">
        <div className="upper">
        <h1>Login</h1>
        <p>To continue enjoying ExtraBeat</p>
        </div>
        <form action="POSt">
            <div className="forminput">
            <label htmlFor="Username" className='label' >Username :</label>
            <input type="text"  maxLength={10} />
            </div>
            <div className="forminput">
            <label htmlFor="password" className='label' >Password :</label>
            <input type="password"  />
            </div>
        </form>
        <div className="submit">
            <button onClick={(e)=>{
                e.preventDefault();
                Submit();
            }}>LOGIN</button>
            <p className='or' >or</p>
            <p className='continue' onClick={(e)=>{
               e.preventDefault();
               navigate('/');
            }} >continue without Logging in</p>
            <p className='acc'>Don't have an account yet ? <span className='inside' onClick={(e)=>{
                e.preventDefault();
                navigate('/register');
            }} >Register</span></p>
        </div>
    </div>
    </div>
  )
}

export default Login;