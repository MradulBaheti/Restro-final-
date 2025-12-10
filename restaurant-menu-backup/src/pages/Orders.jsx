import React,{useEffect, useState} from 'react'
import { BottomNav } from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import { BackButton } from '../components/shared/BackButton'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getOrders } from '../https/index'
import { enqueueSnackbar } from 'notistack'

const Orders = () => {

  const [status, setStatus] = React.useState("all");
  useEffect(()=>{
    document.title="POS|Orders"
  },[])

  const {data:resData,isError}=useQuery({

    queryKey:["orders"],
    queryFn:async()=>{
      return await getOrders();
    },
    placeholderData:keepPreviousData
  })

  if(isError){
    enqueueSnackbar("something went wrong!",{variant:"error"})
  }

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden '>
      <div className='flex items-center justify-between px-10 py-4 mt-2 '>
       <div className='flex items-center gap-4'>
        <BackButton/>
         <h4 className='text-[#f5f5f5] text-2xl font-boldmtracking-wide'>Orders</h4>
       </div>
        <div className='flex items-center justify-around gap-4'>
          <button onClick={()=>setStatus("all")} className={`text-[#ababab] text-lg ${status==="all"&& "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>All</button>
          <button onClick={()=>setStatus("progress")} className={`text-[#ababab] text-lg ${status==="progress"&& "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>In Progress</button>
          <button onClick={()=>setStatus("ready")}className={`text-[#ababab] text-lg ${status==="ready"&& "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>Ready</button>
          <button onClick={()=>setStatus("completed")} className={`text-[#ababab] text-lg ${status==="completed"&& "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>Completed!</button>
        </div>
      </div>

      <div className=' flex flex-wrap gap-6 items-center  px-14 py-4 overflow-y-scroll h-[calc(100vh-12rem)] scrollbar-hide'>
       {
        resData?.data.data.length>0?(
          resData.data.data.map((order)=>{
            return <OrderCard  key={order._id} order={order}/>
          })
        ): <p className='col-span-3 text-[#DEDAD9]'>No Orders Available</p>
       }
      
      </div>

      <BottomNav/>
    </section>
  )
}

export default Orders