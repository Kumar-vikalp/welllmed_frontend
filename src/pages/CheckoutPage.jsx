import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/userSlice';
import { createOrder } from "../store/slices/ordersSlice";
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderItems = cart.map((item) => ({
        product: item.product_id,
        quantity: item.qty,
      }));

      const orderData = {
        paymentMethod: paymentMethod,
        items: orderItems,
      };

      const resultAction = await dispatch(createOrder(orderData));
      const result = resultAction.payload;

      if (result) {
        dispatch(clearCart());
        navigate('/order-success', {
          state: {
            orderId: result.order_id || `ORD-${Date.now()}`,
          },
        });
      }
    } catch (error) {
      console.error('Failed to create order', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">YOUR CART IS EMPTY</h1>
          <p className="text-base sm:text-lg font-bold uppercase tracking-wide mb-8">YOU CAN'T CHECKOUT WITHOUT ANY ITEMS</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
              text-sm px-6 py-4 h-14 w-full sm:w-auto
              shadow-[6px_6px_0px_0px_#000]
              hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
              active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
              transition-all duration-100"
          >
            START SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-center mb-8 sm:mb-12">
          CHECKOUT
        </h1>
        
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden">
              <div className="bg-[#C4B5FD] border-b-4 border-black p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">SHIPPING ADDRESS</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="bg-[#FFD93D] border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="font-black text-lg uppercase tracking-wide">{user?.name}</p>
                  <p className="font-bold">{user?.address}</p>
                  <p className="font-bold">{user?.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden">
              <div className="bg-[#FFD93D] border-b-4 border-black p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">PAYMENT METHOD</h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <label
                  className={`flex items-center p-4 sm:p-6 border-4 border-black cursor-pointer transition-all duration-100 ${
                    paymentMethod === 'UPI' 
                      ? 'bg-black text-white shadow-[4px_4px_0px_0px_#000]' 
                      : 'bg-white hover:bg-[#C4B5FD] shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="sr-only"
                  />
                  <div className="w-6 h-6 border-4 border-current mr-4 flex items-center justify-center">
                    {paymentMethod === 'UPI' && <div className="w-2 h-2 bg-current"></div>}
                  </div>
                  <span className="text-lg font-black uppercase tracking-wide">UPI PAYMENT</span>
                </label>
                
                <label
                  className={`flex items-center p-4 sm:p-6 border-4 border-black cursor-pointer transition-all duration-100 ${
                    paymentMethod === 'COD' 
                      ? 'bg-black text-white shadow-[4px_4px_0px_0px_#000]' 
                      : 'bg-white hover:bg-[#C4B5FD] shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="sr-only"
                  />
                  <div className="w-6 h-6 border-4 border-current mr-4 flex items-center justify-center">
                    {paymentMethod === 'COD' && <div className="w-2 h-2 bg-current"></div>}
                  </div>
                  <span className="text-lg font-black uppercase tracking-wide">CASH ON DELIVERY</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] sticky top-24 overflow-hidden">
              <div className="bg-[#FF6B6B] border-b-4 border-black p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">ORDER SUMMARY</h2>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.product_id} className="flex justify-between items-center text-sm border-b-2 border-black pb-2">
                      <div className="flex-1">
                        <span className="font-bold uppercase tracking-wide">
                          {item.name} × {item.qty}
                        </span>
                      </div>
                      <span className="font-black">
                        {formatPrice((item.mrp - (item.mrp * item.discount) / 100) * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-black">
                    <span className="font-bold uppercase tracking-wide">SUBTOTAL</span>
                    <span className="font-black text-lg">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-black">
                    <span className="font-bold uppercase tracking-wide">SHIPPING</span>
                    <span className="font-black bg-[#C4B5FD] border-2 border-black px-2 py-1 text-xs">FREE</span>
                  </div>
                  <div className="bg-black text-white p-4 border-4 border-black">
                    <div className="flex justify-between items-center">
                      <span className="font-black uppercase tracking-widest text-xl">TOTAL</span>
                      <span className="font-black text-2xl">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                    text-sm py-4 h-14 disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-[6px_6px_0px_0px_#000]
                    hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                    active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                    transition-all duration-100"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white mr-2 animate-spin"></div>
                      PLACING ORDER...
                    </div>
                  ) : (
                    `PLACE ORDER ${formatPrice(cartTotal)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}