import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { LOGINCOLOR, NAVCOLOR } from '../redux/propsaction';
import Spinner from './spinner';
import Nav from './nav';
import { signup } from '../redux/action/useraction';
import '../scss/login.scss';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { SIGNUP, SIGNUPERROR } from '../redux/actiontypes';

const Register = () => {
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
        console.log(store.user.signuperror);
        if(store.user.signuperror.length!==0){
            seterror(store.user.signuperror);
            setspin(false);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.signuperror])

    useEffect(()=>{
       if(spin===false){
        const temp = document.querySelector("#register");
        temp.style.opacity="1";
       }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[spin])

    useEffect(()=>{
        if(store.user.signup===true){
            setspin(false);
            dispatch({type:SIGNUPERROR , payload:""});
            dispatch({type:SIGNUP,payload:false});
            navigate("/login");
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.user.signup])

    const Submit =()=>{
        dispatch({type:SIGNUPERROR,payload:""});
        if(data.username==="" || data.password===""){
            seterror("Please enter the details");
        }else{
            const pass = data.password;
             if(!pass.match(/[0-9]/)){
                seterror("password must contains a number");
             }else if(!pass.match(/[A-Z]/)){
                seterror("password must contains a uppercase letter");
             }else if(!pass.match(/[!@#$%&_]/)){
                seterror("password must contains a symbol");
             }else if(!pass.length>6){
                seterror("password length should be more than 6");
             }else{
             const temp = document.querySelector("#register");
             temp.style.opacity="0.4";
             setspin(true);
             dispatch(signup(data,navigate));
             }
    }
}
    const navigate = useNavigate();
  return (
    <>
    {spin===true &&(
        <Spinner className="spin" />
        )}
    <div className="login" id='register'>
        <Nav/>
        <div className="other">
        <div className="upper">
        <h1>Register</h1>
        <p>To continue enjoying MetaTunes</p>
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
            }}>Register</button>
            <p className='or' >or</p>
            <p className='continue' onClick={(e)=>{
               e.preventDefault();
               dispatch({type:LOGINCOLOR , payload:false});
               const data = JSON.parse(localStorage.getItem("sidebar"));
               data.index=0;
               localStorage.setItem("sidebar",JSON.stringify(data));
               navigate('/');
            }} >continue without Logging in</p>
            <p className='acc'>Already have an account ? <span className='inside' onClick={(e)=>{
                e.preventDefault();
                dispatch({type:NAVCOLOR , payload:false});
                navigate('/login');
            }} >Login</span></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Register;
