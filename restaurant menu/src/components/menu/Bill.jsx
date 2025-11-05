import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice } from '../../redux/slices/cartSlice';
import { addOrder, createOrderRazorpay, updateTable, verifyPaymentRazorpay } from '../../https/index';
import { enqueueSnackbar } from "notistack";
import { useMutation } from '@tanstack/react-query';
import { removeCustomer } from '../../redux/slices/customerSlice';
import { removeAllItems } from "../../redux/slices/cartSlice";
// Make sure this path '../invoice/Invoice' is correct
import Invoice from '../invoice/Invoice';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const Bill = () => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);

  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", { variant: "warning" });
      return;
    }
    
    console.log("Customer data from Redux:", customerData);

    if (paymentMethod === "Online") {
      try {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          enqueueSnackbar("Razorpay SDK failed to load", { variant: "warning" });
          return;
        }
        
        const reqData = { amount: totalPriceWithTax.toFixed(2) };
        const { data } = await createOrderRazorpay(reqData);
        
        const options = {
          key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "RESTRO",
          description: "Secure Payment for Your Meal",
          order_id: data.order.id,
          handler: async function (response) {
            
            const verification = await verifyPaymentRazorpay(response);
            enqueueSnackbar(verification.data.message, { variant: "success" });

            const orderData = {
              customerDetails: {
                name: customerData.customerName,
                phone: customerData.customerPhone,
                guests: customerData.guests
              },
              orderStatus: "In Progress",
              bills: {
                total: total,
                tax: tax,
                totalWithTax: totalPriceWithTax
              },
              items: cartData,
              table: customerData.table.tableId, 
              paymentMethod: paymentMethod, 
              paymentData: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id
              }
            };
            
            console.log("--- SENDING THIS DATA (Online) ---", orderData);
            orderMutation.mutate(orderData);
          },
          prefill: {
            name: customerData.customerName, 
            email: "",
            contact: customerData.customerPhone,
          },
          theme: { color: "#025cca" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.log("Razorpay Error:", error);
        enqueueSnackbar("Payment Failed!", { variant: "error" });
      }
    } else {
      // Logic for "Cash" payment
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod: paymentMethod,
      };
      
      console.log("--- SENDING THIS DATA (Cash) ---", orderData);
      orderMutation.mutate(orderData);
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      console.log("Order placed:", data);
      
      setOrderInfo(data);
      setShowInvoice(true);
      enqueueSnackbar("Order Placed!", { variant: "success" });

      // --- THIS IS THE FINAL FIX ---
      // Changed 'orderId' to 'currentOrder' to match your tableModal.js
      const tableData = {
        status: "Booked",
        currentOrder: data._id, 
        tableId: data.table 
      };
      // --- END OF FIX ---

      setTimeout(() => {
        console.log("Updating table with:", tableData);
        tableUpdateMutation.mutate(tableData);
      }, 1500);
    },
    onError: (error) => {
      console.error("--- ORDER FAILED! ---", error);
      console.error("Backend response:", error.response?.data);
      enqueueSnackbar("Failed to place order", { variant: "error" });
    }
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log("Table updated:", resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log("Table update failed:", error);
      console.error("Backend response:", error.response?.data);
      enqueueSnackbar("Failed to update table status", { variant: "error" });
    }
  });

  return (
    <>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Items ({cartData.length})</p>
        <h3 className='text-[#f5f5f5] text-md font-bold'>rs.{total.toFixed(2)}</h3>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Tax (5.25)%</p>
        <h3 className='text-[#f5f5f5] text-md font-bold'>rs.{tax.toFixed(2)}</h3>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Total With Tax</p>
        <h3 className='text-[#f5f5f5] text-md font-bold'>rs.{totalPriceWithTax.toFixed(2)}</h3>
      </div> 

      <div className='flex items-center gap-3 px-5 mt-4'>
        <button 
          onClick={() => setPaymentMethod("Cash")} 
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Cash" ? "bg-[#383737]" : ""}`}
        >
          Cash
        </button>
        <button 
          onClick={() => setPaymentMethod("Online")}  
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Online" ? "bg-[#383737]" : ""}`}
        >
          Online
        </button>
      </div>
      
      <div className='flex items-center gap-3 px-5 mt-4'>
        <button 
          onClick={handlePlaceOrder} 
          disabled={orderMutation.isPending}
          className={`bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg ${orderMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {orderMutation.isPending ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>

      {showInvoice && orderInfo && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  )
}