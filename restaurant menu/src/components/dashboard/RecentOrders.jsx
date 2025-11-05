import React from "react";
// Removed unused 'GrUpdate' import
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
// This import is from your file. If it's wrong, you'll need to fix the path.
import { getOrders, updateOrderStatus } from '../../https/index';

// --- Defined the missing helper function ---
const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleString(undefined, options);
};

const RecentOrders = () => {
  const queryClient=useQueryClient();

  // --- Mutation for updating status ---
  const orderStatusUpdateMutation=useMutation({
    mutationFn:({orderId,orderStatus})=>updateOrderStatus({orderId, orderStatus}),
    onSuccess:(data)=>{
      enqueueSnackbar("Order Status updated successfully!",{variant:"success"});
      
      // --- CORRECTION: Correct syntax for invalidation ---
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError:()=>{
      enqueueSnackbar("Failed to update order status",{variant:"error"});
    }
  });

  const handleStatusChange = ({orderId,orderStatus}) => {
    orderStatusUpdateMutation.mutate({orderId,orderStatus});
  };

  // --- Query for fetching orders ---
  const {data:resData, isError, isLoading}=useQuery({ // Added isLoading
    queryKey:["orders"],
    queryFn:async()=>{
      return await getOrders();
    },
    placeholderData:keepPreviousData
  });

  if(isError){
    enqueueSnackbar("Something went wrong!",{variant:"error"})
  }

  // --- Added a loading state ---
  if (isLoading) {
    return (
      <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
        <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
          Recent Orders
        </h2>
        <p className="text-[#ababab] text-center p-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              {/* Removed the 'Action' header */}
            </tr>
          </thead>
          <tbody>
            {resData?.data?.data?.map((order) => ( // Removed 'index'
              <tr
                // --- CORRECTION: Use the unique order._id as the key ---
                key={order._id}
                className="border-b border-gray-600 hover:bg-[#333]"
              >
                {/* Using a shorter ID for display */}
                <td className="p-4">#{order._id ? order._id.slice(-6) : '...'}</td>
                <td className="p-4">{order.customerDetails?.name || 'N/A'}</td>
                <td className="p-4">
                  <select
                    className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${
                      order.orderStatus === "Ready"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                    // --- CORRECTION: Disable while mutation is pending ---
                    ${orderStatusUpdateMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange({orderId : order._id,orderStatus:e.target.value})}
                    disabled={orderStatusUpdateMutation.isPending}
                  >
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                <td className="p-4">{order.items?.length || 0} Items</td>
                <td className="p-4">Table - {order.table?.tableNo || 'N/A'}</td>
                
                {/* --- CORRECTION: Fixed typo from 'bills' to 'bill' --- */}
                <td className="p-4">₹{order.bill?.totalWithTax || '0.00'}</td>
                
                {/* Removed the 'Action' button cell */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;