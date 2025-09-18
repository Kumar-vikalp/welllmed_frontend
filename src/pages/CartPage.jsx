import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';
import { useState } from 'react';
import Lottie from 'lottie-react';
// import emptyCartAnimation from '../assets/empty-cart.json';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount, loading } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      // Redirect to login, but remember where we came from
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  };
  
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setToast({ message: 'Item removed from cart', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to remove item', type: 'error' });
    }
  };

  const handleUpdateQty = async (productId, newQty) => {
    try {
      await updateQty(productId, newQty);
    } catch (error) {
      setToast({ message: 'Failed to update quantity', type: 'error' });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Loading Cart...</h1>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        {/* <Lottie animationData={emptyCartAnimation} loop={true} className="w-64 h-64 mx-auto" /> */}
        <h1 className="text-3xl font-bold mt-8 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-800 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toast message={toast.message} type={toast.type} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <h1 className="text-4xl font-extrabold my-8 text-center">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-gray-200 rounded-lg p-6">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.product_id}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                  className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-800">{item.company}</p>
                      <button onClick={() => handleRemoveFromCart(item.product_id)} className="text-red-500 hover:text-red-400 text-sm font-semibold mt-1">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-600 rounded">
                      <button onClick={() => handleUpdateQty(item.product_id, item.qty - 1)} className="px-3 py-1 text-lg">-</button>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleUpdateQty(item.product_id, parseInt(e.target.value, 10))}
                        className="w-12 text-center bg-transparent focus:outline-none"
                      />
                      <button onClick={() => handleUpdateQty(item.product_id, item.qty + 1)} className="px-3 py-1 text-lg">+</button>
                    </div>
                      <p className="font-bold w-24 text-right">{formatPrice((item.discounted_price || (item.mrp - (item.mrp * item.discount / 100))) * item.qty)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-4 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-800">Subtotal ({cartCount} items)</span>
                  <span className="font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Shipping</span>
                  <span className="font-semibold text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-gray-600 pt-4 mt-4">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors duration-300 text-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
