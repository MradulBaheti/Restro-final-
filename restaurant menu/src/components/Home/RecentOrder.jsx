import React from 'react'
import {FaSearch} from "react-icons/fa";
import { OrderList } from './OrderList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders } from '../../https/index';

export const RecentOrder = () => {
 const {data:resData,isError}=useQuery({

    queryKey:["orders"],
    queryFn:async()=>{
      return await getOrders();
    },
    placeholderData:keepPreviousData,
  })

  if(isError){
    enqueueSnackbar("something went wrong!",{variant:"error"})
  }

  return (
    <div className='px-8 mt-6'>
    <div className='bg-[#1a1a1a] w-full h-[450px] rounded-lg'>
        <div>
            <h1  className='text-[#f5f5f5] text-lg font-semibold'>Recent Orders</h1>
            <a href="" className='text-[#025cca] text-sm font-semibold'>View All</a>
        </div>

         <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6" >
        <FaSearch  className="text-[#f5f5f5]"/>
        <input type="text" placeholder='Search Recent Orders' className="bg-[#1f1f1f] outline-none text-[#f5f5f5]" />
            </div>

            {/* orderList */}
          <div className='mt-4 px-6 overflow-y-scroll h-[350px] scrollbar-hide'>
         
           {
        resData?.data.data.length>0?(
          resData.data.data.map((order)=>{
            return <OrderList  key={order._id} order={order}/>
          })
        ): <p className='col-span-3 text-[#DEDAD9]'>No Orders Available</p>
       }
          </div>

    </div>

    </div>
  )
}
