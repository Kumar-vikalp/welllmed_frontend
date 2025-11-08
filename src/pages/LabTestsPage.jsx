import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LabTestsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
    preferredTime: ''
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

  const doctorCreatedTests = [
    { name: 'Full Body Checkup', icon: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=100&h=100&fit=crop', link: '/lab-tests/full-body' },
    { name: 'Diabetes', icon: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=100&h=100&fit=crop', link: '/lab-tests/diabetes' },
    { name: "Women's Health", icon: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop', link: '/lab-tests/womens-health' },
    { name: 'Thyroid', icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop', link: '/lab-tests/thyroid' },
    { name: 'Vitamin', icon: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=100&h=100&fit=crop', link: '/lab-tests/vitamin' },
    { name: 'Blood Studies', icon: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=100&h=100&fit=crop', link: '/lab-tests/blood' }
  ];

  const vitalOrgans = [
    { name: 'Thyroid', icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop', link: '/lab-tests/thyroid' },
    { name: 'Heart', icon: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=100&h=100&fit=crop', link: '/lab-tests/heart' },
    { name: 'Joint Pain', icon: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=100&h=100&fit=crop', link: '/lab-tests/joint' },
    { name: 'Kidney', icon: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=100&h=100&fit=crop', link: '/lab-tests/kidney' },
    { name: 'Liver', icon: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=100&h=100&fit=crop', link: '/lab-tests/liver' },
    { name: 'Bone and Joint', icon: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=100&h=100&fit=crop', link: '/lab-tests/bone' }
  ];

  const packages = [
    { name: 'Sushruta Package 1', price: 999, tests: 15, color: 'bg-blue-50 border-blue-200' },
    { name: 'Sushruta Package 2', price: 1499, tests: 25, color: 'bg-green-50 border-green-200' },
    { name: 'Sushruta Basic Check', price: 799, tests: 12, color: 'bg-purple-50 border-purple-200' },
    { name: 'Sushruta Extended Check', price: 1999, tests: 35, color: 'bg-orange-50 border-orange-200' },
    { name: 'Sushruta Comprehensive Check', price: 2999, tests: 50, color: 'bg-red-50 border-red-200' },
    { name: 'Sushruta Platinum', price: 4999, tests: 75, color: 'bg-yellow-50 border-yellow-200' },
    { name: 'Sushruta Premium', price: 6999, tests: 100, color: 'bg-indigo-50 border-indigo-200' }
  ];

  const dailyOffers = [
    { test: 'CBC', price: 155 },
    { test: 'LFT', price: 259 },
    { test: 'Lipid Profile', price: 230 },
    { test: 'KFT', price: 199 },
    { test: 'Vitamin B12', price: 299 },
    { test: 'HbA1c', price: 179 },
    { test: 'Thyroid Profile T3+T4+TSH', price: 399 },
    { test: 'Vitamin D3', price: 249 }
  ];

  const faqs = [
    {
      question: "What is the Swasth Super 4 package?",
      answer: "Regular health check-ups help us in detecting various diseases at an early stage. Early diagnosis and treatment give us the best chance of fighting the disease off without any severe complications. The Swasth Super 4 package by Dr. Lal PathLabs includes the goodness of all Swasth Super packages through which you can get a comprehensive health assessment of your body."
    },
    {
      question: "What does the Swasth Super 4 package measure?",
      answer: "The Swasth Super 4 package measures various aspects of our health including Glucose Fasting, Thyroid Profile Total, Lipid Profile Screen, Liver and Kidney Panel, HbA1c, Complete blood count (CBC), Vitamin D 25-Hydroxy, and Vitamin B12."
    },
    {
      question: "When is the Swasth Super 4 package recommended?",
      answer: "The Swasth Super 4 package is recommended as part of a routine health checkup, to diagnose various conditions, and for screening in people with risk factors such as obesity, family history, age over 45 years, unhealthy lifestyle, smoking, heavy alcohol use, and limited sun exposure."
    },
    {
      question: "How is the Swasth Super 4 package performed?",
      answer: "The Swasth Super 4 package is done in the morning after an 8 to 12 hour overnight fast. A healthcare professional will draw a blood sample from a vein in the arm."
    },
    {
      question: "What are the risks of the Swasth Super 4 package?",
      answer: "The Swasth Super 4 package is a safe, standard test and there are minimal risks involved such as bleeding, bruising, light headedness, and infection."
    },
    {
      question: "What the results may indicate?",
      answer: "The normal ranges may vary slightly among different laboratories. The doctor will evaluate the results based on health, gender, age, and other factors. Results can indicate various conditions including diabetes, prediabetes, cholesterol levels, and vitamin deficiencies."
    },
    {
      question: "Am I Eligible for Tax Exemption on Swasthfit Preventive Full Body Packages?",
      answer: "You can avail tax exemptions of up to Rs 5000 under Section 80D for Swasthfit preventive health check-ups."
    }
  ];
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking request submitted successfully! We will contact you soon.');
    setShowBookingForm(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 min-h-screen"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Banner Carousel */}
          <div className="relative w-full h-[200px] mb-8 rounded-2xl overflow-hidden">
            {bannerSlides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
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
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>


          {/* Doctor Created Health Checks */}
          <div className="mb-8 bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Doctor Created Health Checks ({doctorCreatedTests.length})</h2>
              <Link to="/lab-tests/all" className="text-purple-600 hover:text-purple-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {doctorCreatedTests.map((test) => (
                <Link
                  key={test.name}
                  to={test.link}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden">
                    <img src={test.icon} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-center font-medium text-gray-700">{test.name}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Daily Offers */}
          <div className="px-4 py-12 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Sushruta Daily Offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dailyOffers.map((offer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{offer.test}</h3>
                    <p className="text-2xl font-bold text-purple-600">₹{offer.price}/-</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Vital Organs */}
          <div className="mb-8 bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Vital Organs ({vitalOrgans.length})</h2>
              <Link to="/lab-tests/vital-organs" className="text-purple-600 hover:text-purple-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {vitalOrgans.map((organ) => (
                <Link
                  key={organ.name}
                  to={organ.link}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden">
                    <img src={organ.icon} alt={organ.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-center font-medium text-gray-700">{organ.name}</p>
                </Link>
              ))}
            </div>
          </div>
          {/* Package Types */}
          <div className="px-4 py-12 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Health Checkup Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/lab/package/${pkg.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    className={`${pkg.color} rounded-2xl p-6 border-2 cursor-pointer hover:shadow-lg transition-all`}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">₹{pkg.price}</div>
                      <p className="text-sm text-gray-600 mb-4">{pkg.tests} Tests Included</p>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPackage(pkg);
                            setShowBookingForm(true);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm flex-1"
                        >
                          Book Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/lab/package/${pkg.name.toLowerCase().replace(/\s+/g, '-')}`);
                          }}
                          className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-2 px-4 rounded-lg transition-colors text-sm flex-1"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>


          {/* Description Section */}
          <div className="px-4 py-12 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Swasthfit Full Body Checkup Packages at Lal PathLabs
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p className="mb-6">
                  Regular health check-ups help us in detecting various diseases at an early stage. Early diagnosis and treatment give us the best chance of fighting the disease off without any severe complications. The Swasth Super 4 package by Dr. Lal PathLabs includes the goodness of all Swasth Super packages through which you can get a comprehensive health assessment of your body. The Swasth Super 4 package can be performed as part of a regular preventive health checkup once every 6 to 12 months or as recommended by the doctor.
                </p>
                <p className="mb-6">Various components of the Dr. Lal PathLabs Swasth Super 4 package include:</p>
                <ul className="space-y-3 mb-6">
                  <li><strong>Glucose Fasting</strong> measures the level of glucose in the blood after an 8 to 12 hour overnight fast.</li>
                  <li><strong>Thyroid Profile Total</strong> is a group of tests done together to diagnose thyroid disorders.</li>
                  <li><strong>Lipid Profile Screen</strong> is a blood test used to assess the risk of developing Cardiovascular disease.</li>
                  <li><strong>Liver and Kidney Panel</strong> is a group of blood tests that are performed together to detect, evaluate, and monitor liver health and kidney function.</li>
                  <li><strong>HbA1c</strong> is a useful and simple blood test that can be used to diagnose diabetes.</li>
                  <li><strong>Complete blood count (CBC)</strong> is the most commonly ordered blood test.</li>
                  <li><strong>Vitamin D 25-Hydroxy</strong> measures the level of Vitamin D in the blood.</li>
                  <li><strong>Vitamin B12</strong> measures the concentration of Vitamin B12 in blood.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Book Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">How to Book a Lab Test in 3 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Test</h3>
                <p className="text-sm opacity-90">Select from our wide range of tests</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">Book Slot</h3>
                <p className="text-sm opacity-90">Pick your convenient time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm opacity-90">Receive reports online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </motion.div>

  );
}
