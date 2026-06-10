import { ChevronLeft, ChevronRight, Search, Star, ShieldCheck, ArrowRight, Award } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import FloatingWidgets from '../components/FloatingWidgets'
import PremiumHeroCTAs from '../components/PremiumHeroCTAs'
import ScrollReveal from '../components/ScrollReveal'
import StaggerReveal from '../components/StaggerReveal'
import { getBuildersWithProjectCount } from '../data/builders'
import { areaPills, bangaloreLocalities, categoryCards, projects } from '../data/marketplace'

// ─── Search box with integrated dropdown (Glassmorphism & Luxury styling) ────
function HeroSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [selectedLocality, setSelectedLocality] = useState('Bangalore')
  const [localityOpen, setLocalityOpen] = useState(false)
  const ref = useRef(null)

  const searchResults = query.length > 1
    ? [
        ...projects.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.locality.toLowerCase().includes(query.toLowerCase()) ||
          p.builder.toLowerCase().includes(query.toLowerCase()),
        ).map((p) => ({ type: 'Project', label: p.name, sub: p.locality, slug: p.slug })),
        ...bangaloreLocalities
          .filter((l) => l.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 3)
          .map((l) => ({ type: 'Locality', label: l, sub: 'Bangalore', slug: null })),
      ].slice(0, 8)
    : []

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setFocused(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mt-10 max-w-[980px] px-4"
      ref={ref}
    >
      <div className="overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-white/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-2xl ">
        <div className="grid lg:grid-cols-[220px_1fr_auto]">
          {/* Locality selector */}
          <div className="relative border-b border-slate-200 lg:border-b-0 lg:border-r lg:border-slate-200">
            <button
              onClick={() => setLocalityOpen((v) => !v)}
              className="flex h-[72px] w-full items-center justify-between px-6 text-left transition hover:bg-white/5"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/75">Location</div>
                <div className="mt-0.5 text-[15px] font-semibold text-slate-900">{selectedLocality}</div>
              </div>
              <ChevronRight className="h-4 w-4 rotate-90 text-[#D4AF37]" />
            </button>
            <AnimatePresence>
              {localityOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[76px] z-30 w-[280px] overflow-hidden rounded-[16px] border border-[#D4AF37]/20 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                >
                  <div className="max-h-[300px] overflow-y-auto p-4">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/65">Popular Localities</div>
                    {bangaloreLocalities.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setSelectedLocality(loc); setLocalityOpen(false) }}
                        className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-slate-700 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                      >
                        📍 {loc}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search input */}
          <div className="relative">
            <label className="flex h-[72px] items-center gap-3 px-6">
              <Search className="h-4 w-4 shrink-0 text-[#D4AF37]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                placeholder="Search builder, project, micro-market..."
                className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>
            {/* Dropdown */}
            <AnimatePresence>
              {focused && searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-[76px] z-30 overflow-hidden rounded-[16px] border border-[#D4AF37]/25 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                >
                  {searchResults.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (item.slug) navigate(`/${item.slug}-eastproject`)
                        else navigate('/residential-properties-in-bangalore')
                        setFocused(false)
                        setQuery('')
                      }}
                      className="flex w-full items-center gap-4 border-b border-slate-100 px-6 py-4 text-left transition last:border-0 hover:bg-white/5"
                    >
                      <span className={`shrink-0 rounded-[6px] px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${
                        item.type === 'Project' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {item.type}
                      </span>
                      <div>
                        <div className="text-[14px] font-bold text-slate-900">{item.label}</div>
                        <div className="text-[12px] text-slate-600">{item.sub}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search button */}
          <div className="flex items-center px-4 py-3 lg:py-0">
            <button
              onClick={() => navigate('/residential-properties-in-bangalore')}
              className="h-[52px] w-full rounded-[14px] bg-[#D4AF37] px-8 text-[14px] font-black uppercase tracking-widest text-[#080B11] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition hover:bg-[#AA7C11] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] lg:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Locality pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {areaPills.map((loc) => (
          <Link
            key={loc}
            to="/residential-properties-in-bangalore"
            className="rounded-[10px] border border-slate-100 bg-white/40 px-4.5 py-2.5 text-[12.5px] text-slate-700 backdrop-blur-sm transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-white/70"
          >
            📍 {loc}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Property Card — Luxury Redesign ────────────────────────────────────────
function StarRating({ rating = 4.1 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-3.5 w-3.5" fill={i <= Math.round(rating) ? '#D4AF37' : '#334155'}>
          <path d="M6 0l1.5 4H12L8.5 6.5l1.5 4L6 8 2 10.5l1.5-4L0 4h4.5z" />
        </svg>
      ))}
    </div>
  )
}

function PropertyCard({ project }) {
  const [wishlist, setWishlist] = useState(false)
  const [compared, setCompared] = useState(false)
  const [hovered, setHovered] = useState(false)
  const areaText = project.configurations[0]?.area || 'Area on Request'
  const bhkText = project.beds.join(', ')

  // Dynamic tag mapping based on project details
  const getBadgeStyle = () => {
    if (project.badge === 'Ready to Move') {
      return {
        text: 'Ready to Move',
        classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
      }
    }
    if (project.badge === 'New Launch' || project.isNew) {
      return {
        text: 'New Launch',
        classes: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
      }
    }
    if (project.priceValue >= 1.5 || project.slug.includes('raintree') || project.slug.includes('neopolis')) {
      return {
        text: 'Signature Luxury',
        classes: 'border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/20 to-[#AA7C11]/20 text-[#D4AF37] font-extrabold '
      }
    }
    return {
      text: 'Hot Deal',
      classes: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
    }
  }

  const badge = getBadgeStyle()

  return (
    <motion.article 
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`flex h-full flex-col overflow-hidden rounded-[24px] border bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        hovered 
          ? 'border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(212,175,55,0.14)] ' 
          : 'border-slate-200'
      }`}
    >
      {/* Property Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] z-10">
        <motion.img
          src={project.images[0]}
          alt={project.name}
          animate={{ scale: hovered ? 1.06 : 1.0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-[#080B11]/15 to-transparent pointer-events-none" />

        {/* Animated Shine Sweep on Hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '200%' }}
              exit={{ left: '200%' }}
              transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute top-0 h-full w-[40%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* Pinned Badges & Interactive Overlays */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start w-full">
            {/* Tag Badge */}
            <span className={`inline-flex rounded-full border px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${badge.classes}`}>
              {badge.text}
            </span>

            {/* Top-Right Interactive Buttons (Wishlist & Compare) */}
            <div className="flex gap-2 pointer-events-auto">
              {/* Compare Button */}
              <motion.button
                onClick={() => setCompared(!compared)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition ${
                  compared 
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]' 
                    : 'bg-white/70 border-slate-200 text-slate-600 hover:text-white hover:border-white/30'
                }`}
                title="Compare Property"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 3h5v5M8 21H3v-5M12 3v18M3 12h18" />
                </svg>
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                onClick={() => setWishlist(!wishlist)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition ${
                  wishlist 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                    : 'bg-white/70 border-slate-200 text-slate-600 hover:text-[#D4AF37] hover:border-white/30'
                }`}
                title="Add to Wishlist"
              >
                <svg viewBox="0 0 24 24" className={`h-4.5 w-4.5 transition-transform duration-300 ${wishlist ? 'fill-rose-500 text-rose-500 scale-110' : 'fill-none text-slate-600'}`} stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.button>
            </div>
          </div>

          <div className="flex justify-between items-end w-full">
            {/* Rating Indicator */}
            <div className="flex items-center gap-1.5 rounded-[10px] bg-white/75 px-3 py-1.5 backdrop-blur-md border border-slate-100 shadow-md">
              <span className="text-[#D4AF37] text-[11px] font-black">★</span>
              <span className="text-white text-[12px] font-bold">{project.rating || '4.8'}</span>
              <span className="text-slate-600 text-[10px] font-semibold">(24 reviews)</span>
            </div>

            {/* Photo Count Indicator */}
            <div className="flex items-center gap-1 rounded-[10px] bg-white/75 px-2.5 py-1.5 backdrop-blur-md border border-slate-100 shadow-md text-[10.5px] font-bold text-slate-700">
              <span>📷</span>
              <span>1/{project.images.length || 5}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        {/* Builder Name */}
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/90 mb-1.5">{project.builder}</div>

        {/* Property Name */}
        <h3 className="text-[20px] font-extrabold leading-snug text-slate-900 line-clamp-1 hover:text-[#D4AF37] transition duration-300">{project.name}</h3>

        {/* Location Row */}
        <div className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0 fill-none stroke-[#D4AF37]/75" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {project.microMarket}, East Bangalore
        </div>

        {/* Config & Space Specifications */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-100 py-3.5 text-slate-700">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Configuration</div>
            <div className="mt-0.5 text-[13.5px] font-extrabold text-slate-800">{bhkText}</div>
          </div>
          <div className="border-l border-slate-100 pl-4">
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Super Area</div>
            <div className="mt-0.5 text-[13.5px] font-extrabold text-slate-800">{areaText.replace('Sq.ft', 'sq.ft')}</div>
          </div>
        </div>

        {/* Core Amenities Custom Icons Row */}
        <div className="mt-4 flex items-center justify-between gap-2 bg-slate-100 rounded-[12px] px-4.5 py-3 border border-slate-100">
          <span className="text-[9.5px] font-black uppercase tracking-widest text-[#D4AF37]/80">Amenities</span>
          <div className="flex gap-2.5">
            {/* Swimmimg Pool */}
            <span className="h-7 w-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center" title="Swimming Pool">
              <svg viewBox="0 0 24 24" className="h-3.8 w-3.8 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 6c.6 0 1.2-.2 1.6-.6L5 4.3c.8-.8 2-.8 2.8 0l1.4 1.1c.4.4 1 .6 1.6.6s1.2-.2 1.6-.6" />
                <path d="M2 12c.6 0 1.2-.2 1.6-.6l1.4-1.1c.8-.8 2-.8 2.8 0l1.4 1.1c.4.4 1 .6 1.6.6" />
              </svg>
            </span>
            {/* Gym */}
            <span className="h-7 w-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center" title="Fitness Centre">
              <svg viewBox="0 0 24 24" className="h-3.8 w-3.8 text-[#D4AF37]" fill="currentColor">
                <path d="M6.5 5h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm11 0h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 11h6v2H9z" />
              </svg>
            </span>
            {/* Clubhouse */}
            <span className="h-7 w-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center" title="Luxury Clubhouse">
              <svg viewBox="0 0 24 24" className="h-3.8 w-3.8 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 21h18M3 10h18M5 21V10M19 21V10M9 21v-4a3 3 0 0 1 6 0v4" />
              </svg>
            </span>
            {/* Parking */}
            <span className="h-7 w-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center" title="Reserved Parking">
              <svg viewBox="0 0 24 24" className="h-3.8 w-3.8 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
              </svg>
            </span>
            {/* Security */}
            <span className="h-7 w-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center" title="24x7 Security">
              <svg viewBox="0 0 24 24" className="h-3.8 w-3.8 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Pricing Segment */}
        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Valuation</span>
          <div className="text-[22px] font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)]">
            {project.priceLabel}
          </div>
        </div>

        {/* High-Fidelity Action Buttons */}
        <div className="mt-6 flex gap-2 pt-2">
          {/* View Details CTA */}
          <Link
            to={`/${project.slug}-eastproject`}
            className="flex h-[46px] flex-1 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[12px] font-bold text-slate-800 transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] cursor-pointer"
          >
            View Details
          </Link>
          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/918102422651?text=${encodeURIComponent(`Hi, I am interested in *${project.name}* (${project.microMarket}).\n\n*Price:* ${project.priceLabel}\n*Config:* ${project.beds.join(', ')}\n\nKindly share more details. Thank you!`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex h-[46px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-[12px] font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)] transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Builder Carousel — Luxury Redesign ──────────────────────────────────────
function BuilderCarousel() {
  const allBuilders = getBuildersWithProjectCount(projects)
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  const [visibleCount, setVisibleCount] = useState(3)
  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])
  const max = Math.max(0, allBuilders.length - visibleCount)

  function next() { setIndex((i) => Math.min(i + 1, max)) }
  function prev() { setIndex((i) => Math.max(i - 1, 0)) }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i >= max ? 0 : i + 1))
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [max])

  return (
    <section className="bg-white border-t border-slate-100 py-20">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-luxury-serif font-semibold text-slate-900 sm:text-[38px] tracking-tight">
              Prestige <span className="text-gold-gradient italic">Builders</span>
            </h2>
            <p className="mt-1.5 text-[14px] text-slate-600">Discover projects from Bangalore's most trusted luxury developers</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={prev} 
              disabled={index === 0} 
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 disabled:hover:text-slate-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={next} 
              disabled={index >= max} 
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 disabled:hover:text-slate-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${index * (100 / visibleCount)}% - ${index * 24 / visibleCount}px))` }}
          >
            {allBuilders.map((b) => (
              <motion.div
                key={b.slug}
                whileHover={{ y: -5 }}
                className="flex w-full shrink-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 shadow-md sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {/* Color top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />

                <div className="p-6">
                  <div className="text-[19px] font-bold text-slate-900">{b.name}</div>

                  {/* Stars + stats */}
                  <div className="mt-2.5 flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(b.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-700'}`} />
                    ))}
                    <span className="text-[13px] font-bold text-[#D4AF37] ml-1">{b.rating}</span>
                  </div>

                  <div className="mt-5 flex gap-6 border-t border-slate-200 pt-4 text-center">
                    <div>
                      <div className="text-[18px] font-black text-slate-900">{b.experience}+</div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Years Exp.</div>
                    </div>
                    <div className="border-l border-slate-200 pl-6">
                      <div className="text-[18px] font-black text-[#D4AF37]">{b.projectCount > 0 ? b.projectCount : '—'}</div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{b.projectCount > 0 ? 'Projects' : 'Coming Soon'}</div>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-3 text-[13px] leading-6 text-slate-600">{b.description}</p>
                </div>

                <div className="mt-auto border-t border-slate-200/60 px-6 py-5">
                  <Link
                    to={`/builders/${b.slug}`}
                    className="flex h-[42px] w-full items-center justify-center rounded-[10px] text-[13px] font-bold uppercase tracking-wider text-[#080B11] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:opacity-90 transition"
                  >
                    View Projects
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HomePage REDESIGN — Dark Luxury Cinematic Experience ───────────────────
function HomePage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('residential')
  const [activeTab, setActiveTab] = useState('All')
  const containerRef = useRef(null)

  // 1. Spring-loaded coordinate values for smooth organic 3D parallax trailing
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Luxury soft physical springs
  const springConfig = { stiffness: 60, damping: 24, mass: 0.6 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return // Disable on tablet/mobile for performance
    const x = (e.clientX - window.innerWidth / 2) / 25
    const y = (e.clientY - window.innerHeight / 2) / 25
    mouseX.set(x)
    mouseY.set(y)
  }

  // Linear transformations mapping spring positions to distinct spatial depths
  const card1X = useTransform(springX, (val) => val * 1.1)
  const card1Y = useTransform(springY, (val) => val * 1.1)
  const card2X = useTransform(springX, (val) => val * -0.7)
  const card2Y = useTransform(springY, (val) => val * -0.7)
  const ambientGlowX = useTransform(springX, (val) => val * 0.45)
  const ambientGlowY = useTransform(springY, (val) => val * 0.45)

  const localityTabs = ['All', ...bangaloreLocalities.slice(0, 8)]
  const featured = activeTab === 'All'
    ? projects.slice(0, 6)
    : projects.filter((p) => p.microMarket === activeTab).slice(0, 6)

  const recent = projects.filter((p) => p.recent).slice(0, 3)

  return (
    <div className="min-h-screen bg-white text-slate-900 font-luxury-sans">
      <AppHeader />

      <main>
        {/* ══════════════════════════════════════════════════════════════
            CINEMATIC LUXURY HERO SECTION
        ══════════════════════════════════════════════════════════════ */}
        <section 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative flex min-h-[95vh] flex-col justify-center overflow-hidden border-b border-[#D4AF37]/10"
        >
          {/* Background — Full-screen luxury photo with Ken Burns zoom */}
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">

            {/* REAL PHOTO — Ken Burns slow zoom */}
            <motion.img
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=85"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 12, ease: 'easeOut' }}
              loading="eager"
            />

            {/* Dark overlay — top to bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70 pointer-events-none" />
            {/* Left vignette — text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent pointer-events-none" />
            {/* Subtle gold shimmer top-left */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(212,175,55,0.10)_0%,transparent_70%)] pointer-events-none" />
          </div>

          {/* 3D PARALLAX FLOATING CARDS (Desktop only, responsive, hardware accelerated) */}
          <div className="pointer-events-none absolute right-[4%] top-[12%] z-20 hidden flex-col gap-6 lg:flex xl:right-[6%]">
            
            {/* Card 1 — Prestige Raintree Park (Structural wrapper for additively mapping bobbing and parallax) */}
            <motion.div style={{ x: card1X, y: card1Y }} className="will-change-transform">
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                className="relative w-[260px] overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200"
              >
                {/* Gold light sweeps */}
                <div className="absolute top-0 right-0 h-1.5 w-16 bg-gradient-to-l from-[#D4AF37] to-transparent" />
                
                <div className="flex items-start justify-between gap-2.5">
                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#D4AF37]">Featured Property</div>
                    <h4 className="mt-1.5 text-[14px] font-bold text-slate-900 truncate">Prestige Raintree Park</h4>
                    <div className="text-[11.5px] text-slate-600 mt-0.5">Whitefield, East Bangalore</div>
                  </div>
                  <Award className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3.5 flex justify-between items-baseline">
                  <div>
                    <div className="text-[17px] font-black text-[#D4AF37]">₹1.2 Cr+</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">2, 3 & 4 BHK Apartments</div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> RERA Approved
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2 — Sobha Neopolis */}
            <motion.div style={{ x: card2X, y: card2Y }} className="will-change-transform">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
                className="relative w-[260px] overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_8px_40px_rgba(212,175,55,0.15)] border border-[#D4AF37]/30"
              >
                <div className="absolute top-0 right-0 h-1.5 w-16 bg-gradient-to-l from-emerald-500 to-transparent" />
                <div className="flex items-start justify-between gap-2.5">
                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#D4AF37]">New Launch Deal</div>
                    <h4 className="mt-1.5 text-[14px] font-bold text-slate-900 truncate">Sobha Neopolis</h4>
                    <div className="text-[11.5px] text-slate-600 mt-0.5">Panathur, Bangalore</div>
                  </div>
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3.5 flex justify-between items-baseline">
                  <div>
                    <div className="text-[17px] font-black text-[#D4AF37]">₹1.55 Cr+</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Greek-themed Villas & Apts</div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[9px] font-bold text-[#D4AF37]">
                    🔥 Selling Fast
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ROTATING CIRCULAR LUXURY BADGE */}
          <div className="absolute left-[3%] bottom-[12%] z-20 hidden lg:block">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="relative h-28 w-28 flex items-center justify-center"
            >
              <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <text fill="#D4AF37" fontSize="8" fontWeight="bold" letterSpacing="3.5">
                  <textPath href="#circlePath">
                    ◆ BEYOND IMAGINATION ◆ LUXURY REAL ESTATE 
                  </textPath>
                </text>
              </svg>
              {/* Center icon */}
              <div className="h-10 w-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#080B11] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <span className="font-luxury-serif font-black text-[15px] tracking-tight">EP</span>
              </div>
            </motion.div>
          </div>

          {/* MAIN HERO CONTENT */}
          <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 pb-28 pt-20 sm:px-6 lg:px-8 lg:pr-[360px]">
            
            {/* Social proof badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-2 text-[12.5px] font-semibold text-[#D4AF37] shadow-md backdrop-blur-md">
                ⭐ Trusted by 500+ Luxury Home Buyers in Bangalore
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="mt-6 text-center text-[38px] font-bold leading-[1.12] tracking-tight text-white sm:text-[58px] lg:text-left font-luxury-sans"
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}
            >
              Discover Luxury Living <br className="hidden sm:inline" />
              <span className="font-luxury-serif italic text-gold-gradient font-medium">Beyond Imagination</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="mt-6 max-w-[620px] text-center text-[15.5px] leading-8 text-white/75 sm:text-[17px] lg:text-left"
            >
              An elite, handpicked portfolio of ultra-premium apartments and modern estates crafted for individuals with refined taste. RERA registered & fully verified.
            </motion.p>

            {/* Luxury CTA Buttons */}
            <PremiumHeroCTAs />

            {/* Category cards — glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="mx-auto mt-10 grid max-w-[880px] grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0"
            >
              {categoryCards.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveCategory(item.key)
                    if (item.key === 'residential') navigate('/residential-properties-in-bangalore')
                  }}
                  className={`flex items-center gap-3 rounded-[18px] border px-4 py-4 text-left backdrop-blur-sm transition duration-300 ${
                    activeCategory === item.key
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37]/30'
                      : 'border-white/15 bg-white/10 hover:border-white/30 hover:bg-white/15'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[13px] font-bold leading-5 text-white/90">{item.title}</span>
                </button>
              ))}
            </motion.div>

            {/* HeroSearch */}
            <HeroSearch />
          </div>

          {/* STATS STRIP — Absolutely pinned bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-slate-100 bg-white/70 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-center gap-y-2 px-4 py-4 sm:px-6 lg:px-8">
              {[
                { label: '20 Curated Projects', subtitle: 'Verified Listings' },
                { label: '7+ Top Builders', subtitle: 'Premium Developers' },
                { label: 'RERA Certified', subtitle: 'Guaranteed Trust' },
                { label: 'East Bangalore Specialist', subtitle: 'Local Authority' },
              ].map(({ label, subtitle }, i, arr) => (
                <div key={label} className="flex items-center">
                  <div className="px-5 text-center sm:px-8">
                    <span className="block text-[14px] font-black text-slate-900">{label}</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{subtitle}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="h-6 w-px bg-slate-200 hidden sm:inline-block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Projects ──────────────────────────────────────── */}
        <section className="mx-auto max-w-[1380px] px-4 py-24 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[28px] font-luxury-serif font-semibold text-slate-900 sm:text-[38px] tracking-tight">
                  Upcoming <span className="text-gold-gradient italic">New Launches</span>
                </h2>
                <p className="mt-1.5 text-[14px] text-slate-600 font-medium">Handpicked residential projects across East Bangalore's elite zones</p>
              </div>
              <Link to="/residential-properties-in-bangalore" className="shrink-0 text-[13px] font-bold uppercase tracking-wider text-[#D4AF37] transition hover:text-[#AA7C11] flex items-center gap-1.5">
                View All Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Locality tabs */}
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {localityTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-[10px] border px-4.5 py-2.5 text-[13px] font-bold transition duration-300 ${
                    activeTab === tab
                      ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-700 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Cards */}
          {featured.length > 0 ? (
            <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <PropertyCard key={p.slug} project={p} />
              ))}
            </StaggerReveal>
          ) : (
            <ScrollReveal className="mt-10">
              <div className="col-span-3 py-20 text-center text-slate-500">No ultra-luxury properties found in this location.</div>
            </ScrollReveal>
          )}
        </section>

        {/* ── New Launches ──────────────────────────────────────────── */}
        {(() => {
          const newLaunches = projects.filter((p) => p.isNew || p.badge === 'New Launch').slice(0, 6)
          if (!newLaunches.length) return null
          return (
            <section className="mx-auto max-w-[1380px] px-4 pb-24 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-400 mb-3">
                      🚀 New Launches
                    </div>
                    <h2 className="text-[28px] font-luxury-serif font-semibold text-slate-900 sm:text-[36px] tracking-tight">
                      Just Launched <span className="text-gold-gradient italic">Projects</span>
                    </h2>
                    <p className="mt-1.5 text-[14px] text-slate-600">Fresh off the market — be the first to invest</p>
                  </div>
                  <Link to="/residential-properties-in-bangalore" className="shrink-0 text-[13px] font-bold uppercase tracking-wider text-[#D4AF37] transition hover:text-[#AA7C11] flex items-center gap-1.5">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
              <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newLaunches.map((p) => (
                  <PropertyCard key={p.slug} project={p} />
                ))}
              </StaggerReveal>
            </section>
          )
        })()}

        {/* ── Hot Deals ──────────────────────────────────────────────── */}
        {(() => {
          const hotDeals = projects.filter((p) => p.badge === 'Hot Deal' || p.priceValue <= 1.2).slice(0, 3)
          if (!hotDeals.length) return null
          return (
            <section className="border-y border-slate-200 bg-gray-50 py-20">
              <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-rose-400 mb-3">
                        🔥 Limited Time
                      </div>
                      <h2 className="text-[28px] font-luxury-serif font-semibold text-slate-900 sm:text-[36px] tracking-tight">
                        Top <span className="text-gold-gradient italic">Deals</span>
                      </h2>
                      <p className="mt-1.5 text-[14px] text-slate-600">Best value luxury homes — act before prices rise</p>
                    </div>
                    <Link to="/residential-properties-in-bangalore" className="shrink-0 text-[13px] font-bold uppercase tracking-wider text-[#D4AF37] transition hover:text-[#AA7C11] flex items-center gap-1.5">
                      View All <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </ScrollReveal>
                <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {hotDeals.map((p) => (
                    <PropertyCard key={p.slug} project={p} />
                  ))}
                </StaggerReveal>
              </div>
            </section>
          )
        })()}

        {/* ── Builder Carousel ───────────────────────────────────────── */}
        <BuilderCarousel />

        {/* ── Recently Added ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1380px] px-4 py-24 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-[24px] font-luxury-serif font-semibold text-slate-900 sm:text-[34px] tracking-tight">
                    Recently Curated <span className="text-gold-gradient italic">Residences</span>
                  </h3>
                  <p className="mt-1.5 text-[14px] text-slate-600">Latest luxury estates added to EastProject portfolio</p>
                </div>
                <Link
                  to="/residential-properties-in-bangalore"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#080B11] shadow-[0_4px_12px_rgba(212,175,55,0.2)] transition hover:bg-[#AA7C11]"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recent.map((p) => (
                  <Link key={p.slug} to={`/${p.slug}-eastproject`} className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white transition duration-300 hover:border-[#D4AF37]/35">
                    <div className="overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <div className="p-5">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">{p.builder}</div>
                      <div className="mt-1.5 text-[17px] font-bold text-slate-900 line-clamp-1 group-hover:text-[#D4AF37] transition duration-300">{p.name}</div>
                      <div className="mt-1 text-[13px] text-slate-600">📍 {p.microMarket}, East Bangalore</div>
                      <div className="mt-3 text-[16.5px] font-black text-slate-900">{p.priceLabel}</div>
                    </div>
                  </Link>
                ))}
              </StaggerReveal>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Trust strip ────────────────────────────────────────────── */}
        <section className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: '🏢', stat: '20', label: 'Curated Projects' },
                { icon: '🏗️', stat: '7+', label: 'Top Builders' },
                { icon: '📍', stat: '10+', label: 'Prime Localities' },
                { icon: '🏆', stat: 'RERA', label: 'Authorised Agency' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="text-[30px] font-black text-slate-900 mt-2">{item.stat}</div>
                  <div className="text-[13px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FloatingWidgets />
      <AppFooter />
    </div>
  )
}

export default HomePage
