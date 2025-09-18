import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';
import Toast from '../components/Toast';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [related, setRelated] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    // Fetch product details
    api.get(`/products/${slug}/`).then(res => {
      const productData = {
        product_id: res.data.product_id,
        slug: res.data.slug,
        name: res.data.name,
        company: res.data.company,
        disease_category: res.data.disease_category,
        mrp: parseFloat(res.data.mrp),
        discount: res.data.discount,
        discounted_price: parseFloat(res.data.discounted_price),
        images: res.data.images?.map(img => img.stream_url) || ['/images/placeholder.jpg'],
        trending: res.data.trending,
        available_stock: res.data.available_stock || 0,
        description: res.data.description || `${res.data.name} from ${res.data.company}. Effective treatment for ${res.data.disease_category}.`,
        returnable: res.data.returnable,
        expiry_date: res.data.expiry_date,
        directions_for_use: res.data.directions_for_use,
        seller_information: res.data.seller_information,
        manufactured_by: res.data.manufactured_by,
        packed_by: res.data.packed_by,
        benefits: res.data.benefits || [],
        suitable_for: res.data.suitable_for || [],
        dosage: res.data.dosage || [],
        cautions: res.data.cautions || [],
        side_effects: res.data.side_effects || [],
        key_ingredients: res.data.key_ingredients || []
      };
      
      setProduct(productData);
      
      // Fetch related products
      return api.get(`/products/${slug}/related/`);
    }).then(relatedRes => {
      if (relatedRes && relatedRes.data) {
        const relatedData = Array.isArray(relatedRes.data) ? relatedRes.data : [relatedRes.data];
        const transformedRelated = relatedData.map(item => ({
          product_id: item.product_id,
          slug: item.slug,
          name: item.name,
          company: item.company,
          disease_category: item.disease_category,
          mrp: parseFloat(item.mrp),
          discount: item.discount,
          discounted_price: parseFloat(item.discounted_price),
          images: item.images?.map(img => img.stream_url) || ['/images/placeholder.jpg'],
          trending: item.trending,
          available_stock: item.available_stock || 0
        }));
        setRelated(transformedRelated);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load product data", err);
      if (err.response?.status === 404) {
        navigate('/'); // Product not found, redirect to home
      }
      setLoading(false);
    });
  }, [slug, navigate]);
  
  const handleAddToCart = async () => {
    if (product && product.available_stock > 0) {
      try {
        await addToCart(product, qty);
        setToast({ message: `${product.name} added to cart!`, type: 'success' });
      } catch (error) {
        setToast({ message: error.message || 'Failed to add to cart', type: 'error' });
      }
    } else {
      setToast({ message: 'Product is out of stock', type: 'error' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="w-3/4 h-12" />
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-1/4 h-10" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <p className="mt-4">The product you are looking for does not exist.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-teal-500 text-white font-bold py-2 px-4 rounded">Go Home</button>
      </div>
    );
  }
  
  const discountedPrice = product.discounted_price;

  return (
    <>
      <Toast message={toast.message} type={toast.type} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-96 object-cover rounded-lg shadow-2xl" 
              />
              {product.trending && (
                <span className="absolute top-4 left-4 bg-yellow-500 text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                  Trending
                </span>
              )}
              {product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-teal-500' : 'border-gray-600'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <span className="text-teal-400 font-semibold">{product.company}</span>
            <h1 className="text-4xl font-extrabold my-2">{product.name}</h1>
            <p className="text-gray-800 text-lg mb-4">{product.disease_category}</p>

            <div className="my-4">
              <span className="text-4xl font-bold text-teal-400">₹{discountedPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through ml-3">₹{product.mrp.toFixed(2)}</span>
                  <span className="text-lg text-green-400 font-semibold ml-3">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="leading-relaxed my-6">{product.description}</p>
            
            {/* Stock and Expiry Info */}
            <div className="bg-gray-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-800">Stock:</span>
                  <span className={`ml-2 font-semibold ${product.available_stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.available_stock > 0 ? `${product.available_stock} available` : 'Out of Stock'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-800">Returnable:</span>
                  <span className={`ml-2 font-semibold ${product.returnable ? 'text-green-400' : 'text-red-400'}`}>
                    {product.returnable ? 'Yes' : 'No'}
                  </span>
                </div>
                {product.expiry_date && (
                  <div className="col-span-2">
                    <span className="text-gray-800">Expiry Date:</span>
                    <span className="ml-2 font-semibold text-yellow-400">{formatDate(product.expiry_date)}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            {product.available_stock > 0 && (
              <div className="flex items-center space-x-4 my-6">
                <div className="flex items-center border border-gray-600 rounded">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 text-xl">-</button>
                  <input 
                    type="number" 
                    value={qty} 
                    onChange={(e) => setQty(Math.max(1, Math.min(product.available_stock, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center bg-transparent focus:outline-none text-xl font-bold" 
                  />
                  <button onClick={() => setQty(q => Math.min(product.available_stock, q + 1))} className="px-4 py-2 text-xl">+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 bg-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefits */}
            {product.benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-teal-400">Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Ingredients */}
            {product.key_ingredients.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-teal-400">Key Ingredients</h3>
                <ul className="space-y-2">
                  {product.key_ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">• {ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dosage */}
            {product.dosage.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-teal-400">Dosage</h3>
                <ul className="space-y-2">
                  {product.dosage.map((dose, index) => (
                    <li key={index} className="text-gray-700">• {dose}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Directions for Use */}
            {product.directions_for_use && (
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-xl font-bold mb-4 text-teal-400">Directions for Use</h3>
                <p className="text-gray-700 leading-relaxed">{product.directions_for_use}</p>
              </div>
            )}

            {/* Cautions */}
            {product.cautions.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Cautions</h3>
                <ul className="space-y-2">
                  {product.cautions.map((caution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠</span>
                      <span className="text-gray-700">{caution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Side Effects */}
            {product.side_effects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-400">Side Effects</h3>
                <ul className="space-y-2">
                  {product.side_effects.map((effect, index) => (
                    <li key={index} className="text-gray-700">• {effect}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Manufacturer Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-400">Manufacturer Info</h3>
              <div className="space-y-2 text-sm">
                {product.manufactured_by && (
                  <p><span className="text-gray-800">Manufactured by:</span> <span className="text-gray-700">{product.manufactured_by}</span></p>
                )}
                {product.packed_by && (
                  <p><span className="text-gray-800">Packed by:</span> <span className="text-gray-700">{product.packed_by}</span></p>
                )}
                {product.seller_information && (
                  <p><span className="text-gray-800">Seller:</span> <span className="text-gray-700">{product.seller_information}</span></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {related.map(p => (
                <div key={p.product_id} onClick={() => navigate(`/product/${p.slug}`)} className="cursor-pointer">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
