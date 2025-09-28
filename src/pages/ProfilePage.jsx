import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAddresses } from '../contexts/AddressContext';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';
import { detectUserLocation } from '../utils/locationUtils';

export default function ProfilePage() {
  const { user, profile, updateProfile, fetchProfile, getActiveTime } = useUser();
  const { addresses, createAddress, updateAddress, deleteAddress } = useAddresses();
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
      setToast({ message: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setToast({ message: 'Failed to update profile. Please try again.', type: 'error' });
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
      setToast({ message: 'Location detected successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to detect location. Please enter manually.', type: 'error' });
    } finally {
      setDetectingLocation(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await createAddress(addressForm);
      setToast({ message: 'Address added successfully!', type: 'success' });
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
      setToast({ message: 'Failed to add address. Please try again.', type: 'error' });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        setToast({ message: 'Address deleted successfully!', type: 'success' });
      } catch (error) {
        setToast({ message: 'Failed to delete address.', type: 'error' });
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading profile...</p>
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
        className="container mx-auto px-4 py-8 max-w-4xl bg-gray-50 min-h-screen"
      >
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900">My Profile</h1>
        
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative">
              <img src={profileImageUrl} alt="Profile" className="w-32 h-32 rounded-full mb-4 ring-4 ring-purple-500 shadow-lg" />
              <button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 rounded-full p-2 text-white shadow-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{profile?.name || 'Not set'}</h2>
            <p className="text-gray-600">{user?.email}</p>
            {activeTime && (
              <p className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full mt-2">Active time: {activeTime.hours}h {activeTime.minutes}m</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 font-medium">Full Name / Username</label>
                  <p className="text-lg text-gray-900 font-semibold">{profile?.name || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium">Address</label>
                  <p className="text-lg text-gray-900">{profile?.address || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium">Phone</label>
                  <p className="text-lg text-gray-900">{profile?.phone || 'Not set'}</p>
                </div>
                <button onClick={() => setIsEditing(true)} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Edit Profile</button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" name="address" id="address" value={formData.address || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="text" name="phone" id="phone" value={formData.phone || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Save Changes</button>
                  <button type="button" onClick={() => { setIsEditing(false); setFormData({...profile}); }} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
            <button 
              onClick={() => setIsAddingAddress(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Add New Address
            </button>
          </div>

          {/* Add Address Form */}
          {isAddingAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Add New Address</h3>
              <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Receiver's Name</label>
                  <input 
                    type="text" 
                    name="recievers_name" 
                    value={addressForm.recievers_name} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    name="recievers_phone" 
                    value={addressForm.recievers_phone} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address Type</label>
                  <select 
                    name="address_type" 
                    value={addressForm.address_type} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input 
                    type="text" 
                    name="pincode" 
                    value={addressForm.pincode} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Address Line</label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={detectingLocation}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 transition-colors"
                    >
                      {detectingLocation ? 'Detecting...' : 'Detect Location'}
                    </button>
                  </div>
                  <input 
                    type="text" 
                    name="address_line" 
                    value={addressForm.address_line} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={addressForm.city} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={addressForm.state} 
                    onChange={handleAddressInputChange}
                    className="mt-1 block w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex items-center">
                  <input 
                    type="checkbox" 
                    name="is_default" 
                    checked={addressForm.is_default} 
                    onChange={handleAddressInputChange}
                    className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Set as default address</label>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    Save Address
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingAddress(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Address List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map(address => (
              <div key={address.id} className="bg-gray-50 rounded-xl p-6 relative border border-gray-200">
                {address.is_default && (
                  <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Default
                  </span>
                )}
                <div className="mb-3">
                  <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                    {address.address_type}
                  </span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">{address.recievers_name}</h4>
                <p className="text-gray-700 mt-1">{address.address_line}</p>
                <p className="text-gray-700">{address.city}, {address.state} - {address.pincode}</p>
                <p className="text-gray-600 text-sm mt-2">Phone: {address.recievers_phone}</p>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {addresses.length === 0 && !isAddingAddress && (
            <div className="text-center py-12 text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium">No addresses added yet.</p>
              <button 
                onClick={() => setIsAddingAddress(true)}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
              >
                Add your first address
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}