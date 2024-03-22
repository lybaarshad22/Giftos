import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [signupCheck , setSignUpCheck] = useState();
    const navigate = useNavigate();
   
    const handleSignUp = async ()=>{
      try {
        let result = await fetch("http://localhost:4000/user/register/signup", {
            method: 'post',
            body: JSON.stringify({name,email,password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        
        if (result) {
             let data = await result.json();
             localStorage.setItem("signup" , JSON.stringify(data));
             const auth = JSON.parse(localStorage.getItem("signup"));  
            if(auth?.success){
            navigate('/login');
            }
            else{
                navigate('/');
            }

             setSignUpCheck(data);
            }
            
         else {
            
            console.error('Sign-up failed');
        }

    } catch (error) {
        console.error('An error occurred', error);
    }
};
    useEffect(()=>{
        const auth = JSON.parse(localStorage.getItem("user"));  
        if(auth?.success){
           navigate('/home');
        }
        const user = JSON.parse(localStorage.getItem("signup"));  
        if(user?.success){
            navigate('/login');
        }
        
        else{

        }
    },[]);






  return (
    <>
    <div className='form-container'>
    <div className='signup-form'>
    
        <h1 className='signup-head'>Sign Up</h1>
        <input type='text' name='name' onChange={(e)=>setName(e.target.value)} placeholder='Enter first name'/>        
        <input type='text' name="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Username or Email'/>
        <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
        <button className='signup-btn' onClick={handleSignUp}>Sign Up</button>
        {signupCheck?.success === true ? (<span>{signupCheck.message}</span>) : signupCheck?.success === false ? (<span>{signupCheck.message}</span>) : ("")}

        <p className='acc-msg'>Already have an account?</p>
        <button className='log-signup-btn'><Link  to="/login" >Log In</Link></button>

        

    
    </div>
    </div>
    </>
  )
}

export default SignUp