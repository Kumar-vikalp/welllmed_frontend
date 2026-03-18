import { motion } from 'framer-motion';
import Card from '../components/Card';
import { Star, Zap, Shield } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, shipping address, and payment information."
    },
    {
      title: "Medical Information",
      content: "We may collect health-related information when you upload prescriptions or provide medical history. This information is treated with the highest level of confidentiality and security."
    },
    {
      title: "How We Use Your Information",
      content: "We use your information to process orders, provide customer service, send important updates, improve our services, and comply with legal requirements. We never sell your personal information to third parties."
    },
    {
      title: "Information Sharing",
      content: "We may share your information with service providers who help us operate our business, such as payment processors and delivery partners. These partners are bound by strict confidentiality agreements."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies and similar technologies to improve your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time. Contact us to exercise these rights."
    },
    {
      title: "Data Retention",
      content: "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Medical information is retained according to healthcare regulations."
    },
    {
      title: "Children's Privacy",
      content: "Our services are not intended for children under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete the information immediately."
    },
    {
      title: "Changes to Privacy Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website and sending you an email notification."
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
      <div className="neo-section bg-neo-muted border-y-4 border-neo-ink relative">
        <div className="neo-container text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-8xl font-black mb-6 uppercase"
          >
            <span className="block -rotate-1">PRIVACY</span>
            <span className="block rotate-1 text-stroke">POLICY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold max-w-3xl mx-auto uppercase"
          >
            YOUR PRIVACY IS OUR PRIORITY - LEARN HOW WE PROTECT YOUR DATA
          </motion.p>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 md:p-12 bg-white rotate-1">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-neo-secondary" rotation={Math.random() > 0.5 ? 1 : -1}>
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
      <div className="neo-section bg-neo-accent border-y-4 border-neo-ink">
        <div className="neo-container text-center">
          <Card className="p-8 bg-white -rotate-1" hover={false}>
            <h2 className="text-3xl md:text-5xl font-black text-neo-ink mb-6 uppercase rotate-1">PRIVACY CONCERNS?</h2>
            <p className="text-xl text-neo-ink font-bold mb-8 uppercase">CONTACT OUR DATA PROTECTION TEAM</p>
            <div className="space-x-4">
              <a 
                href="mailto:privacy@wellmed.com"
                className="bg-neo-accent border-4 border-neo-ink text-white font-black uppercase tracking-widest text-sm px-6 py-3 shadow-neo btn-push hover:bg-red-500 transition-colors duration-100 inline-block"
              >
                EMAIL PRIVACY TEAM
              </a>
              <a 
                href="/contact"
                className="bg-white border-4 border-neo-ink text-neo-ink font-black uppercase tracking-widest text-sm px-6 py-3 shadow-neo btn-push hover:bg-neo-canvas transition-colors duration-100 inline-block"
              >
                GENERAL CONTACT
              </a>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}