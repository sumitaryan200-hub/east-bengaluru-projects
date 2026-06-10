import { ChevronDown, ChevronLeft, ChevronRight, Heart, MapPin, Phone, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppFooter from '../components/AppFooter'
import FloatingWidgets from '../components/FloatingWidgets'
import ScrollReveal from '../components/ScrollReveal'
import StaggerReveal from '../components/StaggerReveal'
import LeadForm from '../components/LeadForm'
import { getBuilderBySlug } from '../data/builders'
import { projects } from '../data/marketplace'

// ── Brochure Button + Modal ───────────────────────────────────────────────────
function BrochureButton({ projectName }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full flex items-center justify-center gap-2 h-[50px] rounded-[14px] border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[14px] font-black uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/70 transition-all duration-300"
      >
        📄 Download Brochure
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-[420px]"
            >
              <LeadForm propertyName={projectName} mode="brochure" onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Enquiry form ──────────────────────────────────────────────────────────────
// ── Enquiry form ──────────────────────────────────────────────────────────────
function EnquiryForm({ builder, project }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', config: '' })
  const primary = builder?.primaryColor || '#D4AF37'

  if (submitted) {
    return (
      <div className="rounded-[24px] border border-emerald-500/20 bg-white/90 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5 mx-auto text-emerald-400 text-3xl">✓</div>
        <div className="text-[20px] font-bold text-slate-900 font-luxury-sans">Thank You!</div>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">Our VIP concierge team will connect with you within 30 minutes.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-slate-50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl ">
      <div className="bg-white/90 border-b border-[#D4AF37]/20 py-5 text-center font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase text-[12px]">
        Talk to Our Luxury Expert
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Your Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Alexander Knight"
            className="mt-1 w-full rounded-[12px] border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-900 placeholder:text-slate-600 outline-none transition focus:border-[#D4AF37]/80 focus:ring-1 focus:ring-[#D4AF37]/30"
          />
        </div>
        
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Mobile Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="e.g. +91 98765 43210"
            className="mt-1 w-full rounded-[12px] border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-900 placeholder:text-slate-600 outline-none transition focus:border-[#D4AF37]/80 focus:ring-1 focus:ring-[#D4AF37]/30"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Preferred Configuration</label>
          <select
            value={form.config}
            onChange={(e) => setForm({ ...form, config: e.target.value })}
            className="mt-1 w-full rounded-[12px] border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-800 outline-none transition focus:border-[#D4AF37]/80 focus:ring-1 focus:ring-[#D4AF37]/30 cursor-pointer"
          >
            <option value="" className="bg-white text-slate-600">Select Configuration</option>
            {project.configurations.map((c) => (
              <option key={c.type} value={c.type} className="bg-white text-slate-900">{c.type} — {c.area}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="relative overflow-hidden w-full flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#AA7C11] text-[13.5px] font-black uppercase tracking-widest text-[#080B11] shadow-[0_4px_15px_rgba(212,175,55,0.22)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.45)] transition-all cursor-pointer border border-[#fbd45b]/20"
        >
          <motion.div
            initial={{ left: '-100%' }}
            whileHover={{ left: '200%' }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute top-0 h-full w-[40%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
          />
          <span>Request Callback</span>
        </button>

        <p className="text-center text-[11px] text-slate-500 leading-relaxed">
          By submitting, you agree to be contacted by Gautam Agrawal (RERA Agent)
        </p>
      </div>
    </div>
  )
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery({ images, projectName }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const preview = images.slice(0, 5)

  return (
    <>
      <div className="relative rounded-[24px] border border-slate-200 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
        {/* 1 large + 2x2 small grid */}
        <div className="grid h-[420px] grid-cols-3 grid-rows-2 gap-2">
          {/* Large hero — spans 2 columns and 2 rows */}
          <div className="col-span-2 row-span-2 overflow-hidden relative group">
            <motion.img
              src={preview[0]}
              alt={`${projectName} - Main`}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full cursor-pointer object-cover"
              onClick={() => { setModalIndex(0); setModalOpen(true) }}
            />
            {/* Ambient dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* 4 small thumbnails in a 2x2 grid on the right */}
          {preview.slice(1, 5).map((img, i) => (
            <div key={i} className="col-span-1 row-span-1 overflow-hidden relative group">
              <motion.img
                src={img}
                alt={`${projectName} ${i + 2}`}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full cursor-pointer object-cover"
                onClick={() => { setModalIndex(i + 1); setModalOpen(true) }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Floating View all button */}
        <button
          onClick={() => { setModalIndex(0); setModalOpen(true) }}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/85 px-5 py-2.5 text-[12.5px] font-bold text-slate-800 shadow-lg backdrop-blur-md transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer"
        >
          📷 View All {images.length} Bespoke Photos
        </button>
      </div>

      {/* Fullscreen modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-slate-700 p-3 text-white transition hover:bg-slate-800 hover:text-[#D4AF37]"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={() => setModalIndex((i) => Math.max(0, i - 1))}
            disabled={modalIndex === 0}
            className="absolute left-6 rounded-full bg-slate-700 p-3 text-white transition hover:bg-slate-800 disabled:opacity-20"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={images[modalIndex]}
            alt={projectName}
            className="max-h-[85vh] max-w-[90vw] rounded-[16px] object-contain shadow-2xl border border-slate-200"
          />
          <button
            onClick={() => setModalIndex((i) => Math.min(images.length - 1, i + 1))}
            disabled={modalIndex === images.length - 1}
            className="absolute right-6 rounded-full bg-slate-700 p-3 text-white transition hover:bg-slate-800 disabled:opacity-20"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-6 text-[13px] font-bold tracking-widest text-slate-600">
            {modalIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

// ── Project Detail Page ──────────────────────────────────────────────────────
function ProjectDetailPage() {
  const { projectSlug } = useParams()
  const project = projects.find((p) => p.slug === projectSlug)
  const [activeFloorPlan, setActiveFloorPlan] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-slate-900 font-luxury-sans">
        <div className="text-4xl animate-bounce">🏗️</div>
        <div className="text-[20px] font-bold text-slate-800">Project Not Found</div>
        <Link to="/" className="text-[14px] font-bold text-[#D4AF37] hover:underline">← Back to Home</Link>
      </div>
    )
  }

  const builder = getBuilderBySlug(project.builderSlug)
  const primary = builder?.primaryColor || '#D4AF37'
  const secondary = builder?.secondaryColor || '#AA7C11'
  const relatedProjects = projects
    .filter((p) => p.builderSlug === project.builderSlug && p.slug !== project.slug)
    .slice(0, 3)

  const allRelated = relatedProjects.length > 0
    ? relatedProjects
    : projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-white text-slate-900 font-luxury-sans">
      {/* Builder-branded header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-slate-50/80 backdrop-blur-xl shadow-lg">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Builder logo / name */}
          <Link to={`/builders/${builder?.slug || ''}`} className="flex items-center gap-3 group">
            {builder?.logo ? (
              <img
                src={builder.logo}
                alt={builder.name}
                className="h-[44px] w-auto object-contain transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div
                className="flex h-10 items-center rounded-[10px] px-5 text-[14px] font-black text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all duration-300"
              >
                {project.builder}
              </div>
            )}
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="tel:+918102422651"
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-black uppercase tracking-wider text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] shadow-[0_4px_12px_rgba(212,175,55,0.22)] hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] transition-all duration-300 cursor-pointer"
            >
              <Phone className="h-4 w-4 shrink-0 stroke-[2.5px]" /> Call Concierge
            </a>
            <button className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] bg-slate-100 cursor-pointer">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── Breadcrumb ── */}
        <div className="border-b border-slate-100 bg-white/45">
          <div className="mx-auto flex max-w-[1380px] items-center gap-1.5 px-4 py-3.5 text-[12.5px] text-slate-600 sm:px-6 lg:px-8">
            <Link to="/" className="transition hover:text-[#D4AF37]">Home</Link>
            <span className="text-slate-600">›</span>
            <Link to="/residential-properties-in-bangalore" className="transition hover:text-[#D4AF37]">Bangalore Properties</Link>
            <span className="text-slate-600">›</span>
            <span className="text-slate-800 font-medium truncate">{project.name}</span>
          </div>
        </div>

        <div className="mx-auto max-w-[1380px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

            {/* ── Left column ── */}
            <div className="min-w-0">

              {/* Gallery */}
              <ScrollReveal>
                <Gallery images={project.images} projectName={project.name} />
              </ScrollReveal>

              {/* Project title + builder brand bar */}
              <ScrollReveal delay={0.1}>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300 relative">
                  {/* Subtle top gold stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-[6px] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] shadow-md`}>
                          {project.badge}
                        </span>
                        <span className="rounded-[6px] border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">RERA: {project.rera}</span>
                      </div>
                      <h1 className="mt-4 text-[26px] font-black leading-snug text-slate-900 sm:text-[34px] tracking-tight font-luxury-serif">{project.name}</h1>
                      <div className="mt-2.5 flex items-center gap-2 text-[14px] font-medium text-slate-600">
                        <MapPin className="h-4.5 w-4.5 shrink-0 text-[#D4AF37]" />
                        {project.locality} · {project.landmark}
                      </div>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <div className="text-[26px] font-black text-[#D4AF37] tracking-tight">{project.priceLabel}</div>
                      <div className="text-[13px] text-slate-600 mt-0.5">{project.configurations[0]?.area} onwards</div>
                      <div className="mt-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Updated: {project.updated}</div>
                    </div>
                  </div>

                  {/* Key stats */}
                  <div className="mt-6.5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6.5 sm:grid-cols-4">
                    {[
                      { label: 'Configuration', value: project.beds.join(', ') },
                      { label: 'Possession', value: project.possessionDate },
                      { label: 'Total Units', value: project.totalUnits?.toLocaleString() || '—' },
                      { label: 'Project Area', value: project.projectArea || '—' },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-[14px] bg-white border border-slate-100 p-4 text-center hover:border-[#D4AF37]/35 transition duration-300 shadow-md">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</div>
                        <div className="mt-1.5 text-[15px] font-black text-[#D4AF37]">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Pricing & Configurations Cards */}
              <ScrollReveal delay={0.15}>
                <div className="mt-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">Pricing &amp; Configurations</h2>
                      <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mt-2" />
                    </div>
                  </div>
                  
                  <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.configurations.map((c) => (
                      <div
                        key={c.type}
                        className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/50 hover:shadow-[0_15px_30px_rgba(212,175,55,0.12)] transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Ambient gold glow on card hover */}
                        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#D4AF37]/3 blur-2xl group-hover:bg-[#D4AF37]/8 transition-all duration-300 pointer-events-none" />
                        
                        <div>
                          <div className="flex items-center justify-between mb-4.5">
                            <span className="rounded-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-[#D4AF37]">
                              {c.type}
                            </span>
                            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Carpet Area</span>
                          </div>
                          
                          <div className="text-[28px] font-black text-[#D4AF37] tracking-tight font-luxury-sans">
                            {c.price}
                          </div>
                          
                          <div className="text-[14px] text-slate-700 font-bold mt-1">
                            {c.area}
                          </div>
                        </div>

                        <div className="mt-6">
                          <button className="relative w-full overflow-hidden flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[11.5px] font-black uppercase tracking-widest text-[#080B11] shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:shadow-[0_8px_20px_rgba(212,175,55,0.35)] transition-all duration-300 cursor-pointer border border-[#fbd45b]/10">
                            <span>Request Details</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </StaggerReveal>
                </div>
              </ScrollReveal>

              {/* Project overview */}
              <ScrollReveal>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                  <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">About {project.name}</h2>
                  <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mb-5" />
                  <p className="text-[14.5px] leading-relaxed text-slate-700 font-medium">{project.overview}</p>

                  <div className="mt-6.5 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                    {[
                      { label: 'Developer', value: project.builder },
                      { label: 'Tower Config', value: project.towers },
                      { label: 'Status', value: project.status },
                      { label: 'Possession', value: project.possessionDate },
                      { label: 'Area', value: project.projectArea },
                      { label: 'RERA No.', value: project.rera?.substring(0, 20) + '…' },
                    ].map((item) => (
                      <div key={item.label} className="border-l-2 pl-4 border-[#D4AF37]/80 bg-white/2 hover:bg-[#D4AF37]/5 transition p-3.5 rounded-[12px] shadow-sm">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.label}</div>
                        <div className="mt-1 text-[13.5px] font-extrabold text-slate-800">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Key highlights */}
              <ScrollReveal>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                  <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">Key Highlights</h2>
                  <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mb-5" />
                  <StaggerReveal className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      `${project.towers}`,
                      `${project.totalUnits} Total Units`,
                      `${project.projectArea} Land Parcel`,
                      `RERA Approved`,
                      `${project.beds.join(' / ')} Configurations`,
                      `Possession: ${project.possessionDate}`,
                    ].map((h, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-[14px] bg-white border border-slate-100 p-4.5 h-full hover:border-[#D4AF37]/35 transition shadow-md">
                        <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full text-center text-[10px] font-black text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] leading-5">✓</span>
                        <span className="text-[13.5px] font-bold text-slate-700">{h}</span>
                      </div>
                    ))}
                  </StaggerReveal>
                </div>
              </ScrollReveal>

              {/* Floor plans */}
              <ScrollReveal>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                  <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">Floor Plans</h2>
                  <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mb-5" />

                  {/* Floor plan on request */}
                  {project.floorPlanOnRequest ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-[16px] border-2 border-dashed border-[#D4AF37]/30 bg-white py-12 px-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div>
                        <p className="text-[16px] font-bold text-slate-800">Floor Plan Available on Request</p>
                        <p className="mt-1 text-[13px] text-slate-500">Contact us to receive detailed floor plans for this project.</p>
                      </div>
                      <a
                        href={`https://wa.me/918102422651?text=Hi%2C%20I%20would%20like%20to%20request%20the%20floor%20plan%20for%20*${encodeURIComponent(project.name)}*.%0A%0AKindly%20share%20at%20your%20earliest%20convenience.%20Thank%20you!`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-[13px] font-bold text-white shadow transition hover:bg-[#1ebe5d]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.659 1.438 5.168L2.034 22l4.974-1.385A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd"/></svg>
                        Request Floor Plan
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2.5 mb-5">
                        {project.floorPlans?.map((fp, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveFloorPlan(i)}
                            className="rounded-full px-5 py-2.5 text-[12px] font-bold transition cursor-pointer border"
                            style={activeFloorPlan === i ? { background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)', color: '#080B11', borderColor: 'transparent', fontWeight: '900' } : { borderColor: 'rgba(212,175,55,0.2)', color: '#64748b', backgroundColor: 'white' }}
                          >
                            {fp.type}{fp.area && fp.area !== 'Full Site' ? ` · ${fp.area}` : ''}
                          </button>
                        ))}
                      </div>
                      {project.floorPlans?.[activeFloorPlan] && (
                        <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white p-4 shadow-inner relative group">
                          <img
                            src={project.floorPlans[activeFloorPlan].image}
                            alt={`${project.floorPlans[activeFloorPlan].type} floor plan`}
                            className="w-full max-h-[480px] object-contain transition duration-500 group-hover:scale-[1.01]"
                          />
                          {project.floorPlans[activeFloorPlan].price && (
                            <div className="mt-3 flex items-center justify-between px-1">
                              <span className="text-[13px] font-bold text-slate-600">{project.floorPlans[activeFloorPlan].type}</span>
                              <span className="text-[14px] font-black text-[#D4AF37]">{project.floorPlans[activeFloorPlan].price}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollReveal>

              {/* Amenities */}
              <ScrollReveal>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                  <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">Amenities</h2>
                  <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mb-5" />
                  <StaggerReveal className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-3 rounded-[14px] bg-white border border-slate-100 px-4.5 py-3.5 h-full hover:border-[#D4AF37]/35 transition shadow-md">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />
                        <span className="text-[13.5px] font-bold text-slate-700">{a}</span>
                      </div>
                    ))}
                  </StaggerReveal>
                </div>
              </ScrollReveal>

              {/* Locality advantages */}
              <ScrollReveal>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                  <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">Location &amp; Connectivity</h2>
                  <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mb-5" />
                  <StaggerReveal className="grid gap-3 sm:grid-cols-2">
                    {project.localityHighlights?.map((h) => (
                      <div key={h.label} className="flex items-center gap-4 rounded-[16px] border border-slate-100 bg-white p-4.5 h-full hover:border-[#D4AF37]/35 transition shadow-md">
                        <span className="text-2xl shrink-0 h-11 w-11 flex items-center justify-center bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">{h.icon}</span>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]/75">{h.label}</div>
                          <div className="mt-0.5 text-[14px] font-extrabold text-slate-800">{h.value}</div>
                        </div>
                      </div>
                    ))}
                  </StaggerReveal>
                </div>
              </ScrollReveal>

              {/* Builder overview */}
              {builder && (
                <ScrollReveal>
                  <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                    <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase">About {builder.name}</h2>
                    <div className="h-[2px] w-14 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mb-5" />
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      {builder.logo ? (
                        <div className="bg-white border border-slate-100 p-2 rounded-[14px] shrink-0">
                          <img
                            src={builder.logo}
                            alt={builder.name}
                            className="h-[56px] w-auto shrink-0 object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          className="flex h-12 shrink-0 items-center rounded-[10px] px-5 text-[14px] font-black text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]"
                        >
                          {builder.name.split(' ')[0]}
                        </div>
                      )}
                      <div>
                        <div className="text-[18px] font-black text-slate-900 font-luxury-sans">{builder.name}</div>
                        <div className="mt-1.5 flex gap-4 text-[12px] text-slate-600 font-bold">
                          <span>🏢 {builder.experience}+ Years Experience</span>
                          <span>Est. {builder.founded}</span>
                        </div>
                        <p className="mt-3.5 text-[13.5px] leading-relaxed text-slate-600 font-medium">{builder.description}</p>
                        <Link
                          to={`/builders/${builder.slug}`}
                          className="mt-4.5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] shadow-md hover:opacity-90 transition duration-300 cursor-pointer"
                        >
                          View All {builder.name} Projects →
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Related projects */}
              {allRelated.length > 0 && (
                <ScrollReveal>
                  <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                    <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase mb-5">
                      {relatedProjects.length > 0 ? `More by ${project.builder}` : 'Similar Projects in Bangalore'}
                    </h2>
                    <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {allRelated.map((p) => (
                        <Link key={p.slug} to={`/${p.slug}`} className="group overflow-hidden rounded-[18px] border border-slate-100 bg-white transition duration-300 hover:border-[#D4AF37]/35 hover:shadow-lg h-full flex flex-col justify-between">
                          <div className="overflow-hidden relative">
                            <img src={p.images[0]} alt={p.name} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                          </div>
                          <div className="p-4.5 flex-1 flex flex-col justify-between text-left">
                            <div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">{p.builder}</div>
                              <div className="mt-1 text-[16px] font-black text-slate-900 line-clamp-1 group-hover:text-[#D4AF37] transition duration-300">{p.name}</div>
                              <div className="mt-1 text-[12px] text-slate-600 font-bold">📍 {p.microMarket}</div>
                            </div>
                            <div className="mt-3.5 text-[15.5px] font-black text-slate-900 tracking-tight">{p.priceLabel}</div>
                          </div>
                        </Link>
                      ))}
                    </StaggerReveal>
                  </div>
                </ScrollReveal>
              )}

              {/* FAQ */}
              <ScrollReveal>
                <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/30 transition-all duration-300">
                  <h2 className="text-[20px] font-luxury-serif font-black tracking-widest text-[#D4AF37] uppercase mb-5">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {project.faqs?.map((faq, i) => (
                      <div key={i} className="overflow-hidden rounded-[14px] border border-slate-100 bg-white shadow-sm">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left text-[14px] font-bold text-slate-800 transition hover:bg-slate-100 cursor-pointer"
                        >
                          {faq.q}
                          <ChevronDown className={`h-4.5 w-4.5 shrink-0 text-[#D4AF37] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaq === i && (
                          <div className="border-t border-slate-100 bg-white/2 px-5 py-4 text-[13.5px] leading-relaxed text-slate-600 font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Right sticky column ── */}
            <ScrollReveal direction="right" delay={0.2} className="space-y-5 lg:sticky lg:top-[80px]">
              <div>
                <EnquiryForm builder={builder} project={project} />

                {/* Download Brochure Button */}
                <BrochureButton projectName={project.name} />

                {/* Quick info card */}
                <div className="mt-5 overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 p-5 shadow-2xl relative">
                  <div className="text-[11px] font-black uppercase tracking-widest text-[#D4AF37] mb-3 border-b border-slate-100 pb-2">Quick Information</div>
                  <div className="space-y-1 text-[13px]">
                    <div className="flex justify-between border-b border-slate-100 py-2.5 last:border-0">
                      <span className="text-slate-500 font-medium">Locality</span>
                      <span className="font-extrabold text-slate-800">{project.microMarket}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-2.5 last:border-0">
                      <span className="text-slate-500 font-medium">Configuration</span>
                      <span className="font-extrabold text-slate-800">{project.beds.join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-2.5 last:border-0">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span className="font-extrabold text-[#D4AF37]">{project.status}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-2.5 last:border-0">
                      <span className="text-slate-500 font-medium">Possession</span>
                      <span className="font-extrabold text-slate-800">{project.possessionDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-2.5 last:border-0">
                      <span className="text-slate-500 font-medium">Total Units</span>
                      <span className="font-extrabold text-slate-800">{project.totalUnits}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-2.5 last:border-0">
                      <span className="text-slate-500 font-medium">Project Area</span>
                      <span className="font-extrabold text-slate-800">{project.projectArea}</span>
                    </div>
                  </div>
                </div>

                {/* RERA trust badge */}
                <div className="mt-4 rounded-[16px] border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-5 text-[11px] text-slate-600 leading-relaxed shadow-lg">
                  <div className="mb-1.5 font-black uppercase tracking-widest text-[#D4AF37]">RERA Authorised Agent</div>
                  This project is listed by Gautam Agrawal, a RERA-authorised real estate agent. Pricing and availability are subject to change by the developer.
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </main>

      <FloatingWidgets />
      <AppFooter />
    </div>
  )
}

export default ProjectDetailPage
