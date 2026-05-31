import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitLead } from '../lib/supabase'

export default function LeadForm({ propertyName = '', onClose, mode = 'consultation' }) {
  // mode: 'consultation' | 'brochure'
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    property: propertyName,
    budget: '',
    message: mode === 'brochure' ? 'Requested Brochure Download' : '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('loading')
    try {
      await submitLead(form)
      setStatus('success')
      setTimeout(() => {
        if (onClose) onClose()
      }, 3000)
    } catch (err) {
      setStatus('error')
    }
  }

  const isBrochure = mode === 'brochure'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative w-full rounded-[24px] border border-[#D4AF37]/20 bg-[#080B11]/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
    >
      {/* Gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[24px] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white transition"
        >
          ✕
        </button>
      )}

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center gap-3"
          >
            <div className="text-5xl">📲</div>
            <h3 className="text-[22px] font-black text-[#D4AF37]">
              {isBrochure ? 'Brochure Request Received!' : 'Thank You!'}
            </h3>
            <p className="text-[14px] text-slate-300 max-w-[260px]">
              {isBrochure
                ? 'Hum aapka brochure jald hi WhatsApp pe bhej rahe hain! 🚀'
                : 'Our expert will call you back within 1 hour.'}
            </p>
            <div className="mt-2 rounded-[12px] border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-3 text-[13px] text-[#D4AF37]">
              📞 Koi sawaal? Call karein: <a href="tel:+918102422651" className="font-bold underline">8102422651</a>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{isBrochure ? '📄' : '📞'}</span>
                <h3 className="text-[18px] font-black text-slate-100">
                  {isBrochure ? 'Download Brochure' : 'Get Free Consultation'}
                </h3>
              </div>
              <p className="text-[12px] text-slate-400 ml-8">
                {isBrochure
                  ? 'Apna number do — brochure WhatsApp pe bhejte hain'
                  : 'Our expert will call you back within 1 hour'}
              </p>
            </div>

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name *"
              required
              className="w-full rounded-[12px] border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#D4AF37]/50 transition"
            />

            {/* Phone */}
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="WhatsApp Number *"
              required
              type="tel"
              className="w-full rounded-[12px] border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#D4AF37]/50 transition"
            />

            {/* Budget — only for consultation */}
            {!isBrochure && (
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-[12px] border border-white/10 bg-[#080B11] px-4 py-3 text-[14px] text-slate-300 outline-none focus:border-[#D4AF37]/50 transition"
              >
                <option value="">Select Budget Range</option>
                <option value="Under ₹1 Cr">Under ₹1 Cr</option>
                <option value="₹1 - 1.5 Cr">₹1 - 1.5 Cr</option>
                <option value="₹1.5 - 2.5 Cr">₹1.5 - 2.5 Cr</option>
                <option value="₹2.5 - 4 Cr">₹2.5 - 4 Cr</option>
                <option value="Above ₹4 Cr">Above ₹4 Cr</option>
              </select>
            )}

            {/* Property tag */}
            {propertyName && (
              <div className="rounded-[12px] border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2.5 text-[13px] text-[#D4AF37]">
                🏠 {isBrochure ? 'Brochure for:' : 'Interested in:'} <span className="font-bold">{propertyName}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full h-[50px] rounded-[14px] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[14px] font-black uppercase tracking-wider text-[#080B11] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)] transition disabled:opacity-60"
            >
              {status === 'loading'
                ? 'Please wait...'
                : isBrochure
                ? '📄 Send Brochure on WhatsApp'
                : '📞 Request Free Callback'}
            </button>

            {status === 'error' && (
              <p className="text-center text-[12px] text-rose-400">Something went wrong. Please try again.</p>
            )}

            <p className="text-center text-[11px] text-slate-500">🔒 Your data is safe. No spam, ever.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
