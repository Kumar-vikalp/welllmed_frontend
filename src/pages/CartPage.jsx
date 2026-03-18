import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  selectCartItems,
  selectCartTotal,
  selectCartLoading,
  updateCartItem,
  removeCartItem,
  fetchCart
} from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const loading = useSelector(selectCartLoading);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Fetch cart data when component mounts if user is logged in
    if (user && !isInitialized) {
      dispatch(fetchCart()).finally(() => {
        setIsInitialized(true);
      });
    } else if (!user) {
      setIsInitialized(true);
    }
  }, [user, dispatch, isInitialized]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleUpdateQty = async (cart_item_id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cart_item_id);
    } else {
      try {
        await dispatch(updateCartItem({ cart_item_id, quantity: newQty })).unwrap();
        dispatch(fetchCart()); // Refresh cart
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    }
  };

  const handleRemoveItem = async (cart_item_id) => {
    try {
      await dispatch(removeCartItem(cart_item_id)).unwrap();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  // Show loading state while initializing
  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-black bg-white mx-auto mb-6 animate-spin"></div>
            <p className="text-lg font-black uppercase tracking-widest">LOADING YOUR CART...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">PLEASE LOGIN</h2>
            <p className="text-base sm:text-lg font-bold mb-8 uppercase tracking-wide">YOU NEED TO LOGIN TO VIEW YOUR CART</p>
            <Link 
              to="/login"
              className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center
                shadow-[6px_6px_0px_0px_#000]
                hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                transition-all duration-100"
            >
              LOGIN NOW
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-center mb-8 sm:mb-12">
            SHOPPING CART
          </h1>
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">YOUR CART IS EMPTY</h2>
            <p className="text-base sm:text-lg font-bold mb-8 uppercase tracking-wide">LOOKS LIKE YOU HAVEN'T ADDED ANY ITEMS YET</p>
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
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-center mb-8 sm:mb-12">
          SHOPPING CART
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={item.product_id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] 
                  hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] 
                  transition-all duration-200 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                  <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                    <div className="w-full sm:w-24 h-32 sm:h-24 border-4 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                      <div className="mb-4 sm:mb-0">
                        <Link to={`/product/${item.slug}`}>
                          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight hover:text-[#FF6B6B] transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm font-bold uppercase tracking-wide">{item.company}</p>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">{item.disease_category}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.cart_item_id)}
                        className="bg-[#FF6B6B] border-2 border-black w-8 h-8 flex items-center justify-center
                          shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                          transition-all duration-100"
                      >
                        <svg className="w-4 h-4 stroke-[3px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border-4 border-black bg-white">
                          <button
                            onClick={() => handleUpdateQty(item.cart_item_id, Math.max(1, item.qty - 1))}
                            className="w-10 h-10 font-black text-lg border-r-2 border-black hover:bg-[#FFD93D] transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center font-black text-lg border-r-2 border-black">{item.qty}</span>
                          <button
                            onClick={() => handleUpdateQty(item.cart_item_id, Math.min(item.available_stock, item.qty + 1))}
                            className="w-10 h-10 font-black text-lg hover:bg-[#FFD93D] transition-colors"
                            disabled={item.qty >= item.available_stock}
                          >
                            +
                          </button>
                        </div>
                        <div className="bg-[#C4B5FD] border-2 border-black px-3 py-1">
                          <span className="text-xs font-black uppercase tracking-widest">
                            STOCK: {item.available_stock}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-black">
                          {formatPrice((item.discounted_price || (item.mrp - (item.mrp * item.discount / 100))) * item.qty)}
                        </p>
                        {item.discount > 0 && (
                          <p className="text-sm font-bold line-through opacity-60">
                            {formatPrice(item.mrp * item.qty)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] sticky top-24 overflow-hidden">
              <div className="bg-[#FFD93D] border-b-4 border-black p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">ORDER SUMMARY</h2>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-black">
                    <span className="font-bold uppercase tracking-wide">SUBTOTAL ({cart.reduce((count, item) => count + item.qty, 0)} ITEMS)</span>
                    <span className="font-black text-lg">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-black">
                    <span className="font-bold uppercase tracking-wide">SHIPPING</span>
                    <span className="font-black bg-[#C4B5FD] border-2 border-black px-2 py-1 text-xs">FREE</span>
                  </div>
                  <div className="bg-black text-white p-4 border-4 border-black">
                    <div className="flex justify-between items-center">
                      <span className="font-black uppercase tracking-widest">TOTAL</span>
                      <span className="font-black text-xl sm:text-2xl">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                    text-sm py-4 h-14 block text-center mb-4
                    shadow-[6px_6px_0px_0px_#000]
                    hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                    active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                    transition-all duration-100"
                >
                  PROCEED TO CHECKOUT
                </Link>

                <Link
                  to="/products"
                  className="w-full bg-white border-4 border-black font-black uppercase tracking-widest 
                    text-sm py-4 h-14 block text-center
                    shadow-[4px_4px_0px_0px_#000]
                    hover:bg-[#FFD93D] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                    transition-all duration-100"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}