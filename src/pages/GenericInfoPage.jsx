import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function GenericInfoPage() {
  const benefits = [
    {
      title: "COST-EFFECTIVE",
      description: "GENERIC MEDICINES ARE TYPICALLY 20-80% CHEAPER THAN BRANDED EQUIVALENTS",
      icon: "💰"
    },
    {
      title: "SAME QUALITY",
      description: "CONTAINS THE SAME ACTIVE INGREDIENTS AS BRANDED MEDICINES",
      icon: "🔬"
    },
    {
      title: "FDA APPROVED",
      description: "ALL GENERIC MEDICINES UNDERGO RIGOROUS TESTING AND APPROVAL",
      icon: "✅"
    },
    {
      title: "WIDELY AVAILABLE",
      description: "EASILY ACCESSIBLE AT PHARMACIES AND ONLINE PLATFORMS",
      icon: "🏥"
    }
  ]

  const faqs = [
    {
      question: "ARE GENERIC MEDICINES AS EFFECTIVE AS BRANDED ONES?",
      answer: "YES, GENERIC MEDICINES CONTAIN THE SAME ACTIVE INGREDIENTS IN THE SAME AMOUNTS AS BRANDED MEDICINES AND ARE EQUALLY EFFECTIVE."
    },
    {
      question: "WHY ARE GENERIC MEDICINES CHEAPER?",
      answer: "GENERIC MANUFACTURERS DON'T HAVE TO REPEAT EXPENSIVE CLINICAL TRIALS AND MARKETING COSTS, ALLOWING THEM TO OFFER LOWER PRICES."
    },
    {
      question: "ARE THERE ANY DIFFERENCES IN SIDE EFFECTS?",
      answer: "GENERIC MEDICINES HAVE THE SAME SIDE EFFECTS AS THEIR BRANDED COUNTERPARTS SINCE THEY CONTAIN IDENTICAL ACTIVE INGREDIENTS."
    },
    {
      question: "HOW CAN I IDENTIFY GENERIC MEDICINES?",
      answer: "GENERIC MEDICINES ARE USUALLY LABELED WITH THEIR CHEMICAL NAME RATHER THAN A BRAND NAME AND ARE OFTEN PRICED LOWER."
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FFFDF5]"
    >
      {/* Hero Section */}
      <div className="bg-[#C4B5FD] border-b-8 border-black p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 -rotate-1">
            GENERIC MEDICINES
          </h1>
          <div className="bg-[#FFD93D] border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0px_0px_#000] rotate-1 inline-block mb-8">
            <p className="text-lg sm:text-xl font-black uppercase tracking-wide">
              SAFE, EFFECTIVE, AND AFFORDABLE HEALTHCARE SOLUTIONS
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
              <p className="text-base sm:text-lg font-bold uppercase tracking-wide leading-relaxed">
                GENERIC MEDICINES ARE PHARMACEUTICAL PRODUCTS THAT CONTAIN THE SAME ACTIVE INGREDIENTS AS BRANDED MEDICINES 
                BUT ARE SOLD UNDER THEIR CHEMICAL NAMES. THEY OFFER THE SAME THERAPEUTIC BENEFITS AT A FRACTION OF THE COST.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What are Generic Medicines */}
      <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-center mb-12 rotate-1">
            WHAT ARE GENERIC MEDICINES?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] -rotate-1">
              <p className="text-base sm:text-lg font-bold leading-relaxed mb-6 uppercase tracking-wide">
                GENERIC MEDICINES ARE COPIES OF BRAND-NAME DRUGS THAT HAVE EXACTLY THE SAME DOSAGE, INTENDED USE, 
                EFFECTS, SIDE EFFECTS, ROUTE OF ADMINISTRATION, RISKS, SAFETY, AND STRENGTH AS THE ORIGINAL DRUG.
              </p>
              <p className="text-base sm:text-lg font-bold leading-relaxed mb-6 uppercase tracking-wide">
                THEY ARE DEVELOPED AFTER THE PATENT PROTECTION OF THE ORIGINAL DRUG EXPIRES, TYPICALLY 20 YEARS 
                AFTER THE ORIGINAL DRUG WAS FIRST PATENTED.
              </p>
              <Link 
                to="/products?generic=true"
                className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                  text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center
                  shadow-[6px_6px_0px_0px_#000]
                  hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                  active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                  transition-all duration-100"
              >
                SHOP GENERIC MEDICINES
              </Link>
            </div>
            <div className="bg-black border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] text-white rotate-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 text-[#FFD93D]">KEY FACTS</h3>
              <div className="space-y-4">
                <div className="flex items-start border-b-2 border-white pb-3">
                  <span className="text-[#C4B5FD] mr-3 font-black text-xl">✓</span>
                  <span className="font-bold uppercase tracking-wide">SAME ACTIVE INGREDIENTS AS BRANDED DRUGS</span>
                </div>
                <div className="flex items-start border-b-2 border-white pb-3">
                  <span className="text-[#C4B5FD] mr-3 font-black text-xl">✓</span>
                  <span className="font-bold uppercase tracking-wide">MEET THE SAME QUALITY STANDARDS</span>
                </div>
                <div className="flex items-start border-b-2 border-white pb-3">
                  <span className="text-[#C4B5FD] mr-3 font-black text-xl">✓</span>
                  <span className="font-bold uppercase tracking-wide">UNDERGO RIGOROUS TESTING</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C4B5FD] mr-3 font-black text-xl">✓</span>
                  <span className="font-bold uppercase tracking-wide">APPROVED BY REGULATORY AUTHORITIES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#FFD93D] border-y-8 border-black py-12 sm:py-16 md:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-center mb-12 -rotate-1">
            BENEFITS OF GENERIC MEDICINES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-4 border-black p-6 text-center shadow-[6px_6px_0px_0px_#000]
                  hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200"
                style={{ transform: `rotate(${Math.random() > 0.5 ? 1 : -1}deg)` }}
              >
                <div className="text-4xl mb-4 bg-[#C4B5FD] border-4 border-black w-16 h-16 mx-auto flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-3">{benefit.title}</h3>
                <p className="font-bold text-sm uppercase tracking-wide leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-center mb-12 rotate-1">
            GENERIC VS BRANDED MEDICINES
          </h2>
          <div className="overflow-x-auto">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden min-w-[600px]">
              <div className="bg-[#FF6B6B] border-b-4 border-black">
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <h3 className="font-black uppercase tracking-widest text-sm text-white">ASPECT</h3>
                  </div>
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <h3 className="font-black uppercase tracking-widest text-sm text-white">GENERIC MEDICINES</h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-black uppercase tracking-widest text-sm text-white">BRANDED MEDICINES</h3>
                  </div>
                </div>
              </div>
              <div className="divide-y-4 divide-black">
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 sm:p-6 border-r-4 border-black bg-[#C4B5FD]">
                    <p className="font-black uppercase tracking-wide text-sm">ACTIVE INGREDIENTS</p>
                  </div>
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <p className="font-bold text-sm bg-[#C4B5FD] border-2 border-black px-2 py-1 inline-block">SAME AS BRANDED</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-bold text-sm">ORIGINAL FORMULATION</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 sm:p-6 border-r-4 border-black bg-[#C4B5FD]">
                    <p className="font-black uppercase tracking-wide text-sm">EFFECTIVENESS</p>
                  </div>
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <p className="font-bold text-sm bg-[#C4B5FD] border-2 border-black px-2 py-1 inline-block">EQUALLY EFFECTIVE</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-bold text-sm">PROVEN EFFECTIVENESS</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 sm:p-6 border-r-4 border-black bg-[#C4B5FD]">
                    <p className="font-black uppercase tracking-wide text-sm">PRICE</p>
                  </div>
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <p className="font-bold text-sm bg-[#C4B5FD] border-2 border-black px-2 py-1 inline-block">20-80% CHEAPER</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-bold text-sm bg-[#FF6B6B] text-white border-2 border-black px-2 py-1 inline-block">HIGHER COST</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 sm:p-6 border-r-4 border-black bg-[#C4B5FD]">
                    <p className="font-black uppercase tracking-wide text-sm">AVAILABILITY</p>
                  </div>
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <p className="font-bold text-sm bg-[#C4B5FD] border-2 border-black px-2 py-1 inline-block">WIDELY AVAILABLE</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-bold text-sm">BRAND DEPENDENT</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 sm:p-6 border-r-4 border-black bg-[#C4B5FD]">
                    <p className="font-black uppercase tracking-wide text-sm">REGULATORY APPROVAL</p>
                  </div>
                  <div className="p-4 sm:p-6 border-r-4 border-black">
                    <p className="font-bold text-sm bg-[#C4B5FD] border-2 border-black px-2 py-1 inline-block">FDA/WHO APPROVED</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-bold text-sm bg-[#C4B5FD] border-2 border-black px-2 py-1 inline-block">FDA/WHO APPROVED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#C4B5FD] border-y-8 border-black py-12 sm:py-16 md:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-center mb-12 -rotate-1">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]
                  hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200"
                style={{ transform: `rotate(${Math.random() > 0.5 ? 0.5 : -0.5}deg)` }}
              >
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4">{faq.question}</h3>
                <p className="font-bold leading-relaxed uppercase tracking-wide text-sm sm:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black border-y-8 border-black py-12 sm:py-16 md:py-24 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 rotate-1">
            READY TO SAVE ON YOUR MEDICINES?
          </h2>
          <div className="bg-[#FFD93D] border-4 border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#fff] -rotate-1 inline-block mb-8">
            <p className="text-lg sm:text-xl font-black uppercase tracking-wide text-black">
              EXPLORE OUR WIDE RANGE OF GENERIC MEDICINES AND START SAVING TODAY!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="bg-[#FFD93D] border-4 border-white font-black uppercase tracking-widest 
                text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center text-black
                shadow-[6px_6px_0px_0px_#fff]
                hover:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                transition-all duration-100"
            >
              BROWSE ALL PRODUCTS
            </Link>
            <Link 
              to="/products?trending=true"
              className="bg-white border-4 border-white font-black uppercase tracking-widest 
                text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center text-black
                shadow-[6px_6px_0px_0px_#fff]
                hover:bg-[#C4B5FD] hover:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                transition-all duration-100"
            >
              VIEW TRENDING
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}