import React, { useState } from 'react'
import { FaHome, FaBorderStyle, FaTable } from 'react-icons/fa';
import { CiCircleMore} from 'react-icons/ci';
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../shared/Modal.jsx';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../redux/slices/customerSlice.js';




export const BottomNav = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const dispatch=useDispatch();
    const[isModalOpen,setIsModalOpen]=React.useState(false);
    const[guestCount,setGuestCount]=React.useState(0);
    const[name,setName]=React.useState();
    const[phone,setPhone]=React.useState();

   const openModal=()=>setIsModalOpen(true);
   const closeModal=()=>setIsModalOpen(false);


   const increment=()=>{if(guestCount>=6)return;setGuestCount((prev)=>prev+1);}
    const decrement=()=>{if(guestCount<=0)return;setGuestCount((prev)=>prev-1);}

  const isActive=(path)=>location.pathname === path;

  const handleCreateOrder=()=>{
    //send the date to store
    dispatch(setCustomer({name,phone,guests:guestCount}))
    navigate("/tables");
  }

  return (
    
    <div  className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around items-center z-50 ">

        <button onClick={()=>navigate("/")} className={`flex items-center justify-center font-bold ${isActive("/")? "text-[#f5f5f5] bg-[#343434]" :"text-[#ababab]"}  w-[200px] rounded-[20px]`}>
          <FaHome className="inline mr-2" size={30} />Home</button>


        <button onClick={()=>navigate("/orders")} className={`flex items-center justify-center font-bold ${isActive("/orders")?"text-[#f5f5f5] bg-[#343434]" :"text-[#ababab]"}  w-[200px] rounded-[20px]`}><FaBorderStyle className="inline mr-2" size={30} />Orders</button>


        <button onClick={()=>navigate("/tables")} className={`flex items-center justify-center font-bold ${isActive("/tables")?"text-[#f5f5f5] bg-[#343434]" :"text-[#ababab]"}  w-[200px] rounded-[20px]`}><FaTable className="inline mr-2" size={30}/>Tables</button>

        
        <button className='flex items-center justify-center text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px]'><CiCircleMore className="inline mr-2" size={30 }/>More</button>

        <button disabled={isActive("/tables")|| isActive("/menu")} onClick={openModal} className='absolute bottom- bg-[#f5f5f5] rounded-full p-3 items-center'><BiSolidDish /></button>

       <Modal  isOpen={isModalOpen} onClose={closeModal} title="Create Order">
      <div>
        <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
        <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
          <input value={name} onChange={(e)=>setName(e.target.value)}  type="text" name="" placeholder="Enter Customer name" id="" className="bg-transparent flex-1 text-[#ffffff] focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-[#ababab] mb-2 mt-2 text-sm font-medium">Customer Phone</label>
        <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="number" name="" placeholder="+91-9999999999" id="" className="bg-transparent flex-1 text-[#ffffff] focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">Guest</label>
        <div className="flex items-center justify-between rounded-lg py-3 px-4 bg-[#1f1f1f]">
          <button  onClick={decrement} className="text-[#14FF20] text-xl bg-[#1f1f1f]" >-</button>
          <span className="text-[#ffffff] ">{guestCount} Person</span>
          <button onClick={increment}  className="text-[#14FF20] text-xl bg-[#1f1f1f]">+</button>

        </div>
      </div>
      <button onClick={handleCreateOrder} className="w-full bg-[#f6b100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-[#E8D40E]"> Create order</button>
        </Modal>
    </div>
  )
}


