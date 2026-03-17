import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Star, Zap, Shield, Clock } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '10,000+', label: 'Medicines Available' },
    { number: '500+', label: 'Cities Served' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '15+ years in pharmaceutical industry'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Expert in supply chain management'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Quality Assurance Lead',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Ensuring medicine quality and safety'
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
            <span className="block -rotate-1">ABOUT</span>
            <span className="block rotate-1 text-stroke">WELLMED</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold max-w-3xl mx-auto uppercase"
          >
            YOUR TRUSTED PARTNER IN HEALTHCARE, DELIVERING QUALITY MEDICINES TO YOUR DOORSTEP SINCE 2020
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 text-center bg-neo-secondary"
                  rotation={Math.random() > 0.5 ? 1 : -1}
                >
                  <div className="text-3xl md:text-5xl font-black text-neo-ink mb-2 -rotate-1">{stat.number}</div>
                  <div className="text-neo-ink font-bold uppercase text-sm tracking-wide">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="neo-section bg-neo-muted border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 md:p-12 bg-white rotate-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-neo-ink mb-6 uppercase -rotate-1">OUR MISSION</h2>
                <p className="text-lg font-bold text-neo-ink mb-6 leading-relaxed uppercase">
                  AT WELLMED, WE BELIEVE HEALTHCARE SHOULD BE ACCESSIBLE, AFFORDABLE, AND CONVENIENT FOR EVERYONE. 
                  OUR MISSION IS TO REVOLUTIONIZE THE WAY PEOPLE ACCESS MEDICINES BY PROVIDING A SEAMLESS ONLINE 
                  PLATFORM THAT CONNECTS PATIENTS WITH QUALITY HEALTHCARE PRODUCTS.
                </p>
                <p className="text-lg font-bold text-neo-ink leading-relaxed uppercase">
                  WE ARE COMMITTED TO ENSURING THAT EVERY MEDICINE WE DELIVER MEETS THE HIGHEST QUALITY STANDARDS 
                  AND REACHES OUR CUSTOMERS SAFELY AND ON TIME.
                </p>
              </div>
              <div className="relative">
                <Card className="overflow-hidden rotate-3" hover={false}>
                  <img 
                  src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Our Mission"
                    className="w-full h-80 object-cover"
                />
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Values Section */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <h2 className="text-3xl md:text-5xl font-black text-center text-neo-ink mb-12 uppercase rotate-1">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 text-center bg-neo-accent rotate-2">
                <div className="w-16 h-16 bg-white border-4 border-neo-ink flex items-center justify-center mx-auto mb-6 -rotate-12">
                  <svg className="w-8 h-8 text-neo-ink stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase">QUALITY FIRST</h3>
                <p className="text-white font-bold uppercase text-sm">WE NEVER COMPROMISE ON THE QUALITY OF MEDICINES AND ENSURE ALL PRODUCTS MEET INTERNATIONAL STANDARDS.</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 text-center bg-neo-secondary -rotate-1">
                <div className="w-16 h-16 bg-white border-4 border-neo-ink flex items-center justify-center mx-auto mb-6 rotate-12">
                  <Zap className="w-8 h-8 text-neo-ink stroke-[3px]" />
                </div>
                <h3 className="text-xl font-black text-neo-ink mb-4 uppercase">FAST DELIVERY</h3>
                <p className="text-neo-ink font-bold uppercase text-sm">WE UNDERSTAND URGENCY IN HEALTHCARE AND STRIVE TO DELIVER MEDICINES AS QUICKLY AS POSSIBLE.</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 text-center bg-neo-muted rotate-1">
                <div className="w-16 h-16 bg-white border-4 border-neo-ink flex items-center justify-center mx-auto mb-6 -rotate-6">
                  <Clock className="w-8 h-8 text-neo-ink stroke-[3px]" />
                </div>
                <h3 className="text-xl font-black text-neo-ink mb-4 uppercase">CUSTOMER CARE</h3>
                <p className="text-neo-ink font-bold uppercase text-sm">OUR DEDICATED SUPPORT TEAM IS AVAILABLE 24/7 TO ASSIST YOU WITH ANY HEALTHCARE NEEDS.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="neo-section bg-neo-secondary border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 md:p-12 bg-white -rotate-1">
            <h2 className="text-3xl md:text-5xl font-black text-center text-neo-ink mb-12 uppercase rotate-1">MEET OUR TEAM</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="p-6 bg-neo-muted" rotation={Math.random() > 0.5 ? 1 : -1}>
                    <div className="w-32 h-32 border-4 border-neo-ink mx-auto mb-6 overflow-hidden rotate-3">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-black text-neo-ink mb-2 uppercase">{member.name}</h3>
                    <p className="text-neo-accent font-bold mb-3 uppercase text-sm">{member.role}</p>
                    <p className="text-neo-ink font-bold text-sm uppercase">{member.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="neo-section bg-neo-ink border-y-4 border-neo-ink">
        <div className="neo-container text-center">
          <Card className="p-8 bg-neo-ink border-white rotate-1" hover={false}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase -rotate-1">READY TO EXPERIENCE BETTER HEALTHCARE?</h2>
            <p className="text-xl text-white font-bold mb-8 uppercase">JOIN THOUSANDS OF SATISFIED CUSTOMERS WHO TRUST WELLMED FOR THEIR HEALTHCARE NEEDS.</p>
            <div className="space-x-4">
              <Link 
                to="/products"
              >
                <Button variant="secondary" size="lg" className="rotate-2">
                  SHOP NOW
                </Button>
              </Link>
              <Link 
                to="/contact"
              >
                <Button variant="outline" size="lg" className="-rotate-2">
                  CONTACT US
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}