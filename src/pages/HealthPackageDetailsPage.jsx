import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { selectUser } from '../store/slices/userSlice';
import {
  fetchHealthPackageBySlug,
  createLabBooking,
  selectCurrentPackage,
  selectPackageLoading,
  selectCreatingBooking,
  selectLabTestsError,
  clearCurrentPackage,
  clearError
} from '../store/slices/labTestsSlice';
import Card from '../components/Card';
import Button from '../components/Button';
import Toast from '../components/Toast';
import SEO from '../components/SEO';
import { ArrowLeft, Clock, Shield, Hop as Home, Users, CircleCheck as CheckCircle, Circle as HelpCircle } from 'lucide-react';

export default function HealthPackageDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  // Redux state
  const packageData = useSelector(selectCurrentPackage);
  const loading = useSelector(selectPackageLoading);
  const creatingBooking = useSelector(selectCreatingBooking);
  const error = useSelector(selectLabTestsError);
  
  // Local state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
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

  const timeSlots = [
    { value: '06:00-08:00', label: '6:00 AM – 8:00 AM' },
    { value: '08:00-10:00', label: '8:00 AM – 10:00 AM' },
    { value: '10:00-12:00', label: '10:00 AM – 12:00 PM' },
    { value: '12:00-14:00', label: '12:00 PM – 2:00 PM' },
    { value: '14:00-16:00', label: '2:00 PM – 4:00 PM' },
    { value: '16:00-18:00', label: '4:00 PM – 6:00 PM' }
  ];

  useEffect(() => {
    if (slug) {
      dispatch(fetchHealthPackageBySlug(slug));
    }
    
    return () => {
      dispatch(clearCurrentPackage());
    };
  }, [slug, dispatch]);

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
      setToast({ message: 'Please login to book health packages', type: 'error' });
      navigate('/login');
      return;
    }

    try {
      const bookingData = {
        ...formData,
        patient_age: parseInt(formData.patient_age),
        package: packageData.id,
        amount: packageData.final_price
      };

      const response = await dispatch(createLabBooking(bookingData)).unwrap();
      
      setToast({ 
        message: `Booking confirmed! Booking ID: ${response.booking_id}`, 
        type: 'success' 
      });
      
      setShowBookingForm(false);
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

  const handleBookPackage = () => {
    if (!user) {
      setToast({ message: 'Please login to book health packages', type: 'error' });
      navigate('/login');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      amount: packageData.final_price
    }));
    setShowBookingForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
          <div className="w-16 h-16 border-4 border-black bg-[#FF6B6B] animate-spin mx-auto mb-4"></div>
          <p className="font-black uppercase tracking-widest text-sm">LOADING PACKAGE DETAILS...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">PACKAGE NOT FOUND</h1>
          <Button onClick={() => navigate('/lab')} variant="primary">
            BACK TO LAB TESTS
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${packageData.name} - Health Package | GenXMed`}
        description={`Book ${packageData.name} health package online. ${packageData.total_tests} tests included. Price: ₹${packageData.final_price}.`}
        keywords={`${packageData.name}, health package, full body checkup, lab tests, diagnostic package`}
      />
      
      <Toast message={toast.message} type={toast.type} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#FFFDF5] min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/lab')}
            className="mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO LAB TESTS
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Details */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black uppercase mb-2">
                      {packageData.name}
                    </h1>
                    {packageData.tagline && (
                      <p className="text-lg font-bold text-gray-600 mb-4">
                        {packageData.tagline}
                      </p>
                    )}
                    {packageData.badge && (
                      <span className="neo-badge bg-neo-accent rotate-3 mb-4 inline-block">
                        {packageData.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#FF6B6B] mb-1">
                      ₹{parseFloat(packageData.final_price).toFixed(0)}
                    </div>
                    {packageData.discount_percent > 0 && (
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold line-through opacity-60">
                          ₹{parseFloat(packageData.price).toFixed(0)}
                        </p>
                        <span className="bg-[#FF6B6B] border-2 border-black font-black uppercase tracking-widest text-xs px-2 py-1 text-white">
                          {packageData.discount_percent}% OFF
                        </span>
                      </div>
                    )}
                    <p className="text-sm font-bold text-gray-600 mt-2">
                      {packageData.total_tests} Tests Included
                    </p>
                  </div>
                </div>

                {/* Package Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-[#FFD93D] border-4 border-black">
                    <Home className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs font-black uppercase">
                      {packageData.home_collection ? 'Free Collection' : 'Lab Visit'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-[#C4B5FD] border-4 border-black">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs font-black uppercase">
                      {packageData.report_delivery_hours}H Report
                    </p>
                  </div>
                  <div className="text-center p-4 bg-[#FF6B6B] border-4 border-black text-white">
                    <Shield className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs font-black uppercase">100% Safe</p>
                  </div>
                  <div className="text-center p-4 bg-white border-4 border-black">
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs font-black uppercase">Expert Team</p>
                  </div>
                </div>

                {/* Package Highlights */}
                {packageData.highlights && packageData.highlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-black uppercase mb-4">Package Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {packageData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border-4 border-black">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="font-bold text-sm">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tests Included */}
                {packageData.tests && packageData.tests.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-black uppercase mb-4">Tests Included</h3>
                    <div className="bg-white border-4 border-black overflow-hidden">
                      <div className="bg-[#FFD93D] border-b-4 border-black p-3">
                        <h4 className="font-black uppercase text-sm">
                          {packageData.tests.length} Tests in this Package
                        </h4>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="divide-y-2 divide-gray-200">
                          {packageData.tests.map((test, index) => (
                            <div key={index} className="p-3 hover:bg-gray-50">
                              <div className="flex justify-between items-center">
                                <span className="font-bold">{test.name}</span>
                                {test.price && (
                                  <span className="text-sm font-bold text-gray-600">
                                    ₹{parseFloat(test.price).toFixed(0)}
                                  </span>
                                )}
                              </div>
                              {test.short_name && (
                                <p className="text-xs font-bold text-gray-500 mt-1">
                                  {test.short_name}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {packageData.faqs && packageData.faqs.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-black uppercase">Frequently Asked Questions</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFAQs(!showFAQs)}
                      >
                        {showFAQs ? 'HIDE' : 'SHOW'} FAQs
                      </Button>
                    </div>
                    
                    {showFAQs && (
                      <div className="space-y-4">
                        {packageData.faqs.map((faq, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-black text-sm mb-2">{faq.question}</h4>
                                <p className="font-bold text-sm text-gray-700">{faq.answer}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <h3 className="text-xl font-black uppercase mb-4">Book This Package</h3>
                
                <div className="mb-6">
                  <div className="text-2xl font-black text-[#FF6B6B] mb-2">
                    ₹{parseFloat(packageData.final_price).toFixed(0)}
                  </div>
                  {packageData.discount_percent > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-bold line-through opacity-60">
                        ₹{parseFloat(packageData.price).toFixed(0)}
                      </p>
                      <span className="bg-[#FF6B6B] border-2 border-black font-black uppercase tracking-widest text-xs px-2 py-1 text-white">
                        {packageData.discount_percent}% OFF
                      </span>
                    </div>
                  )}
                  <p className="text-sm font-bold text-gray-600">
                    {packageData.total_tests} tests included
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>🏠 Home Collection:</span>
                    <span className={packageData.home_collection ? 'text-green-600' : 'text-red-600'}>
                      {packageData.home_collection ? 'FREE' : 'NOT AVAILABLE'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>⏰ Report Delivery:</span>
                    <span>{packageData.report_delivery_hours} Hours</span>
                  </div>
                  {packageData.fasting_required && (
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span>🍽️ Fasting:</span>
                      <span className="text-orange-600">REQUIRED</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  className="w-full mb-4"
                  onClick={handleBookPackage}
                  disabled={!user}
                >
                  {!user ? 'LOGIN TO BOOK' : 'BOOK NOW'}
                </Button>

                <div className="text-center">
                  <p className="text-xs font-bold text-gray-600 uppercase">
                    100% Safe & Secure Payment
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Booking Form Modal - Same as LabTestDetailsPage */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-[#FFD93D] border-b-4 border-black p-4 sm:p-6 flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                  BOOK {packageData.name}
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="w-8 h-8 bg-[#FF6B6B] border-2 border-black font-black text-white hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="p-4 sm:p-6 space-y-4">
                {/* Form fields - same as LabTestDetailsPage */}
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

                <div className="bg-[#C4B5FD] border-4 border-black p-4">
                  <h4 className="font-black uppercase text-sm mb-2">PACKAGE DETAILS:</h4>
                  <p className="font-bold text-sm">{packageData.name}</p>
                  <p className="font-bold text-sm text-gray-600">{packageData.total_tests} Tests</p>
                  <p className="font-bold text-lg text-[#FF6B6B]">₹{packageData.final_price}</p>
                </div>

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