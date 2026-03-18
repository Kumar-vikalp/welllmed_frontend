import { motion } from 'framer-motion';
import Card from '../components/Card';
import { Star, Zap, Shield } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using WellMed's services, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the service."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials on WellMed's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "Medical Disclaimer",
      content: "The information provided on this website is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider before making any healthcare decisions or for guidance about a specific medical condition."
    },
    {
      title: "Prescription Requirements",
      content: "Prescription medicines require a valid prescription from a licensed healthcare provider. We reserve the right to verify prescriptions and may refuse to dispense medications without proper documentation."
    },
    {
      title: "Privacy Policy",
      content: "Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy, which is incorporated into these terms by reference."
    },
    {
      title: "Payment Terms",
      content: "Payment is due at the time of purchase. We accept various payment methods including credit cards, debit cards, UPI, and cash on delivery where available. All prices are subject to change without notice."
    },
    {
      title: "Delivery Policy",
      content: "We strive to deliver orders within the specified timeframe. Delivery times may vary based on location and product availability. We are not responsible for delays caused by circumstances beyond our control."
    },
    {
      title: "Return and Refund Policy",
      content: "Due to the nature of pharmaceutical products, returns are limited to cases of damaged or incorrect items. Refunds will be processed according to our return policy guidelines."
    },
    {
      title: "Limitation of Liability",
      content: "WellMed shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the service constitutes acceptance of the modified terms."
    }
  ];

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
            <span className="block -rotate-1">TERMS &</span>
            <span className="block rotate-1 text-stroke">CONDITIONS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold max-w-3xl mx-auto uppercase"
          >
            PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES
          </motion.p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 md:p-12 bg-white -rotate-1">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-neo-muted" rotation={Math.random() > 0.5 ? 1 : -1}>
                    <h2 className="text-xl font-black text-neo-ink mb-4 uppercase">{section.title}</h2>
                    <p className="text-neo-ink font-bold leading-relaxed">{section.content}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="neo-section bg-neo-secondary border-y-4 border-neo-ink">
        <div className="neo-container text-center">
          <Card className="p-8 bg-white rotate-1" hover={false}>
            <h2 className="text-3xl md:text-5xl font-black text-neo-ink mb-6 uppercase -rotate-1">QUESTIONS ABOUT THESE TERMS?</h2>
            <p className="text-xl text-neo-ink font-bold mb-8 uppercase">CONTACT US FOR CLARIFICATION OR ASSISTANCE</p>
            <div className="space-x-4">
              <a 
                href="mailto:legal@wellmed.com"
                className="bg-neo-accent border-4 border-neo-ink text-neo-ink font-black uppercase tracking-widest text-sm px-6 py-3 shadow-neo btn-push hover:bg-red-500 transition-colors duration-100 inline-block"
              >
                EMAIL LEGAL TEAM
              </a>
              <a 
                href="/contact"
                className="bg-white border-4 border-neo-ink text-neo-ink font-black uppercase tracking-widest text-sm px-6 py-3 shadow-neo btn-push hover:bg-neo-canvas transition-colors duration-100 inline-block"
              >
                CONTACT SUPPORT
              </a>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}