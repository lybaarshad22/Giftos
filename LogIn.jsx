import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [auth , setAuth] = useState();

    const navigate = useNavigate();


    const handleLogIn = async ()=>{
        let result = await fetch('http://localhost:4000/user/auth/login',{
          method: 'post' ,
          body: JSON.stringify({email , password}),
          headers :{
            'Content-Type': 'application/json'
          }
        });
        result = await result.json();
        localStorage.setItem("user" ,JSON.stringify(result));
        const user = JSON.parse(localStorage.getItem('user'));
        setAuth(user);
        if(user?.success){
          navigate('/home');
        }
        else{
          navigate('/login');
        }

    }
  
   
    useEffect(()=>{
      const auth = JSON.parse(localStorage.getItem('user'));
      if(auth?.success){
        navigate('/home');
      }
      else{
        navigate('/login');
      }
    },[]);

  return (
    <>
    <div className='form-container'>
    <div className='signup-form'>
    
        <h1 className='signup-head'>Log In</h1>        
        <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Username or Email'/>
        <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
        <button className='signup-btn' onClick={handleLogIn}>Log In</button>
        <p className='acc-msg'>Not having account already?</p>
         <button  className='log-signup-btn'> <Link to="/" >Sign Up</Link></button>

        

    </div>
    </div>
    </>
  )
}

export default LogIn