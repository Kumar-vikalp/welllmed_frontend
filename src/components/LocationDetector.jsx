import { useState, useEffect } from 'react'
import { detectUserLocation } from '../utils/locationUtils'

export default function LocationDetector({ onLocationDetected }) {
  const [pincode, setPincode] = useState('110040') // Default pincode
  const [detecting, setDetecting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Try to get location on component mount
    const savedPincode = localStorage.getItem('user_pincode')
    if (savedPincode) {
      setPincode(savedPincode)
      onLocationDetected?.(savedPincode)
    } else {
      // Auto-detect location on first visit
      handleDetectLocation()
    }
  }, [])

  const handleDetectLocation = async () => {
    setDetecting(true)
    try {
      const locationData = await detectUserLocation()
      if (locationData.pincode) {
        setPincode(locationData.pincode)
        localStorage.setItem('user_pincode', locationData.pincode)
        onLocationDetected?.(locationData.pincode)
      }
    } catch (error) {
      console.log('Could not detect location, using default pincode')
    } finally {
      setDetecting(false)
    }
  }

  const handlePincodeChange = (newPincode) => {
    setPincode(newPincode)
    localStorage.setItem('user_pincode', newPincode)
    onLocationDetected?.(newPincode)
    setShowModal(false)
  }

  return (
    <>
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <svg className="w-3 h-3 md:w-4 md:h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-gray-600">Deliver to:</span>
        <button 
          onClick={() => setShowModal(true)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {pincode}
        </button>
        {detecting && <span className="text-xs text-gray-500">Detecting...</span>}
      </div>

      {/* Pincode Change Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Change Delivery Location</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handlePincodeChange(pincode)}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={handleDetectLocation}
                  disabled={detecting}
                  className="flex-1 bg-gray-400 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                >
                  {detecting ? 'Detecting...' : 'Auto Detect'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}