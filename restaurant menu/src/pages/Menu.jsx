import React from 'react'

// 1. REMOVE BottomNav import
import { BottomNav } from '../components/shared/BottomNav'
import { BackButton } from '../components/shared/BackButton'
import { MdRestaurantMenu } from "react-icons/md";
import { MenuContainer } from '../components/menu/MenuContainer'

import { CustomerInfo } from '../components/menu/CustomerInfo';
import { CartInfo } from '../components/menu/CartInfo';
import { Bill } from '../components/menu/Bill';
import { useSelector } from 'react-redux';




export const Menu = () => {
const customerData = useSelector((state) => state.customer);

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
         {/* Left Side */}
    {/* 2. ADDED 'overflow-y-auto scrollbar-hide' to this column */}
    <div className='flex-[3] overflow-y-auto scrollbar-hide pb-20'>
         <div className='flex items-center justify-between px-10 py-4 mt-2 '>
               <div className='flex items-center gap-4'>
                <BackButton/>
                 <h4 className='text-[#f5f5ff] text-2xl font-bold tracking-wide'>Menu</h4>
               </div>
                <div className='flex items-center justify-around gap-4'>
                 <div className='flex items-center gap-3 cursor-pointer'>
                                <MdRestaurantMenu  className='text-[#f5f5f5] text-4xl'/>
                                <div className='flex flex-col items-start'>
                                    <h3 className='text-md text-[#f5f5f5] font-semibold'>{customerData.customerName || "Customer Name"}</h3>
                                    <p  className='text-xs text-[#ababab] font-semibold'> Table:{customerData.table?.tableNo||"N/A"}</p>
                                </div>
                            </div>
                </div>
              </div>
              <MenuContainer />
    </div>

    
    
    {/* Right Side */}
    <div className='flex-[1] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2 '> </div>
  {/* customerInfo */}
 <CustomerInfo />
   <hr className='border-[2a2a2a] border-t-2'/>
  {/* CartItems */}
     <hr className='border-[2a2a2a] border-t-2'/>
  <CartInfo />
    <div className='px-4  h-[500px] overflow-y-auto scrollbar-hide '>

  {/* bills */}
  <Bill />
 
 

    </div>
       
       

     <BottomNav />
        
    </section>
   
  )
}
export default Menu