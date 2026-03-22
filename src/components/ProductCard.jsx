import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart, selectCartSyncing } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/userSlice';
import { useState, memo } from 'react';
import LazyImage from './LazyImage';
import Card from './Card';
import Button from './Button';

const ProductCard = memo(function ProductCard({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const syncing = useSelector(selectCartSyncing);
  const [isAdding, setIsAdding] = useState(false);
  const discountedPrice = product.discounted_price;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    if (product.available_stock <= 0) return;

    setIsAdding(true);
    try {
      // Add to cart via API
      await dispatch(addToCart({
        product_id: product.product_id,
        quantity: 1
      })).unwrap();

      // Refresh cart to get updated data
      await dispatch(fetchCart());

    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card
      layout
      className="overflow-hidden flex flex-col"
      rotation={Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0}
    >
      <Link to={`/product/${product.slug}`} className="block flex-grow" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            className="w-full h-32 md:h-48 object-cover border-b-4 border-neo-ink transition-transform duration-200 hover:scale-105"
          />
          {product.trending && (
            <span className="absolute -top-2 -left-2 neo-badge bg-neo-accent rotate-12 z-10">
              <img src="/icons/svg/hot.svg" alt="Hot" className="w-8 h-8 md:w-12 md:h-12" />
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute -top-2 -right-2 neo-badge bg-neo-secondary -rotate-12 z-10">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="p-3 md:p-4 flex-grow">
          <p className="text-xs md:text-sm font-bold uppercase tracking-wide">{product.company}</p>
          <h3 className="text-sm md:text-base font-black mt-1 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-lg md:text-xl font-black">₹{discountedPrice.toFixed(2)}</p>
              {product.discount > 0 && (
                <p className="text-xs md:text-sm font-bold line-through opacity-60">₹{product.mrp.toFixed(2)}</p>
              )}
            </div>
            <span className={`neo-badge rotate-3 ${product.available_stock > 0
                ? 'bg-neo-secondary'
                : 'bg-neo-accent'
              }`}>
              {product.available_stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-3 md:p-4 pt-0">
        <Button
          variant={product.available_stock > 0 && user ? 'primary' : 'outline'}
          size="sm"
          className="w-full rotate-1"
          onClick={handleAddToCart}
          disabled={product.available_stock <= 0 || isAdding || syncing || !user}
        >
          {isAdding || syncing ? (
            'ADDING...'
          ) : !user ? (
            'LOGIN TO ADD'
          ) : product.available_stock > 0 ? (
            'ADD TO CART'
          ) : (
            'OUT OF STOCK'
          )}
        </Button>
      </div>
    </Card>
  );
});

export default ProductCard;