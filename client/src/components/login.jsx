import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { LOGINCOLOR, NAVCOLOR } from '../redux/propsaction';
import Spinner from './spinner';
import Nav from './nav';
import { login } from '../redux/action/useraction';
import './login.css';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { LOGINERROR ,LOGIN} from '../redux/actiontypes';

const Login = () => {
    const dispatch = useDispatch();
    const store = useSelector((state)=>state);
    const [spin, setspin] = useState(false);
    const [data,setdata] = useState({
        username:"",
        password:""
    })
    const [error,seterror]=useState("");
    useEffect(()=>{
      dispatch({type:NAVCOLOR , payload:true});
      document.body.style.backgroundColor="#09090B";
                    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        console.log(store.user.loginerror);
        if(store.user.loginerror.length!==0){
            seterror(store.user.loginerror);
            setspin(false);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.loginerror])
    useEffect(()=>{
       if(spin===false){
        const temp = document.querySelector(".login");
        temp.style.opacity="1";
       }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[spin])
    const Submit =()=>{
        dispatch({type:LOGINERROR,payload:""});
        if(data.username==="" || data.password===""){
            seterror("Please enter the details");
        }else{
            const temp = document.querySelector(".login");
            temp.style.opacity="0.4";
            setspin(true);
        dispatch(login(data,navigate));
        }
    }
    useEffect(()=>{
        console.log(store.user.login);
        if(store.user.login===true){
            dispatch({type:LOGINERROR , payload:""});
            dispatch({type:LOGIN,payload:false});
            setspin(false);
            navigate("/");
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.login])

    const navigate = useNavigate();
  return (
    <>
    {spin===true &&(
        <Spinner className="spin" />
        )}
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
            <input type="text"  maxLength={10} value={data.username} onChange={(e)=>{
                setdata({...data , username:e.target.value})
                seterror("");
            }} />
            </div>
            <div className="forminput">
            <label htmlFor="password" className='label' >Password :</label>
            <input type="password" value={data.password} onChange={(e)=>{
                setdata({...data , password:e.target.value})
                seterror("");
            }} />
            </div>
        </form>
        {error.length!==0 &&(
            <p className='error' ><ErrorOutlinedIcon/>{error}</p>
        )}
        <div className="submit">
            <button onClick={(e)=>{
                e.preventDefault();
                Submit();
                dispatch({type:LOGINCOLOR , payload:true});
            }}>LOGIN</button>
            <p className='or' >or</p>
            <p className='continue' onClick={(e)=>{
               e.preventDefault();
               dispatch({type:LOGINCOLOR , payload:false});
               const data = JSON.parse(localStorage.getItem("sidebar"));
               data.index=0;
               localStorage.setItem("sidebar",JSON.stringify(data));
               navigate('/');
            }} >continue without Logging in</p>
            <p className='acc'>Don't have an account yet ? <span className='inside' onClick={(e)=>{
                e.preventDefault();
                dispatch({type:NAVCOLOR , payload:false});
                navigate('/register');
            }} >Register</span></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login;