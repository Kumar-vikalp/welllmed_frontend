import { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';
import Card from '../components/Card';
import Button from '../components/Button';
import { Star, Zap, Shield } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setToast({ message: 'Thank you for your message! We\'ll get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      details: ['+91 123 456 7890', '+91 987 654 3210'],
      description: 'Available 24/7 for emergencies'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      details: ['support@genx.com', 'orders@genx.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      details: ['123 Healthcare Street', 'Medical District, Mumbai 400001'],
      description: 'Visit our headquarters'
    }
  ];

  return (
    <>
      <Toast message={toast.message} type={toast.type} />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="bg-neo-canvas min-h-screen relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-neo-grid opacity-20"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 rotate-12">
          <Star className="w-8 h-8 fill-neo-accent text-neo-accent animate-spin-slow" />
        </div>
        <div className="absolute top-40 right-20 -rotate-12">
          <Zap className="w-12 h-12 fill-neo-secondary text-neo-secondary animate-bounce-slow" />
        </div>
        <div className="absolute bottom-32 left-32 rotate-45">
          <Shield className="w-10 h-10 fill-neo-muted text-neo-muted" />
        </div>

        {/* Hero Section */}
        <div className="neo-section bg-neo-accent border-y-4 border-neo-ink relative">
          <div className="neo-container text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-8xl font-black mb-6 uppercase"
            >
              <span className="block -rotate-1">CONTACT</span>
              <span className="block rotate-1 text-stroke">US</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-bold max-w-3xl mx-auto uppercase"
            >
              WE'RE HERE TO HELP WITH ALL YOUR HEALTHCARE NEEDS. REACH OUT TO US ANYTIME!
            </motion.p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="neo-section bg-white border-y-4 border-neo-ink">
          <div className="neo-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-8 text-center bg-neo-muted"
                    rotation={Math.random() > 0.5 ? 1 : -1}
                  >
                    <div className="w-16 h-16 bg-white border-4 border-neo-ink flex items-center justify-center mx-auto mb-6 rotate-12">
                      {info.icon}
                    </div>
                    <h3 className="text-2xl font-black text-neo-ink mb-4 uppercase -rotate-1">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-neo-ink font-bold mb-2 uppercase text-sm">{detail}</p>
                    ))}
                    <p className="text-neo-ink font-bold text-xs mt-4 uppercase tracking-wide">{info.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="neo-section bg-neo-secondary border-y-4 border-neo-ink">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-8 md:p-12 bg-white rotate-1">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-neo-ink mb-4 uppercase -rotate-1">SEND US A MESSAGE</h2>
                <p className="text-lg font-bold text-neo-ink uppercase">FILL OUT THE FORM BELOW AND WE'LL GET BACK TO YOU ASAP.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-black text-neo-ink mb-2 uppercase tracking-wide">FULL NAME *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="neo-input w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="neo-input w-full"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-black text-neo-ink mb-2 uppercase tracking-wide">PHONE NUMBER</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="neo-input w-full"
                      placeholder="+91 123 456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-black text-neo-ink mb-2 uppercase tracking-wide">SUBJECT *</label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="neo-input w-full"
                    >
                      <option value="">SELECT A SUBJECT</option>
                      <option value="general">GENERAL INQUIRY</option>
                      <option value="order">ORDER SUPPORT</option>
                      <option value="technical">TECHNICAL ISSUE</option>
                      <option value="billing">BILLING QUESTION</option>
                      <option value="partnership">PARTNERSHIP</option>
                      <option value="other">OTHER</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-black text-neo-ink mb-2 uppercase tracking-wide">MESSAGE *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="neo-input w-full resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="rotate-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      'SENDING MESSAGE...'
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="neo-section bg-white border-y-4 border-neo-ink">
          <div className="neo-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-neo-ink mb-4 uppercase rotate-1">FREQUENTLY ASKED QUESTIONS</h2>
              <p className="text-lg font-bold text-neo-ink uppercase">QUICK ANSWERS TO COMMON QUESTIONS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="p-6 bg-neo-accent rotate-1">
                  <h3 className="text-lg font-black text-white mb-3 uppercase">HOW FAST IS YOUR DELIVERY?</h3>
                  <p className="text-white font-bold">WE DELIVER MEDICINES WITHIN 10 MINUTES IN MAJOR CITIES AND WITHIN 24 HOURS IN OTHER AREAS.</p>
                </Card>
                <Card className="p-6 bg-neo-secondary -rotate-1">
                  <h3 className="text-lg font-black text-neo-ink mb-3 uppercase">ARE YOUR MEDICINES AUTHENTIC?</h3>
                  <p className="text-neo-ink font-bold">YES, ALL OUR MEDICINES ARE SOURCED DIRECTLY FROM LICENSED MANUFACTURERS AND ARE 100% AUTHENTIC.</p>
                </Card>
                <Card className="p-6 bg-neo-muted rotate-2">
                  <h3 className="text-lg font-black text-neo-ink mb-3 uppercase">DO YOU ACCEPT INSURANCE?</h3>
                  <p className="text-neo-ink font-bold">WE'RE WORKING ON INSURANCE PARTNERSHIPS. CURRENTLY, WE ACCEPT ALL MAJOR PAYMENT METHODS.</p>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="p-6 bg-white -rotate-1">
                  <h3 className="text-lg font-black text-neo-ink mb-3 uppercase">CAN I RETURN MEDICINES?</h3>
                  <p className="text-neo-ink font-bold">DUE TO SAFETY REGULATIONS, WE ONLY ACCEPT RETURNS FOR DAMAGED OR INCORRECT ITEMS WITHIN 24 HOURS.</p>
                </Card>
                <Card className="p-6 bg-neo-accent rotate-1">
                  <h3 className="text-lg font-black text-white mb-3 uppercase">DO YOU REQUIRE PRESCRIPTIONS?</h3>
                  <p className="text-white font-bold">PRESCRIPTION MEDICINES REQUIRE A VALID PRESCRIPTION. OVER-THE-COUNTER MEDICINES DON'T NEED ONE.</p>
                </Card>
                <Card className="p-6 bg-neo-secondary -rotate-2">
                  <h3 className="text-lg font-black text-neo-ink mb-3 uppercase">IS MY DATA SECURE?</h3>
                  <p className="text-neo-ink font-bold">ABSOLUTELY! WE USE INDUSTRY-STANDARD ENCRYPTION TO PROTECT ALL YOUR PERSONAL AND MEDICAL INFORMATION.</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}