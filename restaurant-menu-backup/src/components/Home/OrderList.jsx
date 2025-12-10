import React from 'react'
import { FaCheckDouble } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getAvatarName } from '../../utils';

// 1. Removed 'key' from props
export const OrderList = ({order}) => {

  // A good practice is to add a check for the whole order object
  if (!order) {
    return null; // or return a loading spinner
  }

  return (
    <div className='flex item-center gap-5 mb-3'>
     <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg text-[#f5f5f5]'>{getAvatarName(order.customerDetails.name)}</button>
     <div className='flex items-center justify-between w-[100%]'>
        <div className='flex flex-col items-start gap-1'>
            <h1 className='text-[#f5f5ff] text-lg font-semibold tracking-wide'>{order.customerDetails.name}</h1>
            <p className='text-[#ababab] text-sm'>{order.items.length} Items</p>
        </div>
        <div>
            {/* 2. Added optional chaining to prevent crash */}
            <h1 className='text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1'> 
              Table {order.table?.tableNo || 'N/A'}
            </h1>
        </div>
        <div className=' flex flex-col items-start gap-2'>
             {
                                order.orderStatus==="Ready"?(<>
                                    <p className=' text-[#00FC20] bg-[#2e4a40] px-2 py-1 rounded-lg '><FaCheckDouble className='inline mr-2' />{order.oderStatus}</p>
                               </> ):(
                                <>
                                    <p className=' text-[#00FC20] bg-[#4a452e] px-2 py-1 rounded-lg '><FaCircle className='inline mr-2' />{order.oderStatus}</p>
                               </> )
          }
          </div>
     </div>

    </div>
  )
}