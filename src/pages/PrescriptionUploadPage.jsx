import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const event = { target: { files } };
      handleFileUpload(event);
    }
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
    <div className="min-h-screen bg-[#FFFDF5] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#FF6B6B] border-b-8 border-black p-6 sm:p-8 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-4 text-white -rotate-1">
              UPLOAD PRESCRIPTIONS
            </h1>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000] rotate-1 inline-block">
              <p className="font-bold uppercase tracking-wide text-black">UPLOAD YOUR PRESCRIPTIONS TO ORDER MEDICINES</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Section - Upload Options */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
                  CHOOSE FROM THE FOLLOWING TO UPLOAD PRESCRIPTION:
                </h3>
                
                <div className="space-y-6">
                  {/* Gallery Upload */}
                  <div 
                    className={`border-4 border-dashed border-black p-6 sm:p-8 cursor-pointer transition-all duration-100 ${
                      dragOver 
                        ? 'bg-[#FFD93D] border-solid shadow-[4px_4px_0px_0px_#000]' 
                        : 'bg-white hover:bg-[#C4B5FD] hover:shadow-[4px_4px_0px_0px_#000]'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*,.pdf"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#C4B5FD] border-4 border-black flex items-center justify-center mb-4 rotate-12">
                        <svg className="w-8 h-8 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-black uppercase tracking-wide mb-2">CHOOSE FROM GALLERY</p>
                      <div className="bg-[#FFD93D] border-2 border-black px-3 py-1">
                        <p className="text-xs font-black uppercase tracking-widest">SUPPORTED: JPG, PNG, PDF</p>
                      </div>
                    </label>
                  </div>

                  <div className="text-center">
                    <div className="bg-black text-white border-4 border-black p-2 inline-block font-black uppercase tracking-widest text-sm">
                      OR
                    </div>
                  </div>

                  {/* E-Prescription */}
                  <div className="border-4 border-black p-6 sm:p-8 cursor-pointer bg-white hover:bg-[#C4B5FD] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-100">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#FFD93D] border-4 border-black flex items-center justify-center mb-4 -rotate-12">
                        <svg className="w-8 h-8 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-black uppercase tracking-wide">SELECT FROM E-PRESCRIPTION</p>
                    </div>
                  </div>

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="bg-[#C4B5FD] border-4 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
                      <h4 className="font-black uppercase tracking-widest text-sm mb-4 border-b-2 border-black pb-2">
                        UPLOADED PRESCRIPTIONS:
                      </h4>
                      <div className="space-y-3">
                        {uploadedFiles.map((file) => (
                          <motion.div
                            key={file.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between bg-white border-4 border-black p-4 shadow-[2px_2px_0px_0px_#000]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-[#FFD93D] border-4 border-black flex items-center justify-center">
                                <svg className="w-6 h-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-black text-sm uppercase tracking-wide">{file.name}</p>
                                <p className="font-bold text-xs uppercase tracking-widest">{file.size}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="bg-[#FF6B6B] border-2 border-black w-8 h-8 flex items-center justify-center
                                hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]
                                active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                                transition-all duration-100"
                            >
                              <svg className="w-4 h-4 stroke-[3px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadedFiles.length === 0 && (
                    <div className="border-4 border-dashed border-black p-8 sm:p-12 text-center bg-white">
                      <div className="w-20 h-20 bg-[#C4B5FD] border-4 border-black flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="font-bold uppercase tracking-wide">UPLOADED PRESCRIPTIONS WILL BE SHOWN HERE</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Requirements */}
              <div>
                <div className="bg-[#FFD93D] border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] -rotate-1">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 rotate-1">
                    MAKE SURE THE PRESCRIPTION YOU UPLOAD CONTAINS THE FOLLOWING ELEMENTS:
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 rotate-12">
                        <svg className="w-7 h-7 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-wide mb-1">DOCTOR'S DETAILS</h4>
                        <p className="font-bold text-sm uppercase tracking-wide">NAME, SIGNATURE, AND REGISTRATION NUMBER</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 -rotate-12">
                        <svg className="w-7 h-7 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-wide mb-1">PATIENT DETAILS</h4>
                        <p className="font-bold text-sm uppercase tracking-wide">NAME AND AGE OF THE PATIENT</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 rotate-6">
                        <svg className="w-7 h-7 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-wide mb-1">MEDICINE LIST</h4>
                        <p className="font-bold text-sm uppercase tracking-wide">CLEAR NAMES AND DOSAGE INSTRUCTIONS</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 -rotate-6">
                        <svg className="w-7 h-7 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-wide mb-1">PRESCRIPTION DATE</h4>
                        <p className="font-bold text-sm uppercase tracking-wide">VALID DATE (NOT OLDER THAN 6 MONTHS)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-[#FF6B6B] border-4 border-black p-4">
                    <p className="font-bold text-sm text-white uppercase tracking-wide">
                      <span className="font-black">NOTE:</span> PRESCRIPTIONS MUST BE CLEAR AND LEGIBLE. BLURRY OR UNCLEAR PRESCRIPTIONS MAY BE REJECTED.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0 || uploading}
                className={`px-8 py-4 h-16 font-black uppercase tracking-widest text-sm transition-all duration-100 ${
                  uploadedFiles.length > 0 && !uploading
                    ? 'bg-[#FF6B6B] border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]'
                    : 'bg-[#C4B5FD] border-4 border-black opacity-50 cursor-not-allowed'
                } w-full sm:w-auto`}
              >
                {uploading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-black mr-2 animate-spin"></div>
                    UPLOADING...
                  </div>
                ) : (
                  'SUBMIT PRESCRIPTIONS'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}