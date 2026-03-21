import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import {
  fetchCategories,
  fetchLabTests,
  fetchHealthPackages,
  createLabBooking,
  selectCategories,
  selectLabTests,
  selectHealthPackages,
  selectCategoriesLoading,
  selectTestsLoading,
  selectPackagesLoading,
  selectCreatingBooking,
  selectLabTestsError,
  clearError
} from '../store/slices/labTestsSlice';
import Card from '../components/Card';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { Star, Zap, Shield, Clock, ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail } from 'lucide-react';

export default function LabTestsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  // Redux state
  const categories = useSelector(selectCategories);
  const dailyOffers = useSelector(selectLabTests);
  const packages = useSelector(selectHealthPackages);
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const testsLoading = useSelector(selectTestsLoading);
  const packagesLoading = useSelector(selectPackagesLoading);
  const creatingBooking = useSelector(selectCreatingBooking);
  const error = useSelector(selectLabTestsError);
  
  // Local state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_age: '',
    patient_gender: 'male',
    phone: '',
    email: '',
    address_line: '',
    city: '',
    pincode: '',
    preferred_date: '',
    preferred_slot: '08:00-10:00',
    amount: ''
  });

  const bannerSlides = [
    {
      url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=200&fit=crop',
      link: '/lab-tests/full-body-checkup',
      alt: 'Full Body Checkup'
    },
    {
      url: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1200&h=200&fit=crop',
      link: '/lab-tests/packages',
      alt: 'Test Packages'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=200&fit=crop',
      link: '/lab-tests/circle-offer',
      alt: 'Circle Offers'
    }
  ];

  const timeSlots = [
    { value: '06:00-08:00', label: '6:00 AM – 8:00 AM' },
    { value: '08:00-10:00', label: '8:00 AM – 10:00 AM' },
    { value: '10:00-12:00', label: '10:00 AM – 12:00 PM' },
    { value: '12:00-14:00', label: '12:00 PM – 2:00 PM' },
    { value: '14:00-16:00', label: '2:00 PM – 4:00 PM' },
    { value: '16:00-18:00', label: '4:00 PM – 6:00 PM' }
  ];

  useEffect(() => {
    // Fetch all data on component mount
    dispatch(fetchCategories());
    dispatch(fetchLabTests({ daily_offer: true }));
    dispatch(fetchHealthPackages());
    
    // Clear any previous errors
    dispatch(clearError());
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch, bannerSlides.length]);

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      setToast({ message: error.detail || error.message || 'An error occurred', type: 'error' });
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setToast({ message: 'Please login to book lab tests', type: 'error' });
      navigate('/login');
      return;
    }

    try {
      const bookingData = {
        ...formData,
        patient_age: parseInt(formData.patient_age),
        amount: selectedPackage ? selectedPackage.final_price : formData.amount
      };

      if (selectedPackage) {
        bookingData.package = selectedPackage.id;
      }

      const response = await dispatch(createLabBooking(bookingData)).unwrap();
      
      setToast({ 
        message: `Booking confirmed! Booking ID: ${response.booking_id}`, 
        type: 'success' 
      });
      
      setShowBookingForm(false);
      setSelectedPackage(null);
      setFormData({
        patient_name: '',
        patient_age: '',
        patient_gender: 'male',
        phone: '',
        email: '',
        address_line: '',
        city: '',
        pincode: '',
        preferred_date: '',
        preferred_slot: '08:00-10:00',
        amount: ''
      });
      
    } catch (error) {
      console.error('Booking failed:', error);
      setToast({ 
        message: error.detail || error.message || 'Booking failed. Please try again.', 
        type: 'error' 
      });
    }
  };

  const handlePackageBooking = (pkg) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      amount: pkg.final_price
    }));
    setShowBookingForm(true);
  };

  const loading = categoriesLoading || testsLoading || packagesLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
          <div className="w-16 h-16 border-4 border-black bg-[#FF6B6B] animate-spin mx-auto mb-4"></div>
          <p className="font-black uppercase tracking-widest text-sm">LOADING LAB TESTS...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast message={toast.message} type={toast.type} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#FFFDF5] min-h-screen relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        ></div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-10 left-4 sm:top-20 sm:left-10 rotate-12">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-[#FF6B6B] text-[#FF6B6B] animate-spin-slow" />
        </div>
        <div className="absolute top-32 right-4 sm:top-40 sm:right-20 -rotate-12">
          <Zap className="w-8 h-8 sm:w-12 sm:h-12 fill-[#FFD93D] text-[#FFD93D] animate-bounce" />
        </div>
        <div className="absolute bottom-32 left-8 sm:bottom-32 sm:left-32 rotate-45">
          <Shield className="w-6 h-6 sm:w-10 sm:h-10 fill-[#C4B5FD] text-[#C4B5FD]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-4 sm:mb-6"
            >
              <span className="block -rotate-1">DR DAS</span>
              <span className="block rotate-1" style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>
                PATHLABS
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg font-bold max-w-3xl mx-auto uppercase tracking-wide"
            >
              TESTS YOU CAN TRUST — ADVANCED DIAGNOSTICS AT YOUR DOORSTEP
            </motion.p>
          </div>

          {/* Banner Carousel */}
          <div className="relative w-full h-32 sm:h-48 md:h-64 mb-8 sm:mb-12 border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
            {bannerSlides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
                style={{ display: currentSlide === index ? 'block' : 'none' }}
              >
                <Link to={slide.link}>
                  <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
                </Link>
              </motion.div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 border-2 border-black transition-all ${
                    currentSlide === index 
                      ? 'bg-[#FFD93D] w-6' 
                      : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Doctor Created Health Checks */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="bg-[#C4B5FD] border-b-4 border-black p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight -rotate-1">
                    DOCTOR CREATED HEALTH CHECKS ({categories.filter(c => c.category_type === 'doctor_created').length})
                  </h2>
                  <Link to="/lab-tests/all">
                    <Button variant="ghost" size="sm" className="rotate-1">
                      VIEW ALL →
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {categories
                    .filter(category => category.category_type === 'doctor_created')
                    .map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={`/lab-tests/category/${category.slug}`}
                        className="block group"
                      >
                        <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 p-4 text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 mx-auto border-4 border-black bg-[#FFD93D] flex items-center justify-center">
                            {category.icon_url ? (
                              <img src={category.icon_url} alt={category.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg sm:text-xl font-black">🔬</span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-black uppercase tracking-wide leading-tight">
                            {category.name}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Offers */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-[#FFD93D] border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="bg-black border-b-4 border-black p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white rotate-1">
                  🔥 DAILY OFFERS - LIMITED TIME!
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {dailyOffers.map((offer, index) => (
                    <motion.div
                      key={offer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 p-4 text-center relative">
                        {offer.discount_percent > 0 && (
                          <span className="absolute -top-2 -right-2 bg-[#FF6B6B] border-2 border-black font-black uppercase tracking-widest text-xs px-2 py-1 shadow-[2px_2px_0px_0px_#000] rotate-12 z-10">
                            {offer.discount_percent}% OFF
                          </span>
                        )}
                        <h3 className="font-black text-sm sm:text-base mb-2 uppercase tracking-wide leading-tight">
                          {offer.short_name || offer.name}
                        </h3>
                        <div className="mb-3">
                          <p className="text-lg sm:text-xl font-black text-[#FF6B6B]">
                            ₹{parseFloat(offer.final_price).toFixed(0)}
                          </p>
                          {offer.discount_percent > 0 && (
                            <p className="text-xs font-bold line-through opacity-60">
                              ₹{parseFloat(offer.price).toFixed(0)}
                            </p>
                          )}
                        </div>
                        <Button variant="primary" size="sm" className="w-full text-xs">
                          BOOK NOW
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vital Organs */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="bg-[#FF6B6B] border-b-4 border-black p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white -rotate-1">
                    VITAL ORGANS ({categories.filter(c => c.category_type === 'vital_organ').length})
                  </h2>
                  <Link to="/lab-tests/vital-organs">
                    <Button variant="ghost" size="sm" className="rotate-1 border-white text-white hover:bg-white hover:text-black">
                      VIEW ALL →
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {categories
                    .filter(category => category.category_type === 'vital_organ')
                    .map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={`/lab-tests/category/${category.slug}`}
                        className="block group"
                      >
                        <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 p-4 text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 mx-auto border-4 border-black bg-[#C4B5FD] flex items-center justify-center">
                            {category.icon_url ? (
                              <img src={category.icon_url} alt={category.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg sm:text-xl font-black">❤️</span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-black uppercase tracking-wide leading-tight">
                            {category.name}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Health Packages */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 rotate-1">
                HEALTH CHECKUP PACKAGES
              </h2>
              <p className="text-sm sm:text-base font-bold uppercase tracking-wide">
                COMPREHENSIVE HEALTH SCREENING AT UNBEATABLE PRICES
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-all duration-200 overflow-hidden relative">
                    {pkg.badge && (
                      <span className="absolute -top-2 -right-2 bg-[#FF6B6B] border-2 border-black font-black uppercase tracking-widest text-xs px-2 py-1 shadow-[2px_2px_0px_0px_#000] rotate-12 z-10">
                        {pkg.badge}
                      </span>
                    )}
                    
                    <div className="bg-[#FFD93D] border-b-4 border-black p-4">
                      <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold mt-1">
                        {pkg.tagline}
                      </p>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <div className="text-center mb-4">
                        <div className="text-2xl sm:text-3xl font-black text-[#FF6B6B] mb-1">
                          ₹{parseFloat(pkg.final_price).toFixed(0)}
                        </div>
                        {pkg.discount_percent > 0 && (
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-sm font-bold line-through opacity-60">
                              ₹{parseFloat(pkg.price).toFixed(0)}
                            </p>
                            <span className="bg-[#FF6B6B] border-2 border-black font-black uppercase tracking-widest text-xs px-2 py-1 text-white">
                              {pkg.discount_percent}% OFF
                            </span>
                          </div>
                        )}
                        <p className="text-xs font-bold mt-2 uppercase tracking-wide">
                          {pkg.total_tests} TESTS INCLUDED
                        </p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>🏠 HOME COLLECTION:</span>
                          <span className={pkg.home_collection ? 'text-green-600' : 'text-red-600'}>
                            {pkg.home_collection ? 'YES' : 'NO'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>⏰ REPORT DELIVERY:</span>
                          <span>{pkg.report_delivery_hours}H</span>
                        </div>
                        {pkg.fasting_required && (
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>🍽️ FASTING:</span>
                            <span className="text-orange-600">REQUIRED</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => handlePackageBooking(pkg)}
                        >
                          BOOK NOW
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => navigate(`/lab/package/${pkg.slug}`)}
                        >
                          DETAILS
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How to Book Section */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-black border-4 border-black shadow-[8px_8px_0px_0px_#000] text-white p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-6 sm:mb-8 uppercase rotate-1">
                HOW TO BOOK A LAB TEST IN 3 SIMPLE STEPS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD93D] border-4 border-white mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-black text-black">1</span>
                  </div>
                  <h3 className="font-black mb-2 uppercase text-sm sm:text-base">CHOOSE TEST</h3>
                  <p className="text-xs sm:text-sm font-bold opacity-90 uppercase">
                    SELECT FROM OUR WIDE RANGE OF TESTS
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF6B6B] border-4 border-white mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-black text-white">2</span>
                  </div>
                  <h3 className="font-black mb-2 uppercase text-sm sm:text-base">BOOK SLOT</h3>
                  <p className="text-xs sm:text-sm font-bold opacity-90 uppercase">
                    PICK YOUR CONVENIENT TIME
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#C4B5FD] border-4 border-white mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-black text-black">3</span>
                  </div>
                  <h3 className="font-black mb-2 uppercase text-sm sm:text-base">GET RESULTS</h3>
                  <p className="text-xs sm:text-sm font-bold opacity-90 uppercase">
                    RECEIVE REPORTS ONLINE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-[#FFD93D] border-b-4 border-black p-4 sm:p-6 flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                  BOOK {selectedPackage ? selectedPackage.name : 'LAB TEST'}
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="w-8 h-8 bg-[#FF6B6B] border-2 border-black font-black text-white hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      PATIENT NAME *
                    </label>
                    <input
                      type="text"
                      name="patient_name"
                      required
                      value={formData.patient_name}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                      placeholder="ENTER PATIENT NAME"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      AGE *
                    </label>
                    <input
                      type="number"
                      name="patient_age"
                      required
                      min="1"
                      max="120"
                      value={formData.patient_age}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                      placeholder="AGE"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">
                    GENDER *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`border-4 border-black p-3 cursor-pointer font-bold text-center transition-all ${
                      formData.patient_gender === 'male' ? 'bg-[#FFD93D]' : 'bg-white hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        name="patient_gender"
                        value="male"
                        checked={formData.patient_gender === 'male'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      MALE
                    </label>
                    <label className={`border-4 border-black p-3 cursor-pointer font-bold text-center transition-all ${
                      formData.patient_gender === 'female' ? 'bg-[#FFD93D]' : 'bg-white hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        name="patient_gender"
                        value="female"
                        checked={formData.patient_gender === 'female'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      FEMALE
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      PHONE *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                      placeholder="PHONE NUMBER"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                      placeholder="EMAIL ADDRESS"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">
                    ADDRESS *
                  </label>
                  <input
                    type="text"
                    name="address_line"
                    required
                    value={formData.address_line}
                    onChange={handleInputChange}
                    className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                    placeholder="FULL ADDRESS"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      CITY *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                      placeholder="CITY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      PINCODE *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      pattern="[0-9]{6}"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 placeholder:text-black/40 placeholder:font-bold focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                      placeholder="PINCODE"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      PREFERRED DATE *
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferred_date}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      TIME SLOT *
                    </label>
                    <select
                      name="preferred_slot"
                      required
                      value={formData.preferred_slot}
                      onChange={handleInputChange}
                      className="w-full border-4 border-black bg-white font-bold text-sm sm:text-base h-12 px-4 focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-0 transition-all duration-100"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedPackage && (
                  <div className="bg-[#C4B5FD] border-4 border-black p-4">
                    <h4 className="font-black uppercase text-sm mb-2">PACKAGE DETAILS:</h4>
                    <p className="font-bold text-sm">{selectedPackage.name}</p>
                    <p className="font-bold text-lg text-[#FF6B6B]">₹{selectedPackage.final_price}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setShowBookingForm(false)}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={creatingBooking}
                  >
                    {creatingBooking ? 'BOOKING...' : 'CONFIRM BOOKING'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
}