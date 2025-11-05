import React from 'react'
import { menus } from '../../constants'
import { GrRadialSelected } from 'react-icons/gr';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';

// We must export this as a NAMED export, as 'Menu.jsx' expects.
export const MenuContainer = () => {

  const[selected,setSelected]=React.useState(menus[0]);
  
  // This state is correct
  const[itemCounts,setItemCounts]=React.useState({});

  // 1. This is the new handler function
  const handleCategorySelect = (menu) => {
    setSelected(menu);  // 1. Set the new category
    setItemCounts({});  // 2. Reset all item counts to an empty object
  };
  const dispatch=useDispatch();

  const increment = (e, id) => {
    e.stopPropagation(); 
    setItemCounts(prevCounts => {
      const currentCount = prevCounts[id] || 0;
      if (currentCount >= 4) return prevCounts;
      return { ...prevCounts, [id]: currentCount + 1 };
    });
  };

  const decrement = (e, id) => {
    e.stopPropagation(); 
    setItemCounts(prevCounts => {
      const currentCount = prevCounts[id] || 0;
      if (currentCount <= 0) return prevCounts;
      return { ...prevCounts, [id]: currentCount - 1 };
    });
  };
  const handleAddToCart = (item) => {
    const itemCount = itemCounts[item.id] || 0;
   if(itemCount===0) return;

   const {name,price} =item;
   const newObj={id:new Date(),name,pricePerQuantity:price,quantity:itemCount,price:price*itemCount};
   
    dispatch(addItems(newObj));
    setItemCounts(0);  

  }

  return (
    <>
    {/* Category Selection Menu */}
    <div className='px-10 grid grid-cols-4 gap-4'>
      {
        menus.map((menu)=>{
            return(
                <div 
                  key={menu.id} 
                  // 2. Use the new handler function here
                  onClick={() => handleCategorySelect(menu)}
                  className='flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer' 
                  style={{backgroundColor:menu.bgColor}}
                >
                    <div className='flex items-center justify-between w-full'>
                        <h3 className='text-[#f5f5f5] text-lg font-semibold flex items-center'>
                          <span className='mr-3 text-2xl'>{menu.icon}</span>
                          {menu.name}
                        </h3>
                        {selected.id===menu.id && <GrRadialSelected className='text-[#f5f5ff] text-2xl'/> }
                    </div>
                    <p className='text-[#ababab] text-sm font-semibold'>{menu.items.length} Items</p>
                </div>
            )
        })
      }
    </div>
    <hr className='border-[#2a2a2a] border-t-2 mt-4'/>
    
    {/* Item Selection Menu */}
    <div>
         <div className='px-10 grid grid-cols-4 gap-4'>
      {
        selected?.items.map((item)=>{
            return(
                <div 
                  key={item.id} 
                  className='flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]'
                >
                    <div className='flex items-start justify-between w-full'>
                      <h3 className='text-[#f5f5f5] text-lg font-semibold flex items-center'> {item.name}</h3>
                   <button onClick={()=>handleAddToCart(item)} className='bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg cursor-pointer'> <FaShoppingCart size={20} /></button>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-[#ababab] text-xl font-semibold'>rs.{item.price}</p>
                    <div className="flex items-center justify-between rounded-lg py-3 px-4 bg-[#1f1f1f] gap-6 z-20">
                      <button  onClick={(e)=>decrement(e, item.id)}  className="text-[#14FF20] text-xl bg-[#1f1f1f]" >-</button>
                      {/* This logic now works perfectly. It shows 0 for new categories. */}
                      <span className="text-[#ffffff] ">{itemCounts[item.id] || 0}</span>
                      <button  onClick={(e)=>increment(e, item.id)}  className="text-[#14FF20] text-xl bg-[#1f1f1f]">+</button>
                    </div>
                  </div>
                </div>
            )
        })
      }
    </div>
    </div>
    </>
  )
}