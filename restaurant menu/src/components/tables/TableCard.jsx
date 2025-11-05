import React, { use } from 'react'
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { getAvatarName, getRandomBG } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTable } from '../../redux/slices/customerSlice';


const TableCard = ({id,name,status,initials,seats}) => {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 
 const handleClick=(name)=>{
  if (status==="Booked")return;

  const table ={tableId:id,tableNo:name}
  dispatch(updateTable({table}))
  navigate("/menu");
 };

  return (
    <div onClick={()=>handleClick(name)} key={id} className='w-[350px] hover:bg-[#2c2c2c] bg-[#262626] rounded-lg p-4  cursor-pointer'>
       <div className='flex items-center justify-between px-1'>
         <h4 className='text-[#f5f5f5] text-xl font-semibold'>Table <FaLongArrowAltRight className='text-[#ababab] ml-2 inline' />{name} </h4>
         <p className={` ${status==="Booked"?"text-[#00FC20] bg-[#2e4a40]":"bg-[#f6b100] text-[#ffffff]"} px-2 py-1 rounded-lg `}><FaCheckDouble className='inline mr-2' />{status}</p>
         
       </div>
       <div className='flex items-center justify-center my-4 mb-10'>
          <h3 className={`bg-[#F056C1] text-[#ffffff] rounded-full p-5 text-xl `}>{getAvatarName(initials)||"N/A"}</h3>

       </div>
       <p className='text-[#ababab] text-xs '>Seats: <span className='text-[#f5f5f5]'>{seats}</span></p>
    </div>
  )
}

export default TableCard