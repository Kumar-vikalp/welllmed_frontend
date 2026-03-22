import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductBySlug,
  fetchRelatedProducts,
  selectCurrentProduct,
  selectRelatedProducts,
  selectProductLoading,
  clearCurrentProduct
} from '../store/slices/productsSlice';
import { addToCart, fetchCart } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/userSlice';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';
import Toast from '../components/Toast';
import LazyImage from '../components/LazyImage';
import SEO from '../components/SEO';

export default function ProductDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectCurrentProduct);
  const relatedProducts = useSelector(selectRelatedProducts);
  const loading = useSelector(selectProductLoading);
  const user = useSelector(selectUser);
  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    // If no slug is provided, redirect to products page
    if (!slug) {
      navigate('/products');
      return;
    }

    window.scrollTo(0, 0);

    // Clear previous product data
    dispatch(clearCurrentProduct());

    // Fetch product and related products
    dispatch(fetchProductBySlug(slug)).then((result) => {
      if (result.type === 'products/fetchProductBySlug/rejected') {
        navigate('/products');
      } else {
        dispatch(fetchRelatedProducts(slug));
      }
    });
  }, [slug, dispatch, navigate]);

  const handleAddToCart = async () => {
    if (!user) {
      setToast({ message: 'PLEASE LOGIN TO ADD ITEMS TO CART', type: 'error' });
      return;
    }

    if (product && product.available_stock > 0) {
      try {
        await dispatch(addToCart({
          product_id: product.product_id,
          quantity: qty
        })).unwrap();

        // Refresh cart to get updated data
        await dispatch(fetchCart());

        setToast({ message: `${product.name.toUpperCase()} ADDED TO CART!`, type: 'success' });
      } catch (error) {
        setToast({ message: error.message?.toUpperCase() || 'FAILED TO ADD TO CART', type: 'error' });
      }
    } else {
      setToast({ message: 'PRODUCT IS OUT OF STOCK', type: 'error' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] h-96"></div>
            <div className="space-y-4">
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] h-12"></div>
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] h-8"></div>
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] h-24"></div>
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] h-10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-8 sm:p-12 -rotate-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">PRODUCT NOT FOUND</h1>
            <p className="font-bold uppercase tracking-wide mb-6">THE PRODUCT YOU ARE LOOKING FOR DOES NOT EXIST</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                text-xs sm:text-sm px-6 py-4 h-14 w-full sm:w-auto
                shadow-[6px_6px_0px_0px_#000]
                hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                transition-all duration-100"
            >
              GO HOME
            </button>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discounted_price;

  const tabs = [
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'ingredients', label: 'INGREDIENTS' },
    { id: 'dosage', label: 'DOSAGE' },
    { id: 'cautions', label: 'CAUTIONS' }
  ];

  return (
    <>
      <SEO
        title={product ? `${product.name} - Buy Online at Best Price | WellMed` : 'Product Details | WellMed'}
        description={product ? `Buy ${product.name} by ${product.company} online at best price. ${product.description}. Free delivery, authentic medicines.` : 'Buy medicines online at best prices with free delivery'}
        keywords={product ? `${product.name}, ${product.company}, ${product.disease_category}, buy medicine online, pharmacy` : 'medicine, pharmacy, online medicine'}
        type="product"
        link={`https://wellmed.com/product/${slug}`}
      />
      <Toast message={toast.message} type={toast.type} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#FFFDF5]"
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Product Images */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="relative">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
                  <LazyImage
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  {product.trending && (
                    <span className="absolute -top-3 -left-3 bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest text-xs px-3 py-1 shadow-[4px_4px_0px_0px_#000] rotate-12 z-10">
                      <img src="/icons/svg/hot.svg" alt="Hot" className="w-8 h-8 md:w-12 md:h-12" />
                      TRENDING
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="absolute -top-3 -right-3 bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest text-xs px-3 py-1 shadow-[4px_4px_0px_0px_#000] -rotate-12 z-10">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden ${activeImageIndex === index ? 'bg-[#FFD93D]' : 'bg-white hover:bg-[#C4B5FD]'
                        } transition-colors duration-100`}
                    >
                      <LazyImage src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.2, ease: "easeOut" }}
            >
              <div className="bg-[#C4B5FD] border-2 border-black px-3 py-1 inline-block mb-4">
                <span className="font-black uppercase tracking-widest text-xs">{product.company}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="bg-[#FFD93D] border-2 border-black px-3 py-1 inline-block mb-6">
                <p className="font-bold uppercase tracking-wide text-sm">{product.disease_category}</p>
              </div>

              {/* Price Section */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black">₹{discountedPrice.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-lg sm:text-xl line-through opacity-60 font-bold">₹{product.mrp.toFixed(2)}</span>
                      <span className="bg-[#FF6B6B] border-2 border-black font-black uppercase tracking-widest text-xs px-2 py-1">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="font-bold uppercase tracking-wide text-sm">INCLUSIVE OF ALL TAXES</p>
              </div>

              {/* Stock and Info */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 sm:p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border-2 border-black ${product.available_stock > 0 ? 'bg-[#FFD93D]' : 'bg-[#FF6B6B]'}`}></div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs">STOCK STATUS</p>
                      <p className="font-bold text-sm">
                        {product.available_stock > 0 ? `${product.available_stock} AVAILABLE` : 'OUT OF STOCK'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border-2 border-black ${product.returnable ? 'bg-[#FFD93D]' : 'bg-[#FF6B6B]'}`}></div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs">RETURN POLICY</p>
                      <p className="font-bold text-sm">
                        {product.returnable ? 'RETURNABLE' : 'NON-RETURNABLE'}
                      </p>
                    </div>
                  </div>
                  {product.expiry_date && (
                    <div className="sm:col-span-2 flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-black bg-[#C4B5FD]"></div>
                      <div>
                        <p className="font-black uppercase tracking-widest text-xs">EXPIRY DATE</p>
                        <p className="font-bold text-sm">{formatDate(product.expiry_date)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              {product.available_stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-4 border-black bg-white">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-12 h-12 font-black text-xl border-r-4 border-black hover:bg-[#FFD93D] transition-colors duration-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, Math.min(product.available_stock, parseInt(e.target.value) || 1)))}
                        className="w-16 h-12 text-center bg-transparent focus:outline-none font-black text-xl border-r-4 border-black"
                      />
                      <button
                        onClick={() => setQty(q => Math.min(product.available_stock, q + 1))}
                        className="w-12 h-12 font-black text-xl hover:bg-[#FFD93D] transition-colors duration-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="bg-[#C4B5FD] border-2 border-black px-3 py-1">
                      <span className="font-black uppercase tracking-widest text-xs">
                        MAX: {product.available_stock}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                    text-sm py-4 h-14 shadow-[6px_6px_0px_0px_#000]
                    hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                    active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                    transition-all duration-100"
                  >
                    ADD TO CART
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <div className="max-w-7xl mx-auto p-4 sm:p-8 mt-12">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              {/* Tab Navigation */}
              <div className="bg-[#FFD93D] border-b-4 border-black">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs sm:text-sm border-r-4 border-black last:border-r-0 transition-colors duration-100 ${activeTab === tab.id
                          ? 'bg-black text-white'
                          : 'hover:bg-[#FF6B6B] hover:text-white'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-8">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 border-b-4 border-black pb-2">
                      PRODUCT DESCRIPTION
                    </h3>
                    <p className="font-bold leading-relaxed mb-6">{product.description}</p>

                    {product.benefits.length > 0 && (
                      <div className="bg-[#C4B5FD] border-4 border-black p-4 sm:p-6 mb-6">
                        <h4 className="font-black uppercase tracking-widest text-sm mb-4 border-b-2 border-black pb-2">
                          KEY BENEFITS
                        </h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-black mt-2 flex-shrink-0"></div>
                              <span className="font-bold text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 border-b-4 border-black pb-2">
                      KEY INGREDIENTS
                    </h3>
                    {product.key_ingredients.length > 0 ? (
                      <div className="space-y-3">
                        {product.key_ingredients.map((ingredient, index) => (
                          <div key={index} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                            <p className="font-bold">{ingredient}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#FFD93D] border-4 border-black p-6 text-center">
                        <p className="font-bold uppercase tracking-wide">INGREDIENT INFORMATION NOT AVAILABLE</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'dosage' && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 border-b-4 border-black pb-2">
                      DOSAGE & DIRECTIONS
                    </h3>
                    {product.dosage.length > 0 ? (
                      <div className="space-y-3 mb-6">
                        {product.dosage.map((dose, index) => (
                          <div key={index} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                            <p className="font-bold">{dose}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {product.directions_for_use && (
                      <div className="bg-[#C4B5FD] border-4 border-black p-4 sm:p-6">
                        <h4 className="font-black uppercase tracking-widest text-sm mb-4 border-b-2 border-black pb-2">
                          DIRECTIONS FOR USE
                        </h4>
                        <p className="font-bold leading-relaxed">{product.directions_for_use}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'cautions' && (
                  <div className="space-y-6">
                    {product.cautions.length > 0 && (
                      <div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 border-b-4 border-black pb-2">
                          CAUTIONS & WARNINGS
                        </h3>
                        <div className="bg-[#FFD93D] border-4 border-black p-4 sm:p-6 mb-6">
                          <ul className="space-y-3">
                            {product.cautions.map((caution, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-black mt-2 flex-shrink-0"></div>
                                <span className="font-bold text-sm">{caution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {product.side_effects.length > 0 && (
                      <div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 border-b-4 border-black pb-2">
                          POSSIBLE SIDE EFFECTS
                        </h3>
                        <div className="bg-[#FF6B6B] border-4 border-black p-4 sm:p-6">
                          <ul className="space-y-3">
                            {product.side_effects.map((effect, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                                <span className="font-bold text-sm text-white">{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Manufacturer Info */}
            {(product.manufactured_by || product.packed_by || product.seller_information) && (
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] mt-8 overflow-hidden">
                <div className="bg-black border-b-4 border-black p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                    MANUFACTURER INFORMATION
                  </h3>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {product.manufactured_by && (
                      <div className="bg-[#C4B5FD] border-4 border-black p-4">
                        <p className="font-black uppercase tracking-widest text-xs mb-2">MANUFACTURED BY</p>
                        <p className="font-bold text-sm">{product.manufactured_by}</p>
                      </div>
                    )}
                    {product.packed_by && (
                      <div className="bg-[#FFD93D] border-4 border-black p-4">
                        <p className="font-black uppercase tracking-widest text-xs mb-2">PACKED BY</p>
                        <p className="font-bold text-sm">{product.packed_by}</p>
                      </div>
                    )}
                    {product.seller_information && (
                      <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                        <p className="font-black uppercase tracking-widest text-xs mb-2">SELLER</p>
                        <p className="font-bold text-sm">{product.seller_information}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="max-w-7xl mx-auto p-4 sm:p-8 mt-12">
              <div className="bg-[#FFD93D] border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
                <div className="bg-black border-b-4 border-black p-4 sm:p-6">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white -rotate-1">
                    RELATED PRODUCTS
                  </h2>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {relatedProducts.map(p => (
                      <div key={p.product_id} className="flex-shrink-0 w-64">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}