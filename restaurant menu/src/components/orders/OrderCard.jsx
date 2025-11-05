import React from 'react'
import { FaCheckDouble } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import {formatDateAndTime, getAvatarName} from "../../utils/index";
import { FaLongArrowAltRight } from 'react-icons/fa';

// --- FIX 1: Removed 'key' from props. It's not a real prop. ---
const OrderCard = ({order}) => {
    // console.log(order); // This log is fine, but can be removed
  return (
    <div className='w-[350px] bg-[#262626] rounded-lg p-4 mb-4'>
        <div className='flex items-center gap-5'>
        {/* Added safety check for customerDetails */}
        <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg text-[#f5f5f5]'>{getAvatarName(order.customerDetails?.name)}</button>
        <div className='flex items-center justify-between w-[100%]'>
            <div className='flex flex-col items-start gap-1'>
                {/* Added safety check for customerDetails */}
                <h3 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>{order.customerDetails?.name}</h3>
                <p  className='text-[#ababab] text-sm'>#{Math.floor(new Date(order.orderDate).getTime())} /Dine in</p>
                
                {/* --- FIX 2: Added optional chaining '?.'. This stops the crash. --- */}
                <p  className='text-[#ababab] text-sm'>Table <FaLongArrowAltRight className='text-[#ababab] ml-2 inline' /> {order.table?.tableNo || 'N/A'}</p>
            </div>
            <div>

            </div>
            <div className=' flex flex-col items-end gap-2'>
                {
                    order.orderStatus==="Ready"?(<>
                        {/* --- FIX 3: Fixed typo 'oderStatus' to 'orderStatus' --- */}
                        <p className=' text-[#00FC20] bg-[#2e4a40] px-2 py-1 rounded-lg '><FaCheckDouble className='inline mr-2' />{order.orderStatus}</p>
                <p className='text-[#ababab] text-sm'> <FaCircle className='inline mr-2 text-[#00FC20]' />Ready to serve</p>
                    </> ):(
                    <>
                        {/* --- FIX 3: Fixed typo 'oderStatus' to 'orderStatus' --- */}
                        <p className=' text-[#00FC20] bg-[#4a452e] px-2 py-1 rounded-lg '><FaCircle className='inline mr-2' />{order.orderStatus}</p>
                <p className='text-[#ababab] text-sm'> <FaCircle className='inline mr-2 text-[#00FC20]' />Preparing your order</p>
                    </> )
                }
            </div>
        </div>
    
        </div>

        <div className='flex justify-between items-center mt-4 text-[#ababab]'>
            <p>{formatDateAndTime(order.orderDate)}</p>
            {/* Added safety check for items */}
            <p>{order.items?.length || 0} items</p>
        </div>
        <hr className='w-full mt-4 text-[#ababab] '/>

        <div className='flex items-center justify-between mt-4'>
            <h3 className='text-[#f5f5f5] text-lg font-bold'>Total</h3>
            {/* Added safety check for bills and totalWithTax */}
            <p className='text-[#f5f5f5] text-lg font-semibold'>{order.bills?.totalWithTax?.toFixed(2) || '0.00'}</p>
        </div>
        </div>
  )
}

export default OrderCard