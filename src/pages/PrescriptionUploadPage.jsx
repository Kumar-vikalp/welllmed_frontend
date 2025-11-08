import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);
    
    setTimeout(() => {
      const newFiles = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024).toFixed(2) + ' KB'
      }));
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      setUploading(false);
    }, 1000);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one prescription');
      return;
    }
    // Here you would send the files to your backend
    alert('Prescriptions uploaded successfully!');
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">UPLOAD PRESCRIPTIONS</h1>
            <p className="text-purple-100">Upload your prescriptions to order medicines</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Section - Upload Options */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Choose from the following to upload prescription:</h3>
                
                <div className="space-y-6">
                  {/* Gallery Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-500 transition-colors">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*,.pdf"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-2">Choose from gallery</p>
                      <p className="text-sm text-gray-500">Supported formats: JPG, PNG, PDF</p>
                    </label>
                  </div>

                  <div className="text-center text-gray-500 font-medium">Or</div>

                  {/* E-Prescription */}
                  <div className="border-2 border-gray-300 rounded-xl p-8 hover:border-purple-500 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-700">Select from E-Prescription</p>
                    </div>
                  </div>

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-700">Uploaded Prescriptions:</h4>
                      {uploadedFiles.map((file) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">{file.name}</p>
                              <p className="text-sm text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {uploadedFiles.length === 0 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500">Uploaded Prescriptions will be shown here</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Requirements */}
              <div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    Make sure the prescription you upload contains the following elements:
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Doctor's Details</h4>
                        <p className="text-sm text-gray-600">Name, signature, and registration number</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Patient Details</h4>
                        <p className="text-sm text-gray-600">Name and age of the patient</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Medicine List</h4>
                        <p className="text-sm text-gray-600">Clear names and dosage instructions</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Prescription Date</h4>
                        <p className="text-sm text-gray-600">Valid date (not older than 6 months)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Prescriptions must be clear and legible. Blurry or unclear prescriptions may be rejected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  uploadedFiles.length > 0
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Prescriptions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
