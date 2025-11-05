import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// FIX 1: Import the 'register' function from your api file
import { register } from '../../https/index'; 
// FIX 2: Import 'useSnackbar' to get the enqueueSnackbar function
import { useSnackbar } from 'notistack';

export const Register = ({setIsRegister}) => {
  // FIX 3: Get the enqueueSnackbar function from the hook
  const { enqueueSnackbar } = useSnackbar(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  }

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData), // This will now work

    onSuccess: (res) => { 
      const { data } = res;
     
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
       name: "",
       email: "",
       phone: "",
       password: "",
       role: "",
      });
      setTimeout(()=>{
      setIsRegister(false);
      },1500);
    },
    onError: (error) => {
      const { response } = error;
      // This will now work
      enqueueSnackbar(response?.data?.message || "Registration failed", { variant: "error" }); 
    }
  });

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  }

  return (
    <div>
      {/* Added gap for consistent spacing */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium'>Employee Name</label>
          {/* Added overflow-hidden for correct border-radius */}
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f] overflow-hidden'>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder='Enter name' 
              className='bg-transparent flex-1 text-base text-[#ffffff] focus:outline-none' // Added text-base
              required  
            />
          </div>
        </div>

        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium'>Employee Email</label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f] overflow-hidden'>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder='Enter email' 
              className='bg-transparent flex-1 text-base text-[#ffffff] focus:outline-none' // Added text-base
              required  
            />
          </div>
        </div>
        
        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium'>Employee Phone</label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f] overflow-hidden'>
            <input 
              type="number" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}  
              placeholder='Enter phone' 
              className='bg-transparent flex-1 text-base text-[#ffffff] focus:outline-none' // Added text-base
              required  
            />
          </div>
        </div>

        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium'>Password</label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f] overflow-hidden'>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder='Enter password' 
              className='bg-transparent flex-1 text-base text-[#ffffff] focus:outline-none' // Added text-base
              required  
            />
          </div>
        </div>
        
        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium'>Choose your role</label>
          {/* FIXED TYPO: item-center -> items-center */}
          <div className='flex items-center gap-3 mt-4'>
            {["waiter", "cashier", "admin"].map((role) => {
              return (
                <button  
                  key={role} 
                  type='button' 
                  onClick={() => handleRoleSelection(role)} 
                  // Use flex-1 so buttons share width equally
                  className={`bg-[#1f1f1f] px-4 py-3 flex-1 rounded-lg text-[#ababab] ${formData.role === role ? "bg-[#4D2CF2] text-white" : ""}`}
                > 
                  {role}
                </button>
              )
            })}
          </div>
        </div>
        
        <button 
          type='submit' 
          className='w-full rounded-lg mt-6 py-3 text-lg bg-[#fffc00] text-gray-900 font-bold'
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register;