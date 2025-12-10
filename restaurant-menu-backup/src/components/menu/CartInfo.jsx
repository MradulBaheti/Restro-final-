import React, { useEffect } from 'react'
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaNotesMedical } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItems } from '../../redux/slices/cartSlice';

export const CartInfo = () => {
    const cartData = useSelector((state) => state.cart);
   const scrollRef = React.useRef();

    const dispatch = useDispatch();

    useEffect(()=>{
    if(scrollRef.current){
        scrollRef.current.scrollTo({
            top:scrollRef.current.scrollHeight,
            behavior:"smooth"
        })
    }
    },[cartData]);


    const handleRemove = (itemId) => {
        dispatch(removeItems({ id: itemId }));
    }
  return (
   <div>
    <h3 className='text-lg text-[#e4e4e4] font-semibold tracking-wide'>Order Details</h3>
    <div className='mt-4 overflow-y-scroll scrollbar-hide h-[380px]' ref={scrollRef}>
       {cartData.length===0?(
        <p className='text-[#ababab] text-sm flex justify-center items-center h-[380px]'>Your Cart is empty. Start adding Items!</p>
       ): cartData.map((item)=>{
        return (
             <div className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[#ababab] font-semibold tracking-wide text-md'>{item.name} </h3>
            <p className='text-[#ababab] font-semibold'>x{item.quantity}</p>
        </div>

    <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center gap-3'>
    <RiDeleteBin2Fill onClick={()=>handleRemove(item.id)} className='text-[#ababab] cursor-pointer' size={20}/>
    <FaNotesMedical className='text-[#ababab] cursor-pointer' size={20}/>

        </div>
        <p className='text-[#f5f5f5] text-md font-bold'>rs.{item.price}</p>
    </div>
        </div>
        )

       })}
        
    </div>
    </div>
  )
}
