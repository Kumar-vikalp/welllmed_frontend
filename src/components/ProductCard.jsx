import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const discountedPrice = product.discounted_price;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col border border-gray-100"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative">
          <img src={product.images[0]} alt={product.name} className="w-full h-32 md:h-48 object-cover" />
          {product.trending && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Trending
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="p-3 md:p-4 flex-grow flex flex-col">
          <p className="text-xs md:text-sm text-gray-500">{product.company}</p>
          <h3 className="text-sm md:text-lg font-semibold text-gray-900 mt-1 flex-grow line-clamp-2">{product.name}</h3>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-lg md:text-xl font-bold text-gray-900">₹{discountedPrice.toFixed(2)}</p>
              {product.discount > 0 && (
                <p className="text-xs md:text-sm text-gray-500 line-through">₹{product.mrp.toFixed(2)}</p>
              )}
            </div>
            <p className={`text-xs md:text-sm font-medium ${product.available_stock > 0 ? 'text-primary-600' : 'text-red-500'}`}>
              {product.available_stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
