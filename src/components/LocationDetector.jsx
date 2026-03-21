import { useState, useEffect } from 'react'
import { detectUserLocation } from '../utils/locationUtils'
import Button from './Button'

export default function LocationDetector({ onLocationDetected }) {
  const [pincode, setPincode] = useState('') // Start empty
  const [detecting, setDetecting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const savedPincode = localStorage.getItem('user_pincode')
    if (savedPincode) {
      setPincode(savedPincode)
      onLocationDetected?.(savedPincode)
    } else {
      // Set default pincode if none saved
      setPincode('110040')
      localStorage.setItem('user_pincode', '110040')
      onLocationDetected?.('110040')
    }
  }, [onLocationDetected])

  const handleDetectLocation = async () => {
    setDetecting(true)
    try {
      const locationData = await detectUserLocation()
      if (locationData.pincode) {
        setPincode(locationData.pincode)
        localStorage.setItem('user_pincode', locationData.pincode)
        onLocationDetected?.(locationData.pincode)
        setShowModal(false)
      }
    } catch (error) {
      console.log('Could not detect location, using default pincode')
      // Keep current pincode on error
    } finally {
      setDetecting(false)
    }
  }

  const handlePincodeSubmit = () => {
    if (pincode && pincode.length === 6) {
      localStorage.setItem('user_pincode', pincode)
      onLocationDetected?.(pincode)
      setShowModal(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6) // Only numbers, max 6 digits
    setPincode(value)
  }

  const handleCancel = () => {
    // Reset to saved pincode or default
    const savedPincode = localStorage.getItem('user_pincode') || '110040'
    setPincode(savedPincode)
    setShowModal(false)
  }

  return (
    <>
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <svg className="w-4 h-4 md:w-5 md:h-5 text-neo-accent stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-neo-ink font-bold uppercase">Deliver to:</span>
        <button 
          onClick={() => setShowModal(true)}
          className="text-neo-ink hover:bg-neo-secondary hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-black uppercase border-2 border-transparent hover:border-neo-ink"
        >
          {pincode || 'Select'}
        </button>
        {detecting && <span className="text-xs text-neo-ink font-bold uppercase animate-pulse">Detecting...</span>}
      </div>

      {/* Pincode Change Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-neo-ink shadow-[12px_12px_0px_0px_#000] p-6 max-w-md w-full">
            <h3 className="text-xl font-black mb-6 text-neo-ink uppercase tracking-wide">Change Delivery Location</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black text-neo-ink mb-3 uppercase tracking-widest">Enter Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={handleInputChange}
                  className="neo-input w-full"
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={handlePincodeSubmit}
                  disabled={!pincode || pincode.length !== 6}
                >
                  UPDATE
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={handleDetectLocation}
                  disabled={detecting}
                >
                  {detecting ? 'DETECTING...' : 'AUTO DETECT'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}