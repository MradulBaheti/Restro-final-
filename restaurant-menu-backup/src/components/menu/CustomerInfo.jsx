import React from 'react'
import { useSelector } from 'react-redux'
import { formatDate, getAvatarName } from '../../utils';

export const CustomerInfo = () => {
  const[dateTime,setDateTime]=React.useState(new Date()); 
  const customerData = useSelector((state) => state.customer);

  return (
    <div className='flex items-center justify-between px-4 py-3'>
  <div className='flex flex-col items-start'>
    <h3 className='text-md text-[#f5f5f5] font-semibold tracking-wide'>{customerData.customerName||"Customer Name"}</h3>
    <p className='text-xs text-[#ababab] font-medium mt-1'>#{customerData.orderId||"N/A"}/DineIn</p>
    <p className='text-xs text-[#ababab] font-medium mt-2'>{formatDate(dateTime)}</p>

 <div>
  <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg'>{getAvatarName(customerData.customerName)||"CN"}</button>
  </div>
    </div>
    </div>
  )
}
