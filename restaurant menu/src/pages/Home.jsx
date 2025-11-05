import React from 'react'
import { BottomNav } from '../components/shared/BottomNav'
import Greetings from '../components/Home/Greetings'
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { MiniCard } from '../components/Home/MiniCard'
import { RecentOrder } from '../components/Home/RecentOrder';
import PopularDishes from '../components/Home/PopularDishes';

const Home = () => {
  return (
   <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
    {/* Left Side */}
    <div className='flex-[3] '></div>
    <Greetings />
    <div className='flex items-center w-full gap-3 px-8 mt-8'>
        <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512} footerNum={1.6} />
        <MiniCard  title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
    </div>
    <RecentOrder />
    {/* Right Side */}
    <div className='flex-[2]'>
        <PopularDishes />
    </div>
    <BottomNav />
   </section>
  )
}

export default Home