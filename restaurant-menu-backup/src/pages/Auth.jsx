import React, { useState } from 'react'
import restaurant from "../assets/images/restaurant.png"
import logo from "../assets/images/logo.png";
import { Register } from '../components/auth/Register';
import Login from '../components/auth/Login';

const Auth = () => {
  const[isRegister,setIsRegister]=useState(false);

  return (
    <div className='flex min-h-screen w-full'>
      
      {/* leftSec - 60% width */}
      <div className='w-3/5 relative flex items-center justify-center'> 
        <img 
          src={restaurant} 
          alt="Restro Image" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className='absolute inset-0 bg-[#000000] bg-opacity-80'></div>
        <blockquote className='relative px-8 text-center text-2xl italic text-[#ffffff] z-10'> 
          "We serve our customers with pride and satisfaction!"
          <br />
          <span className='block mt-4 text-[#FFFC00]'>-Founder Of Restro</span>
        </blockquote>
      </div>
      
      {/* right section - 40% width */}
      <div className='w-2/5 min-h-screen bg-[#1a1a1a] p-10 flex flex-col items-center'>
        <div className='flex flex-col items-center gap-2'>
        {/* Logo (Very Small) */}
        <img 
          src={logo} 
          alt="Restro Logo" 
          /* CHANGED: Using exact pixel values to force the size */
          className='h-[100px] w-[100px] border rounded-full p-[2px]' 
        />
        
        {/* Title */}
        <h1 className='text-sm font-semibold text-[#f5f5ff] tracking-wide mt-2'>
          Restro
        </h1>

        <h2 className='text-4xl text-center mt-10 font-semibold text-[#fffc00] mb-10' >
         {isRegister?"Employee Registration":"Employee Login"}
        </h2>

        {/* components */}
        {isRegister?<Register setIsRegister={setIsRegister} />:<Login />}
        
      <div className='flex justify-center mt-6'>
        <p className='text-sm text-[#ababab]'>
         {isRegister?" Already have an account?":"Don't have an account"}
          <a onClick={()=>setIsRegister(!isRegister)} className='text-[#fffc00] font-semibold hover:underline' href="#"> {isRegister?"Sign In":"Sign Up"}</a>
        </p>
      </div>


        </div>
      </div>

    
    </div>
    
  )
}

export default Auth