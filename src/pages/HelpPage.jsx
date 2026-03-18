import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Star, Zap, Shield, Clock } from 'lucide-react';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('orders');

  const categories = [
    { id: 'orders', name: 'Orders & Delivery', icon: '📦' },
    { id: 'account', name: 'Account & Profile', icon: '👤' },
    { id: 'payments', name: 'Payments & Billing', icon: '💳' },
    { id: 'medicines', name: 'Medicines & Health', icon: '💊' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' }
  ];

  const helpContent = {
    orders: [
      {
        question: 'How can I track my order?',
        answer: 'You can track your order by going to "My Orders" section in your profile. You\'ll see real-time updates on your order status and estimated delivery time.'
      },
      {
        question: 'What if my order is delayed?',
        answer: 'If your order is delayed beyond the estimated time, please contact our support team. We\'ll investigate and provide you with an updated delivery timeline.'
      },
      {
        question: 'Can I cancel my order?',
        answer: 'You can cancel your order within 5 minutes of placing it. After that, cancellation depends on the order status. Contact support for assistance.'
      },
      {
        question: 'What are your delivery areas?',
        answer: 'We deliver to 500+ cities across India. Enter your pincode during checkout to check if we deliver to your area.'
      }
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Sign Up" and provide your email and password. You can also sign up using your Google account for faster registration.'
      },
      {
        question: 'I forgot my password. What should I do?',
        answer: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you an OTP to reset your password.'
      },
      {
        question: 'How can I update my profile information?',
        answer: 'Go to "My Profile" section where you can update your name, address, phone number, and other personal information.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can request account deletion by contacting our support team. Please note that this action is irreversible.'
      }
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept UPI, credit/debit cards, net banking, and cash on delivery (COD) for eligible orders.'
      },
      {
        question: 'Is it safe to pay online?',
        answer: 'Yes, all online payments are processed through secure, encrypted gateways. We don\'t store your payment information.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Refunds are processed for cancelled orders or in case of damaged/incorrect items. The refund will be credited to your original payment method within 5-7 business days.'
      },
      {
        question: 'Why was my payment declined?',
        answer: 'Payment can be declined due to insufficient funds, incorrect card details, or bank restrictions. Please check with your bank or try a different payment method.'
      }
    ],
    medicines: [
      {
        question: 'Are your medicines authentic?',
        answer: 'Yes, all our medicines are sourced directly from licensed manufacturers and distributors. We guarantee 100% authenticity.'
      },
      {
        question: 'Do I need a prescription for all medicines?',
        answer: 'Prescription medicines require a valid prescription from a registered doctor. Over-the-counter medicines can be purchased without a prescription.'
      },
      {
        question: 'How do you ensure medicine quality?',
        answer: 'We follow strict quality control measures, proper storage conditions, and work only with certified suppliers to ensure medicine quality.'
      },
      {
        question: 'What if I receive expired medicines?',
        answer: 'We have strict expiry date checks. If you receive expired medicines, contact us immediately for a replacement and full refund.'
      }
    ],
    technical: [
      {
        question: 'The website is not loading properly',
        answer: 'Try clearing your browser cache, disable ad blockers, or try using a different browser. If the issue persists, contact our technical support.'
      },
      {
        question: 'I can\'t upload my prescription',
        answer: 'Ensure your prescription image is clear, in JPG/PNG format, and under 5MB. Try using a different device or browser if the issue continues.'
      },
      {
        question: 'The mobile app is crashing',
        answer: 'Update the app to the latest version, restart your device, or reinstall the app. Contact support if the problem continues.'
      },
      {
        question: 'I\'m not receiving notifications',
        answer: 'Check your notification settings in the app and ensure notifications are enabled for genx in your device settings.'
      }
    ]
  };

  return (
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
            <span className="block -rotate-1">HELP</span>
            <span className="block rotate-1 text-stroke">CENTER</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold max-w-3xl mx-auto uppercase"
          >
            FIND ANSWERS TO YOUR QUESTIONS AND GET THE HELP YOU NEED
          </motion.p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <h2 className="text-2xl md:text-4xl font-black text-center text-neo-ink mb-12 uppercase rotate-1">QUICK ACTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/orders">
              <Card className="p-6 text-center bg-neo-secondary rotate-1">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="font-black text-neo-ink mb-2 uppercase">TRACK ORDER</h3>
                <p className="text-neo-ink font-bold text-sm uppercase">CHECK YOUR ORDER STATUS</p>
              </Card>
            </Link>
            <Link to="/contact">
              <Card className="p-6 text-center bg-neo-accent -rotate-1">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-black text-white mb-2 uppercase">LIVE CHAT</h3>
                <p className="text-white font-bold text-sm uppercase">CHAT WITH OUR SUPPORT TEAM</p>
              </Card>
            </Link>
            <Link to="/profile">
              <Card className="p-6 text-center bg-neo-muted rotate-2">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="font-black text-neo-ink mb-2 uppercase">MY ACCOUNT</h3>
                <p className="text-neo-ink font-bold text-sm uppercase">MANAGE YOUR PROFILE</p>
              </Card>
            </Link>
            <a href="tel:+911234567890">
              <Card className="p-6 text-center bg-white -rotate-2">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-black text-neo-ink mb-2 uppercase">CALL SUPPORT</h3>
                <p className="text-neo-ink font-bold text-sm uppercase">+91 123 456 7890</p>
              </Card>
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="neo-section bg-neo-secondary border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 md:p-12 bg-white -rotate-1">
            <h2 className="text-2xl md:text-4xl font-black text-center text-neo-ink mb-12 uppercase rotate-1">FREQUENTLY ASKED QUESTIONS</h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === category.id
                      ? 'neo-btn-primary'
                      : 'neo-btn-outline'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-black uppercase text-sm">{category.name}</span>
                </button>
              ))}
            </div>

            {/* FAQ Content */}
            <div className="space-y-6">
              {helpContent[activeCategory].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-neo-muted" rotation={Math.random() > 0.5 ? 1 : -1}>
                    <h3 className="text-lg font-black text-neo-ink mb-3 uppercase">{item.question}</h3>
                    <p className="text-neo-ink font-bold leading-relaxed text-sm">{item.answer}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-neo-ink mb-6 uppercase rotate-1">STILL NEED HELP?</h2>
          <p className="text-lg font-bold text-neo-ink mb-8 uppercase">CAN'T FIND WHAT YOU'RE LOOKING FOR? OUR SUPPORT TEAM IS HERE TO HELP!</p>
          <div className="space-x-4">
            <Link 
              to="/contact"
            >
              <Button size="lg" className="rotate-2">
                CONTACT SUPPORT
              </Button>
            </Link>
            <a 
              href="mailto:support@genx.com"
            >
              <Button variant="outline" size="lg" className="-rotate-2">
                EMAIL US
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}