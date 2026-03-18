import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useOrders } from '../contexts/OrderContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function OrderHistoryPage() {
  const { orders, loading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const handleCancelOrder = async (orderId) => {
    // TODO: Implement cancel order functionality
    console.log('Cancel order:', orderId);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-[#C4B5FD]';
      case 'cancelled':
        return 'bg-[#FF6B6B]';
      case 'pending':
        return 'bg-[#FFD93D]';
      case 'shipped':
        return 'bg-[#C4B5FD]';
      default:
        return 'bg-[#FFD93D]';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 sm:mb-12">MY ORDERS</h1>
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-black bg-white mx-auto mb-6 animate-spin"></div>
            <p className="text-lg font-black uppercase tracking-widest">LOADING YOUR ORDERS...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 sm:mb-12">MY ORDERS</h1>
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">NO ORDERS YET</h2>
            <p className="text-base sm:text-lg font-bold mb-8 uppercase tracking-wide">YOU HAVEN'T PLACED ANY ORDERS WITH US YET</p>
            <Link 
              to="/products"
              className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center
                shadow-[6px_6px_0px_0px_#000]
                hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                transition-all duration-100"
            >
              START SHOPPING
            </Link>
          </div>
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
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 sm:mb-12">MY ORDERS</h1>
        
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div 
              key={order.orderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] 
                hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] 
                transition-all duration-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className={`${getStatusColor(order.status)} border-b-4 border-black p-4 sm:p-6`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <p className="text-lg sm:text-xl font-black uppercase tracking-tight">
                      ORDER ID: {order.orderId}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-wide">
                      PLACED ON {formatDate(order.date)}
                    </p>
                    {order.paymentMethod && (
                      <p className="text-sm font-bold uppercase tracking-wide">
                        PAYMENT: {order.paymentMethod}
                      </p>
                    )}
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl sm:text-2xl font-black">{formatPrice(order.total)}</p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <span className={`${getStatusColor(order.status)} border-2 border-black font-black text-xs uppercase tracking-widest px-3 py-1 inline-block`}>
                        {order.status}
                      </span>
                      {order.canCancel && order.status === 'Pending' && (
                        <button 
                          onClick={() => handleCancelOrder(order.orderId)}
                          className="bg-[#FF6B6B] border-2 border-black text-white font-black text-xs uppercase tracking-widest px-3 py-1
                            hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]
                            active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                            transition-all duration-100"
                        >
                          CANCEL
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              <details className="group">
                <summary className="cursor-pointer p-4 sm:p-6 font-black uppercase tracking-widest text-sm hover:bg-[#C4B5FD] transition-colors">
                  VIEW DETAILS ({order.items.length} ITEMS) 
                  <span className="float-right group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                
                <div className="border-t-4 border-black p-4 sm:p-6 bg-[#FFFDF5]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Item List */}
                    {order.items && order.items.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="font-black uppercase tracking-widest text-sm border-b-2 border-black pb-2">
                          ITEMS IN THIS ORDER
                        </h4>
                        {order.items.map((item, idx) => (
                          <div key={`${item.product_id}-${idx}`} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 border-2 border-black overflow-hidden flex-shrink-0">
                                <img src={item.images?.[0] || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow">
                                <p className="font-black text-sm uppercase tracking-wide">{item.name}</p>
                                <p className="font-bold text-xs uppercase tracking-widest">QTY: {item.qty}</p>
                              </div>
                              <p className="font-black text-sm">{formatPrice((item.mrp - (item.mrp * item.discount / 100)) * item.qty)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#FFD93D] border-4 border-black p-6 text-center">
                        <p className="font-bold uppercase tracking-wide">ORDER DETAILS NOT AVAILABLE</p>
                      </div>
                    )}
                    
                    {/* Delivery Details */}
                    {order.deliveryDetails && (
                      <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                        <div className="bg-[#C4B5FD] border-b-4 border-black p-4">
                          <h4 className="font-black uppercase tracking-widest text-sm">DELIVERY DETAILS</h4>
                        </div>
                        <div className="p-4">
                          <p className="font-black text-base uppercase tracking-wide">{order.deliveryDetails.name}</p>
                          <p className="font-bold text-sm">{order.deliveryDetails.address}</p>
                          <p className="font-bold text-sm">PHONE: {order.deliveryDetails.phone}</p>
                          <div className="mt-4 pt-4 border-t-2 border-black">
                            <div className="bg-[#FFD93D] border-2 border-black p-2 inline-block">
                              <p className="font-black text-xs uppercase tracking-widest">
                                ESTIMATED DELIVERY: {formatDate(order.deliveryDetails.estimatedDelivery)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t-4 border-black">
                    <button className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                      text-sm px-6 py-3 h-12 w-full sm:w-auto
                      shadow-[4px_4px_0px_0px_#000]
                      hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                      active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                      transition-all duration-100"
                    >
                      REORDER
                    </button>
                    <button className="bg-white border-4 border-black font-black uppercase tracking-widest 
                      text-sm px-6 py-3 h-12 w-full sm:w-auto
                      shadow-[4px_4px_0px_0px_#000]
                      hover:bg-[#C4B5FD] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                      active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                      transition-all duration-100"
                    >
                      TRACK ORDER
                    </button>
                  </div>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}