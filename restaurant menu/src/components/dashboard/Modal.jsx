import React, { useState } from 'react'
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io"
import { addTable } from '../../https';
// 1. Import the hook 'useQueryClient'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";


const Modal = ({ setIsTableModalOpen }) => {
    // 2. Get the client instance
    const queryClient = useQueryClient();

    const [tableData, setTableData] = useState({
        tableNo: "",
        seats: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTableData((prev) => ({ ...prev, [name]: value }))
    }

    const tableMutation = useMutation({
        mutationFn: (reqData) => addTable(reqData),
        // 3. Renamed param to 'response'
        onSuccess: (response) => {
            setIsTableModalOpen(false);
            // 4. Destructured 'data' from 'response'
            const { data } = response;
            enqueueSnackbar(data.message || "Table added!", { variant: "success" })
            // 5. Invalidate queries to refetch
            queryClient.invalidateQueries(['tables']);
        },
        onError: (error) => {
            const { data } = error.response
            enqueueSnackbar(data.message, { variant: "error" })
            console.log(error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutation.mutate(tableData);
    }

    const handleCloseModal = () => {
        setIsTableModalOpen(false);
    }

    return (
        <div className='fixed inset-0 bg-[#000000] bg-opacity-50 flex items-center justify-center z-50'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-[#262626] p-6 rounded-lg shadow-lg w-96">


                {/* Modal header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[#f5f5f5] text-xl font-semibold">
                        Add Table
                    </h2>
                    <button onClick={handleCloseModal} className='text-[#f5f5f5] hover:text-[#ff0000] '>
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* modal body */}

                {/* 6. Added 'flex-col' for correct layout */}
                <form onSubmit={handleSubmit} className='space-y-4 mt-10 flex flex-col'>
                    <div>
                        <label className='block text-[#ababab] mb-2 text-sm font-medium'>Table Number</label>
                        <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                            <input type="number" name="tableNo" value={tableData.tableNo} onChange={handleInputChange} className='bg-transparent flex-1 text-[#ffffff] focus:outline-none'
                                required />
                        </div>
                    </div>
                    <div>
                        <label className='block text-[#ababab] mb-2 text-sm font-medium'>Number Of Seats</label>
                        <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                            <input type="number" name="seats" value={tableData.seats} onChange={handleInputChange} className='bg-transparent flex-1 text-[#ffffff] focus:outline-none'
                                required />
                        </div>
                    </div>
                    
                    {/* 7. Added disabled state to button */}
                    <button 
                        type='submit' 
                        className='w-full rounded-lg mt-6 py-3 text-lg bg-[#fffc00] text-gray-900 font-bold disabled:bg-gray-600 disabled:cursor-not-allowed'
                        disabled={tableMutation.isPending}
                    >
                        {tableMutation.isPending ? "Adding..." : "Add Table"}
                    </button>
                </form>

            </motion.div>

        </div>
    )
}

export default Modal