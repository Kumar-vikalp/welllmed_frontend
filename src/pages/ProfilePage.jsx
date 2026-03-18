import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAddresses } from '../contexts/AddressContext';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';
import { detectUserLocation } from '../utils/locationUtils';

export default function ProfilePage() {
  const { user, profile, updateProfile, fetchProfile, getActiveTime } = useUser();
  const { addresses, createAddress, updateAddress, deleteAddress } = useAddresses();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [formData, setFormData] = useState({});
  const [addressForm, setAddressForm] = useState({
    recievers_name: '',
    recievers_phone: '',
    address_type: 'Home',
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    is_default: false
  });
  const [loading, setLoading] = useState(true);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const tabs = [
    { id: 'profile', label: 'PROFILE', icon: '👤' },
    { id: 'addresses', label: 'ADDRESSES', icon: '📍' },
    { id: 'orders', label: 'ORDERS', icon: '📦' }
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      if (user) {
        try {
          if (!profile) {
            await fetchProfile();
          }
          const timeData = await getActiveTime();
          setActiveTime(timeData.active_time);
        } catch (error) {
          console.log('Profile or active time not available');
        }
      }
      setLoading(false);
    };
    
    loadProfileData();
  }, [user, profile, fetchProfile, getActiveTime]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        address: profile.address || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await updateProfile(formData);
      setToast({ message: 'PROFILE UPDATED SUCCESSFULLY!', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setToast({ message: 'FAILED TO UPDATE PROFILE. PLEASE TRY AGAIN.', type: 'error' });
    }
  };

  const handleDetectLocation = async () => {
    setDetectingLocation(true);
    try {
      const locationData = await detectUserLocation();
      setAddressForm(prev => ({
        ...prev,
        address_line: locationData.address_line,
        city: locationData.city,
        state: locationData.state,
        pincode: locationData.pincode
      }));
      setToast({ message: 'LOCATION DETECTED SUCCESSFULLY!', type: 'success' });
    } catch (error) {
      setToast({ message: 'FAILED TO DETECT LOCATION. PLEASE ENTER MANUALLY.', type: 'error' });
    } finally {
      setDetectingLocation(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await createAddress(addressForm);
      setToast({ message: 'ADDRESS ADDED SUCCESSFULLY!', type: 'success' });
      setIsAddingAddress(false);
      setAddressForm({
        recievers_name: '',
        recievers_phone: '',
        address_type: 'Home',
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        is_default: false
      });
    } catch (error) {
      setToast({ message: 'FAILED TO ADD ADDRESS. PLEASE TRY AGAIN.', type: 'error' });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS ADDRESS?')) {
      try {
        await deleteAddress(addressId);
        setToast({ message: 'ADDRESS DELETED SUCCESSFULLY!', type: 'success' });
      } catch (error) {
        setToast({ message: 'FAILED TO DELETE ADDRESS.', type: 'error' });
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-black bg-white mx-auto mb-4 animate-spin"></div>
            <p className="font-black uppercase tracking-widest text-sm">LOADING PROFILE...</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate profile image from user's name
  const profileImageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.name || user?.email || 'User'}`;
  
  return (
    <>
      <Toast message={toast.message} type={toast.type} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-4 -rotate-1">
              MY PROFILE
            </h1>
            <div className="bg-[#FFD93D] border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 rotate-1 inline-block">
              <p className="font-bold uppercase tracking-wide">MANAGE YOUR ACCOUNT SETTINGS</p>
            </div>
          </div>

          {/* Profile Header Card */}
          <div className="bg-black border-4 border-black shadow-[8px_8px_0px_0px_#000] mb-8 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-[4px_4px_0px_0px_#fff] overflow-hidden">
                    <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-[#FFD93D] border-4 border-white w-10 h-10 flex items-center justify-center shadow-[2px_2px_0px_0px_#fff]">
                    <svg className="w-5 h-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center sm:text-left text-white">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
                    {profile?.name || 'NOT SET'}
                  </h2>
                  <p className="font-bold text-lg mb-2">{user?.email}</p>
                  {activeTime && (
                    <div className="bg-[#C4B5FD] border-2 border-white px-3 py-1 inline-block">
                      <p className="font-black uppercase tracking-widest text-xs text-black">
                        ACTIVE TIME: {activeTime.hours}H {activeTime.minutes}M
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] mb-8 overflow-hidden">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 font-black uppercase tracking-widest text-sm border-r-4 border-black last:border-r-0 transition-colors duration-100 ${
                    activeTab === tab.id 
                      ? 'bg-black text-white' 
                      : 'hover:bg-[#FFD93D]'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="bg-[#C4B5FD] border-b-4 border-black p-4 sm:p-6">
                  <h3 className="font-black uppercase tracking-widest text-sm">PROFILE INFORMATION</h3>
                </div>
                
                <div className="p-6 sm:p-8">
                  {!isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-[#FFFDF5] border-4 border-black p-4">
                          <label className="font-black uppercase tracking-widest text-xs mb-2 block">FULL NAME</label>
                          <p className="font-bold text-lg">{profile?.name || 'NOT SET'}</p>
                        </div>
                        <div className="bg-[#FFFDF5] border-4 border-black p-4">
                          <label className="font-black uppercase tracking-widest text-xs mb-2 block">EMAIL</label>
                          <p className="font-bold text-lg">{user?.email}</p>
                        </div>
                        <div className="bg-[#FFFDF5] border-4 border-black p-4">
                          <label className="font-black uppercase tracking-widest text-xs mb-2 block">PHONE</label>
                          <p className="font-bold text-lg">{profile?.phone || 'NOT SET'}</p>
                        </div>
                        <div className="bg-[#FFFDF5] border-4 border-black p-4">
                          <label className="font-black uppercase tracking-widest text-xs mb-2 block">ADDRESS</label>
                          <p className="font-bold text-lg">{profile?.address || 'NOT SET'}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setIsEditing(true)} 
                        className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                          text-sm px-6 py-4 h-14 w-full sm:w-auto
                          shadow-[6px_6px_0px_0px_#000]
                          hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                          active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                          transition-all duration-100"
                      >
                        EDIT PROFILE
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block font-black uppercase tracking-widest text-xs mb-2">FULL NAME</label>
                          <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={formData.name || ''} 
                            onChange={handleInputChange} 
                            className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                              focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                              focus-visible:outline-none focus-visible:ring-0
                              transition-all duration-100" 
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block font-black uppercase tracking-widest text-xs mb-2">PHONE</label>
                          <input 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            value={formData.phone || ''} 
                            onChange={handleInputChange} 
                            className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                              focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                              focus-visible:outline-none focus-visible:ring-0
                              transition-all duration-100" 
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="address" className="block font-black uppercase tracking-widest text-xs mb-2">ADDRESS</label>
                        <input 
                          type="text" 
                          name="address" 
                          id="address" 
                          value={formData.address || ''} 
                          onChange={handleInputChange} 
                          className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                            focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                            focus-visible:outline-none focus-visible:ring-0
                            transition-all duration-100" 
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          type="submit" 
                          className="bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest 
                            text-sm px-6 py-4 h-14 w-full sm:w-auto
                            shadow-[6px_6px_0px_0px_#000]
                            hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                            active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                            transition-all duration-100"
                        >
                          SAVE CHANGES
                        </button>
                        <button 
                          type="button" 
                          onClick={() => { setIsEditing(false); setFormData({...profile}); }} 
                          className="bg-white border-4 border-black font-black uppercase tracking-widest 
                            text-sm px-6 py-4 h-14 w-full sm:w-auto
                            shadow-[6px_6px_0px_0px_#000]
                            hover:bg-[#C4B5FD] hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                            active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                            transition-all duration-100"
                        >
                          CANCEL
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="bg-[#FFD93D] border-b-4 border-black p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-black uppercase tracking-widest text-sm">MY ADDRESSES</h3>
                  <button 
                    onClick={() => setIsAddingAddress(true)}
                    className="bg-black border-4 border-black font-black uppercase tracking-widest 
                      text-xs px-4 py-3 h-12 w-full sm:w-auto text-white
                      shadow-[4px_4px_0px_0px_#000]
                      hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                      active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                      transition-all duration-100"
                  >
                    ADD NEW ADDRESS
                  </button>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Add Address Form */}
                  {isAddingAddress && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-[#C4B5FD] border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 mb-8 overflow-hidden"
                    >
                      <div className="bg-black border-b-4 border-black p-4 -m-6 mb-6">
                        <h4 className="font-black uppercase tracking-widest text-sm text-white">ADD NEW ADDRESS</h4>
                      </div>
                      
                      <form onSubmit={handleAddAddress} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-black uppercase tracking-widest text-xs mb-2">RECEIVER'S NAME *</label>
                            <input 
                              type="text" 
                              name="recievers_name" 
                              value={addressForm.recievers_name} 
                              onChange={handleAddressInputChange}
                              className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                                focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                                focus-visible:outline-none focus-visible:ring-0
                                transition-all duration-100"
                              required
                            />
                          </div>
                          <div>
                            <label className="block font-black uppercase tracking-widest text-xs mb-2">PHONE NUMBER *</label>
                            <input 
                              type="tel" 
                              name="recievers_phone" 
                              value={addressForm.recievers_phone} 
                              onChange={handleAddressInputChange}
                              className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                                focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                                focus-visible:outline-none focus-visible:ring-0
                                transition-all duration-100"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-black uppercase tracking-widest text-xs mb-2">ADDRESS TYPE</label>
                            <select 
                              name="address_type" 
                              value={addressForm.address_type} 
                              onChange={handleAddressInputChange}
                              className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                                focus-visible:bg-[#FFD93D] focus-visible:outline-none transition-colors duration-100"
                            >
                              <option value="Home">HOME</option>
                              <option value="Office">OFFICE</option>
                              <option value="Other">OTHER</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-black uppercase tracking-widest text-xs mb-2">CITY *</label>
                            <input 
                              type="text" 
                              name="city" 
                              value={addressForm.city} 
                              onChange={handleAddressInputChange}
                              className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                                focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                                focus-visible:outline-none focus-visible:ring-0
                                transition-all duration-100"
                              required
                            />
                          </div>
                          <div>
                            <label className="block font-black uppercase tracking-widest text-xs mb-2">PINCODE *</label>
                            <input 
                              type="text" 
                              name="pincode" 
                              value={addressForm.pincode} 
                              onChange={handleAddressInputChange}
                              className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                                focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                                focus-visible:outline-none focus-visible:ring-0
                                transition-all duration-100"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block font-black uppercase tracking-widest text-xs">ADDRESS LINE *</label>
                            <button
                              type="button"
                              onClick={handleDetectLocation}
                              disabled={detectingLocation}
                              className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                                text-xs px-4 py-2 h-10 disabled:opacity-50 disabled:cursor-not-allowed
                                shadow-[4px_4px_0px_0px_#000]
                                hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                                active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                                transition-all duration-100"
                            >
                              {detectingLocation ? 'DETECTING...' : 'DETECT LOCATION'}
                            </button>
                          </div>
                          <input 
                            type="text" 
                            name="address_line" 
                            value={addressForm.address_line} 
                            onChange={handleAddressInputChange}
                            className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                              focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                              focus-visible:outline-none focus-visible:ring-0
                              transition-all duration-100"
                            required
                          />
                        </div>

                        <div>
                          <input 
                            type="text" 
                            name="state" 
                            value={addressForm.state} 
                            onChange={handleAddressInputChange}
                            placeholder="STATE"
                            className="w-full border-4 border-black bg-white font-bold text-base h-12 px-4
                              placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                              focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                              focus-visible:outline-none focus-visible:ring-0
                              transition-all duration-100"
                            required
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              name="is_default" 
                              checked={addressForm.is_default} 
                              onChange={handleAddressInputChange}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 border-4 border-black ${
                              addressForm.is_default ? 'bg-[#FF6B6B]' : 'bg-white'
                            } transition-colors duration-100 cursor-pointer`}
                              onClick={() => setAddressForm(prev => ({ ...prev, is_default: !prev.is_default }))}
                            >
                              {addressForm.is_default && (
                                <svg className="w-4 h-4 text-white stroke-[3px] absolute inset-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <label className="font-bold uppercase tracking-wide text-sm cursor-pointer"
                            onClick={() => setAddressForm(prev => ({ ...prev, is_default: !prev.is_default }))}
                          >
                            SET AS DEFAULT ADDRESS
                          </label>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button 
                            type="submit" 
                            className="bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest 
                              text-sm px-6 py-4 h-14 w-full sm:w-auto
                              shadow-[6px_6px_0px_0px_#000]
                              hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                              active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                              transition-all duration-100"
                          >
                            SAVE ADDRESS
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setIsAddingAddress(false)}
                            className="bg-white border-4 border-black font-black uppercase tracking-widest 
                              text-sm px-6 py-4 h-14 w-full sm:w-auto
                              shadow-[6px_6px_0px_0px_#000]
                              hover:bg-[#C4B5FD] hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                              active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                              transition-all duration-100"
                          >
                            CANCEL
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Address List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(address => (
                      <div key={address.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden relative">
                        {address.is_default && (
                          <div className="absolute -top-3 -right-3 bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest text-xs px-3 py-1 shadow-[4px_4px_0px_0px_#000] rotate-12 z-10">
                            DEFAULT
                          </div>
                        )}
                        
                        <div className="bg-[#C4B5FD] border-b-4 border-black p-4">
                          <div className="flex items-center justify-between">
                            <span className="bg-black border-2 border-black text-white font-black uppercase tracking-widest text-xs px-3 py-1">
                              {address.address_type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h4 className="font-black text-lg uppercase tracking-tight mb-2">{address.recievers_name}</h4>
                          <p className="font-bold mb-1">{address.address_line}</p>
                          <p className="font-bold mb-1">{address.city}, {address.state} - {address.pincode}</p>
                          <div className="bg-[#FFFDF5] border-2 border-black px-3 py-1 inline-block mb-4">
                            <p className="font-bold text-sm">PHONE: {address.recievers_phone}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleDeleteAddress(address.id)}
                              className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                                text-xs px-4 py-2 h-10 flex-1
                                shadow-[4px_4px_0px_0px_#000]
                                hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                                active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                                transition-all duration-100"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {addresses.length === 0 && !isAddingAddress && (
                    <div className="text-center py-16">
                      <div className="bg-[#C4B5FD] border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 inline-block -rotate-1">
                        <div className="w-16 h-16 bg-white border-4 border-black mx-auto mb-4 flex items-center justify-center">
                          <svg className="w-8 h-8 stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <p className="font-black uppercase tracking-tight text-lg mb-4">NO ADDRESSES ADDED YET</p>
                        <button 
                          onClick={() => setIsAddingAddress(true)}
                          className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                            text-sm px-6 py-4 h-14
                            shadow-[6px_6px_0px_0px_#000]
                            hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                            active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                            transition-all duration-100"
                        >
                          ADD YOUR FIRST ADDRESS
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="bg-[#FF6B6B] border-b-4 border-black p-4 sm:p-6">
                  <h3 className="font-black uppercase tracking-widest text-sm text-white">MY ORDERS</h3>
                </div>
                
                <div className="p-6 sm:p-8 text-center">
                  <div className="bg-[#FFD93D] border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 inline-block rotate-1">
                    <div className="w-16 h-16 bg-black border-4 border-black mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 stroke-[4px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="font-black uppercase tracking-tight text-lg mb-4">VIEW YOUR ORDER HISTORY</p>
                    <a 
                      href="/orders"
                      className="bg-black border-4 border-black font-black uppercase tracking-widest 
                        text-sm px-6 py-4 h-14 inline-block text-white
                        shadow-[6px_6px_0px_0px_#000]
                        hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                        active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                        transition-all duration-100"
                    >
                      GO TO ORDERS
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}