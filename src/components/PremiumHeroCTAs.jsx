import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, Sparkles, X, Phone, User, Send, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// ─── MAGNETIC MOUSE WRAPPER ──────────────────────────────────────────────────
function MagneticWrapper({ children, range = 80 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Configure high-fidelity spring motion for premium organic feel
  const springConfig = { stiffness: 120, damping: 12, mass: 0.4 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Distance between mouse and button center
    const distX = clientX - centerX
    const distY = clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < range) {
      // Pull strength becomes stronger as mouse gets closer, capped at 15px displacement
      const pull = 0.28
      x.set(distX * pull)
      y.set(distY * pull)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// ─── SHINE SWEEP COMPONENT ───────────────────────────────────────────────────
function ShineSweep() {
  return (
    <motion.div
      initial={{ left: '-100%' }}
      animate={{ left: '200%' }}
      transition={{
        repeat: Infinity,
        repeatDelay: 3.5,
        duration: 1.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="absolute top-0 h-full w-[40%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-10"
    />
  )
}

// ─── MAIN CTA BUTTONS COMPONENT ──────────────────────────────────────────────
export default function PremiumHeroCTAs() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', timeSlot: 'As soon as possible' })
  const [hoveredButton, setHoveredButton] = useState(null)

  // Block background scroll when consultation modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [modalOpen])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setFormSubmitted(true)
    setTimeout(() => {
      // Auto close modal after showing success animation
      setModalOpen(false)
      setFormSubmitted(false)
      setFormData({ name: '', phone: '', timeSlot: 'As soon as possible' })
    }, 2800)
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.5 }
          }
        }}
        className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-6 lg:justify-start"
      >
        {/* ── BUTTON 1: EXPLORE PROPERTIES (Luxury Gold Metallic) ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          // Idle vertical floating (bobbing) animation to evoke anti-gravity
          animate={{ y: hoveredButton === 0 ? 0 : [0, -5, 0] }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 5.5,
              ease: "easeInOut"
            }
          }}
          className="w-full sm:w-auto"
        >
          <MagneticWrapper>
            <motion.button
              onClick={() => navigate('/residential-properties-in-bangalore')}
              onHoverStart={() => setHoveredButton(0)}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative overflow-hidden w-full sm:w-auto flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#e3b836] via-[#D4AF37] to-[#aa831b] px-9 text-[13.5px] font-black uppercase tracking-[0.15em] text-[#080B11] shadow-[0_6px_25px_rgba(212,175,55,0.22)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.48)] border border-[#fbd45b]/30 z-20 cursor-pointer"
            >
              {/* Shine Sweep Overlay */}
              <ShineSweep />
              
              <span className="relative z-10 font-black">Explore Properties</span>
              
              {/* Animated Arrow Icon */}
              <motion.span
                animate={{ x: hoveredButton === 0 ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="relative z-10 shrink-0"
              >
                <ArrowRight className="h-4.5 w-4.5 stroke-[3px]" />
              </motion.span>
            </motion.button>
          </MagneticWrapper>
        </motion.div>

        {/* ── BUTTON 2: SCHEDULE VISIT (Cinematic Glassmorphism) ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          animate={{ y: hoveredButton === 1 ? 0 : [0, -5, 0] }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 5.5,
              ease: "easeInOut",
              delay: 0.6 // Asynchronous delay for floating offset
            }
          }}
          className="w-full sm:w-auto"
        >
          <MagneticWrapper>
            <motion.a
              href="tel:+919999999999"
              onHoverStart={() => setHoveredButton(1)}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.04, borderColor: 'rgba(212,175,55,0.5)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative overflow-hidden w-full sm:w-auto flex h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/4 px-9 text-[13.5px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.18)] transition-all z-20 cursor-pointer"
            >
              {/* Localized hover glow background */}
              {hoveredButton === 1 && (
                <motion.div
                  layoutId="glassGlow"
                  className="absolute inset-0 bg-[#D4AF37]/5 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <Calendar className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
              <span className="font-extrabold text-slate-100">Schedule Visit</span>
            </motion.a>
          </MagneticWrapper>
        </motion.div>

        {/* ── BUTTON 3: GET FREE CONSULTATION (Deep Gold Aura Pulsing) ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          animate={{ y: hoveredButton === 2 ? 0 : [0, -5, 0] }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 5.5,
              ease: "easeInOut",
              delay: 1.2 // Asynchronous floating offset
            }
          }}
          className="w-full sm:w-auto"
        >
          <MagneticWrapper>
            <motion.button
              onClick={() => setModalOpen(true)}
              onHoverStart={() => setHoveredButton(2)}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative overflow-hidden w-full sm:w-auto flex h-14 items-center justify-center gap-3 rounded-full bg-[#080B11]/92 px-9 text-[13.5px] font-extrabold uppercase tracking-[0.12em] text-[#D4AF37] border border-[#D4AF37]/35 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/80 z-20 cursor-pointer"
            >
              {/* Outer pulsing glow aura behind the button */}
              <motion.div
                animate={{
                  opacity: hoveredButton === 2 ? [0.4, 0.8, 0.4] : [0.15, 0.35, 0.15],
                  scale: hoveredButton === 2 ? [0.98, 1.04, 0.98] : [0.95, 1.01, 0.95]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 -z-10 rounded-full bg-[#D4AF37]/15 blur-md"
              />
              
              <Sparkles className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <span className="font-extrabold">Free Consultation</span>
            </motion.button>
          </MagneticWrapper>
        </motion.div>
      </motion.div>

      {/* ── LUXURY CONSULTATION MODAL OVERLAY ────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#040609]/85 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[500px] overflow-hidden rounded-[28px] border border-[#D4AF37]/30 bg-[#080B11]/95 p-8 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.15)] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-6 top-6 rounded-full border border-white/10 p-2 text-slate-400 hover:border-white/20 hover:text-white transition duration-200"
              >
                <X className="h-4 w-4" />
              </button>

              {!formSubmitted ? (
                <>
                  {/* Decorative golden ambient spot */}
                  <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-[40px] pointer-events-none" />

                  {/* Header */}
                  <div className="mb-6 flex flex-col items-center text-center mt-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
                      <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-luxury-serif text-[24px] font-semibold text-slate-100 tracking-tight">
                      Request <span className="text-gold-gradient italic">Concierge</span> Call
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-slate-400 max-w-[340px]">
                      Provide your details below to schedule an exclusive consultation with our luxury real estate specialists.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/60" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alexander Knight"
                          className="h-12 w-full rounded-[14px] border border-white/10 bg-[#080B11] pl-11 pr-4 text-[14.5px] text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#D4AF37]/65 focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/60" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="h-12 w-full rounded-[14px] border border-white/10 bg-[#080B11] pl-11 pr-4 text-[14.5px] text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#D4AF37]/65 focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Preferred Consultation Time</label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="h-12 w-full rounded-[14px] border border-white/10 bg-[#080B11] px-4 text-[14.5px] text-slate-200 outline-none transition focus:border-[#D4AF37]/65 focus:ring-1 focus:ring-[#D4AF37]/30 cursor-pointer"
                      >
                        <option value="As soon as possible" className="bg-[#080B11]">As soon as possible</option>
                        <option value="Today Evening (4 PM - 7 PM)" className="bg-[#080B11]">Today Evening (4 PM - 7 PM)</option>
                        <option value="Tomorrow Morning (10 AM - 1 PM)" className="bg-[#080B11]">Tomorrow Morning (10 AM - 1 PM)</option>
                        <option value="Tomorrow Afternoon (1 PM - 4 PM)" className="bg-[#080B11]">Tomorrow Afternoon (1 PM - 4 PM)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 flex h-13 w-full items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[13.5px] font-black uppercase tracking-widest text-[#080B11] shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:opacity-95 transition cursor-pointer"
                    >
                      <span>Request Callback</span>
                      <Send className="h-3.8 w-3.8 stroke-[2.5px]" />
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </motion.div>
                  
                  <h3 className="font-luxury-serif text-[24px] font-semibold text-slate-100 tracking-tight">
                    Thank You, <span className="text-[#D4AF37] italic font-medium">{formData.name.split(' ')[0]}</span>
                  </h3>
                  
                  <p className="mt-3 text-[14.5px] leading-7 text-slate-300 max-w-[320px]">
                    Your VIP callback request has been received. Our luxury real estate concierge will connect with you <span className="text-[#D4AF37] font-semibold">{formData.timeSlot === 'As soon as possible' ? 'shortly' : 'at your preferred time'}</span>.
                  </p>
                  
                  <div className="mt-8 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]/50">
                    Premium Real Estate Concierge Services
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
