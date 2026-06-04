import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import FloatingWidgets from '../components/FloatingWidgets'
import ScrollReveal from '../components/ScrollReveal'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100">
      <AppHeader />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-[#D4AF37]/10 py-24">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37] opacity-[0.04] blur-[120px] pointer-events-none" />
          <div className="relative mx-auto max-w-[900px] px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-5 py-2 text-[11px] font-black uppercase tracking-widest text-[#D4AF37] mb-6">
                📞 Get In Touch
              </div>
              <h1 className="text-[38px] font-bold leading-tight text-slate-100 sm:text-[52px]">
                Contact <span className="italic text-[#D4AF37]">EastProject</span>
              </h1>
              <p className="mt-4 text-[16px] leading-8 text-slate-400 max-w-[600px] mx-auto">
                Your trusted real estate partner in East Bangalore. We help you find the perfect luxury home from the best developers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Contact Cards ── */}
        <section className="mx-auto max-w-[1100px] px-4 py-20 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* WhatsApp */}
            <ScrollReveal delay={0}>
              <a
                href="https://wa.me/918102422651?text=Hi, I would like to enquire about a property."
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-4 rounded-[24px] border border-slate-800 bg-[#0f131a] p-8 text-center transition-all duration-300 hover:border-[#25D366]/40 hover:shadow-[0_8px_30px_rgba(37,211,102,0.1)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 border border-[#25D366]/20 group-hover:bg-[#25D366]/20 transition">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">WhatsApp</div>
                  <div className="text-[20px] font-black text-slate-100">+91 81024 22651</div>
                  <div className="mt-2 text-[13px] text-slate-400">Message us anytime</div>
                </div>
                <span className="mt-2 rounded-full bg-[#25D366]/10 px-4 py-1.5 text-[12px] font-bold text-[#25D366] group-hover:bg-[#25D366]/20 transition">
                  Chat Now →
                </span>
              </a>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.1}>
              <a
                href="tel:+918102422651"
                className="group flex flex-col items-center gap-4 rounded-[24px] border border-slate-800 bg-[#0f131a] p-8 text-center transition-all duration-300 hover:border-[#D4AF37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 transition">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-[#D4AF37]" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.55 6.55l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Call Us</div>
                  <div className="text-[20px] font-black text-slate-100">+91 81024 22651</div>
                  <div className="mt-2 text-[13px] text-slate-400">Mon – Sat, 9am – 7pm</div>
                </div>
                <span className="mt-2 rounded-full bg-[#D4AF37]/10 px-4 py-1.5 text-[12px] font-bold text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition">
                  Call Now →
                </span>
              </a>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={0.2}>
              <a
                href="mailto:sumitaryan200@gmail.com"
                className="group flex flex-col items-center gap-4 rounded-[24px] border border-slate-800 bg-[#0f131a] p-8 text-center transition-all duration-300 hover:border-sky-500/30 hover:shadow-[0_8px_30px_rgba(14,165,233,0.08)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500/20 transition">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-sky-400" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Email</div>
                  <div className="text-[16px] font-black text-slate-100 break-all">sumitaryan200@gmail.com</div>
                  <div className="mt-2 text-[13px] text-slate-400">We reply within 24 hours</div>
                </div>
                <span className="mt-2 rounded-full bg-sky-500/10 px-4 py-1.5 text-[12px] font-bold text-sky-400 group-hover:bg-sky-500/20 transition">
                  Email Us →
                </span>
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* ── About Us ── */}
        <section className="border-t border-slate-800 bg-[#0a0d14] py-20">
          <div className="mx-auto max-w-[900px] px-4 sm:px-6">
            <ScrollReveal>
              <div className="rounded-[28px] border border-slate-800 bg-[#0f131a] p-8 sm:p-12">
                <div className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#D4AF37]">About EastProject</div>
                <h2 className="text-[28px] font-bold text-slate-100 sm:text-[34px]">
                  Your Trusted Guide to <span className="italic text-[#D4AF37]">East Bangalore</span> Real Estate
                </h2>
                <div className="mt-6 space-y-4 text-[15px] leading-8 text-slate-400">
                  <p>
                    EastProject is a RERA-authorised real estate advisory firm specialising exclusively in luxury residential properties across East Bangalore — including Whitefield, Sarjapur Road, Hoskote, Budigere Cross, and surrounding micro-markets.
                  </p>
                  <p>
                    We partner with Bangalore's most reputed developers — Prestige, Sobha, Godrej, Brigade, Birla, Puravankara, and 20+ more — to bring you verified, up-to-date listings with transparent pricing and no hidden charges.
                  </p>
                  <p>
                    Whether you are a first-time home buyer, an NRI investor, or looking to upgrade your lifestyle, our expert team provides end-to-end assistance — from site visits and RERA verification to home loan guidance and documentation support.
                  </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-3">
                  {[
                    { icon: '🏢', stat: '99+', label: 'Verified Projects' },
                    { icon: '🏗️', stat: '25+', label: 'Top Builders' },
                    { icon: '📍', stat: '22+', label: 'Prime Localities' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[16px] border border-slate-700 bg-[#080B11] p-5 text-center">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="mt-3 text-[28px] font-black text-[#D4AF37]">{item.stat}</div>
                      <div className="mt-1 text-[12px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/residential-properties-in-bangalore"
                    className="flex h-[52px] flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[14px] font-black uppercase tracking-wider text-[#080B11] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)] transition"
                  >
                    Browse Properties
                  </Link>
                  <a
                    href="https://wa.me/918102422651?text=Hi, I would like to schedule a site visit."
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[14px] font-black text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
                  >
                    Schedule Site Visit
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <FloatingWidgets />
      <AppFooter />
    </div>
  )
}
