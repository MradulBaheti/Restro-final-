import React, { useState } from 'react'; // Removed unused 'act'
import { MdTableBar, MdCategory } from 'react-icons/md';
import { BiSolidDish } from 'react-icons/bi';
import { Metrices } from '../components/dashboard/Metrices';
import RecentOrders from '../components/dashboard/RecentOrders';
import { act } from 'react';
import Modal from '../components/dashboard/Modal';

const buttons = [
    { label: "add table", icon: <MdTableBar />, action: "table" },
    { label: "add category", icon: <MdCategory />, action: "category" },
    { label: "add dishes", icon: <BiSolidDish />, action: "dishes" },
];

// 1. Corrected typo "payement" -> "payment"
const tabs = ["metrics", "orders", "payment"];

const Dashboard = () => {
    const[isTableModalOpen,setIsTableModalOpen]=useState(false);
    // 2. Corrected initial state to match tab array
    const [activeTab, setActiveTab] = useState("metrics");

    const handleOpenModal=(action)=>{
        if(action=== "table") setIsTableModalOpen(true)
    }

    return (
        <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)]'>
            <div className='container mx-auto flex items-center justify-between py-14 px-6 md:px-4'>
                <div className='flex items-center gap-3'>
                    {
                        buttons.map(({ label, icon, action }) => {
                            return (
                                <button onClick={()=>handleOpenModal(action)}
                                    key={label} // 'key' prop is already correctly added here
                                    className='bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2'
                                >
                                    {label} {icon}
                                </button>
                            );
                        })
                    }
                </div>
                <div className='flex items-center gap-3'>
                    {
                        tabs.map((tab) => {
                            return (
                                <button
                                    // 3. Added the missing 'key' prop
                                    key={tab}
                                    // 4. Removed extra single-quote ' from the active class
                                    className={`px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626] "}`}
                                    onClick={() => setActiveTab(tab)} >
                                    {tab}
                                </button>
                            );
                        })
                    }
                </div>
            </div>

            {activeTab === "metrics" && <Metrices />}
            {activeTab === "orders" && <RecentOrders />}
            {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen}/>}
           
        </div>
    );
}

export default Dashboard;