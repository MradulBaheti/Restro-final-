import React from 'react'
import { BottomNav } from '../components/shared/BottomNav'
import { BackButton } from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'
import {keepPreviousData, useQuery} from "@tanstack/react-query"
import { getTables } from '../https'
import {enqueueSnackbar} from "notistack"

const Tables = () => {
const [status, setStatus] = React.useState("all");

const {data:resData,isError}=useQuery({
queryKey:["tables"],
queryFn:async()=>{
  return await getTables();

},
placeholderData:keepPreviousData

});
if(!isError){
  enqueueSnackbar("Something went wrong!", {variant:"error"})
}
console.log(resData);

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden '>
        <div className='flex items-center justify-between px-10 py-4 mt-2 '>
               <div className='flex items-center gap-4'>
                <BackButton/>
                 <h4 className='text-[#f5f5f5] text-2xl font-boldmtracking-wide'>Tables</h4>
               </div>

      <div className='flex items-center justify-around gap-4'>
          <button onClick={()=>setStatus("all")} className={`text-[#ababab] text-lg ${status ==="all"&& "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>All</button>
          <button onClick={()=>setStatus("Booked")} className={`text-[#ababab] text-lg ${status ==="Booked"&& "bg-[#383838] rounded-lg px-5 py-2"}rounded-lg px-5 py-2 font-semibold`}>Booked</button>
          
        </div>
             
        </div>
        
        <div className=' flex flex-wrap  gap-5 p-10'>
    {
        resData?.data.data.map((table)=>{
            return(
                <TableCard id={table.id} name={table.tableNo} status={table.status}  initials={table?.currentOrder?.customerDetails.name} seats={table.seats}/>
            )
        })
    }
           
            
        </div>
        <BottomNav/>
    </section>
  )
}

export default Tables