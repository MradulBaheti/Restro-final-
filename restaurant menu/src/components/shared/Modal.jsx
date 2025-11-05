import React from 'react'

export const Modal = ({title,onClose,isOpen,children}) => {
    if(!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
       <div className='bg-[#1a1a1a] shadow-lg w-full max-w-lg mx-4 rounded-lg p-4'>
            <div className='flex justify-between items-center px-6 py-4 border-b border-[#333]'>
                <h4 className='text-xl text-[#f5f5f5] font-semibold'>{title}</h4>
                <button className='text-[#999999] text-2xl hover:text[#D9D9D9]' onClick={onClose}>
                    x
                </button>
            </div>
            <div className='p-6'>
                {children}
            </div>
       </div>
    </div>
  )
}

export default Modal