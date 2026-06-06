import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Google Sheets Script URL ──────────────────────────────────────────────────
// After deploying your Google Apps Script, paste the new URL here:
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwtx95EALy3UkmiQytsCwQ8zWCK-oeO_KSCsNBM_R4-1ZvvDSTX4SVfv86wkxhEx35b/exec'

const SUMIT_WHATSAPP = '918102422651'

async function submitLead(data) {
  const formData = new FormData()
  Object.entries(data).forEach(([k, v]) => formData.append(k, v || ''))
  try {
    await fetch(SHEET_URL, { method: 'POST', body: formData, mode: 'no-cors' })
  } catch(e) {
    // no-cors responses are opaque - ignore errors
  }
  return true
}

function openWhatsApp(name, phone, projectName, isBrochure) {
  const msg = isBrochure
    ? `Hi, I would like to request the brochure for *${projectName}*.\n\n*Name:* ${name}\n*Contact:* ${phone}\n\nKindly share the brochure at your earliest convenience. Thank you!`
    : `Hi, I am interested in *${projectName}* and would like to know more details.\n\n*Name:* ${name}\n*Contact:* ${phone}\n\nRequest you to please get in touch. Thank you!`
  const url = `https://wa.me/${SUMIT_WHATSAPP}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank')
}

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
    // Open WhatsApp FIRST (must be synchronous with user click — browsers block popups after await)
    openWhatsApp(form.name, form.phone, form.property, isBrochure)
    // Save lead to Google Sheets (fire-and-forget, no-cors)
    submitLead({ ...form, source: isBrochure ? 'brochure' : 'consultation' })
    setStatus('success')
    setTimeout(() => {
      if (onClose) onClose()
    }, 4000)
  }

  const isBrochure = mode === 'brochure'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative w-full rounded-[24px] border border-[#D4AF37]/20 bg-white/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.10)] backdrop-blur-2xl"
    >
      {/* Gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[24px] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:text-white transition"
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
            <div className="text-5xl">✅</div>
            <h3 className="text-[22px] font-black text-[#D4AF37]">
              {isBrochure ? 'WhatsApp Khul Gaya!' : 'Thank You!'}
            </h3>
            <p className="text-[14px] text-slate-700 max-w-[280px]">
              {isBrochure
                ? 'WhatsApp pe message ready hai — bas Send dabao. Sumit bhai brochure bhej denge! 🚀'
                : 'WhatsApp pe message ready hai — bas Send dabao. Expert jald hi contact karenge!'}
            </p>
            <a
              href={`https://wa.me/${SUMIT_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center gap-2 rounded-[12px] bg-[#25D366] px-5 py-3 text-[14px] font-black text-white shadow-lg hover:bg-[#1fba57] transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp pe Bhejo
            </a>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{isBrochure ? '📄' : '📞'}</span>
                <h3 className="text-[18px] font-black text-slate-900">
                  {isBrochure ? 'Download Brochure' : 'Get Free Consultation'}
                </h3>
              </div>
              <p className="text-[12px] text-slate-600 ml-8">
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
              className="w-full rounded-[12px] border border-slate-200 bg-slate-100 px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#D4AF37]/70 transition"
            />

            {/* Phone */}
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="WhatsApp Number *"
              required
              type="tel"
              className="w-full rounded-[12px] border border-slate-200 bg-slate-100 px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#D4AF37]/70 transition"
            />

            {/* Budget — only for consultation */}
            {!isBrochure && (
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-700 outline-none focus:border-[#D4AF37]/70 transition"
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
              <p className="text-center text-[12px] text-rose-400">Kuch error hua. Please dobara try karein ya directly WhatsApp karein: 8102422651</p>
            )}

            <p className="text-center text-[11px] text-slate-500">🔒 Your data is safe. No spam, ever.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
