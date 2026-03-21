import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  fetchMyBookings,
  cancelBooking,
  selectBookings,
  selectBookingsLoading,
  selectCancellingBooking,
  selectLabTestsError,
  clearError
} from '../store/slices/labTestsSlice';
import Card from '../components/Card';
import Button from '../components/Button';
import Toast from '../components/Toast';
import SEO from '../components/SEO';
import { Calendar, Clock, MapPin, Phone, Mail, Package, TestTube, X } from 'lucide-react';

export default function MyLabBookingsPage() {
  const dispatch = useDispatch();
  
  // Redux state
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingsLoading);
  const cancellingBooking = useSelector(selectCancellingBooking);
  const error = useSelector(selectLabTestsError);
  
  // Local state
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyBookings());
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToast({ message: error.detail || error.message || 'An error occurred', type: 'error' });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      setToast({ message: 'Booking cancelled successfully', type: 'success' });
    } catch (error) {
      setToast({ 
        message: error.detail || error.message || 'Failed to cancel booking', 
        type: 'error' 
      });
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'sample_collected':
        return 'bg-purple-500';
      case 'processing':
        return 'bg-orange-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const canCancelBooking = (status) => {
    const nonCancellableStatuses = ['sample_collected', 'processing', 'completed', 'cancelled'];
    return !nonCancellableStatuses.includes(status?.toLowerCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
          <div className="w-16 h-16 border-4 border-black bg-[#FF6B6B] animate-spin mx-auto mb-4"></div>
          <p className="font-black uppercase tracking-widest text-sm">LOADING YOUR BOOKINGS...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="My Lab Bookings | GenXMed"
        description="View and manage your lab test bookings. Track booking status, view reports, and cancel bookings."
        keywords="lab bookings, test bookings, booking history, lab reports"
      />
      
      <Toast message={toast.message} type={toast.type} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#FFFDF5] min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
              MY LAB BOOKINGS
            </h1>
            <p className="text-lg font-bold text-gray-600">
              Track your lab test bookings and view reports
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <Card className="p-8 max-w-md mx-auto">
                <TestTube className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-black uppercase mb-4">No Bookings Found</h2>
                <p className="font-bold text-gray-600 mb-6">
                  You haven't booked any lab tests yet.
                </p>
                <Link to="/lab">
                  <Button variant="primary">
                    BOOK LAB TESTS
                  </Button>
                </Link>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.booking_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 relative">
                    {/* Status Badge */}
                    <div className="absolute -top-2 -right-2">
                      <span className={`${getStatusColor(booking.status)} border-2 border-black font-black uppercase tracking-widest text-xs px-3 py-1 text-white shadow-[2px_2px_0px_0px_#000] rotate-12`}>
                        {booking.status?.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Booking Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-black uppercase mb-2">
                        Booking ID: {booking.booking_id}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Booked on: {new Date(booking.created_at || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Package/Tests Info */}
                    <div className="mb-4">
                      {booking.package ? (
                        <div className="flex items-start gap-3 p-3 bg-[#FFD93D] border-4 border-black">
                          <Package className="w-5 h-5 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-black text-sm">{booking.package.name}</h4>
                            <p className="text-xs font-bold text-gray-700">
                              {booking.package.total_tests} tests included
                            </p>
                          </div>
                        </div>
                      ) : booking.tests && booking.tests.length > 0 ? (
                        <div className="space-y-2">
                          {booking.tests.map((test, testIndex) => (
                            <div key={testIndex} className="flex items-start gap-3 p-3 bg-[#C4B5FD] border-4 border-black">
                              <TestTube className="w-5 h-5 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-black text-sm">{test.name}</h4>
                                {test.short_name && (
                                  <p className="text-xs font-bold text-gray-700">{test.short_name}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Patient Info */}
                    <div className="mb-4 p-3 bg-white border-4 border-black">
                      <h4 className="font-black text-sm mb-2 uppercase">Patient Details</h4>
                      <div className="space-y-1 text-sm font-bold">
                        <p>Name: {booking.patient_name}</p>
                        <p>Age: {booking.patient_age} years</p>
                        <p>Gender: {booking.patient_gender}</p>
                      </div>
                    </div>

                    {/* Contact & Address */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Phone className="w-4 h-4" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Mail className="w-4 h-4" />
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm font-bold">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                        <span>{booking.address_line}, {booking.city} - {booking.pincode}</span>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="mb-4 p-3 bg-[#FF6B6B] border-4 border-black text-white">
                      <h4 className="font-black text-sm mb-2 uppercase">Appointment</h4>
                      <div className="flex items-center gap-4 text-sm font-bold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.preferred_date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.preferred_slot}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="mb-4 text-center">
                      <div className="text-2xl font-black text-[#FF6B6B]">
                        ₹{parseFloat(booking.amount).toFixed(0)}
                      </div>
                      <p className="text-sm font-bold text-gray-600">Total Amount</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {booking.status?.toLowerCase() === 'completed' && (
                        <Button variant="secondary" size="sm" className="flex-1">
                          VIEW REPORT
                        </Button>
                      )}
                      
                      {canCancelBooking(booking.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCancelBooking(booking.booking_id)}
                          disabled={cancellingId === booking.booking_id}
                        >
                          {cancellingId === booking.booking_id ? (
                            'CANCELLING...'
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              CANCEL
                            </>
                          )}
                        </Button>
                      )}
                      
                      <Link to={`/lab/booking/${booking.booking_id}`}>
                        <Button variant="ghost" size="sm">
                          VIEW DETAILS
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}