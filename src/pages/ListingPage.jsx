import { ChevronDown, Minus, Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import FloatingWidgets from '../components/FloatingWidgets'
import ScrollReveal from '../components/ScrollReveal'
import { listingFilters, projects } from '../data/marketplace'

function FilterChip({ label, value, onClick, onClear }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`flex h-[44px] items-center gap-2 rounded-[10px] border px-4 text-[13px] font-medium transition ${value ? 'border-[#b8d4f5] bg-[#eff6ff] text-[#0f4c81]' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
      >
        {value || label}
        {value ? (
          <button onClick={(e) => { e.stopPropagation(); onClear() }} className="ml-1 rounded-full p-0.5 hover:bg-[#dbeafe]">
            <X className="h-3 w-3" />
          </button>
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}

function SidebarSection({ title, collapsed, onToggle, children }) {
  return (
    <div className="border-t border-slate-100 py-5 first:border-t-0 first:pt-0">
      <button onClick={onToggle} className="flex w-full items-center justify-between text-left text-[15px] font-semibold text-slate-900">
        {title}
        {collapsed ? <Plus className="h-4 w-4 text-slate-600" /> : <Minus className="h-4 w-4 text-slate-600" />}
      </button>
      {!collapsed && <div className="mt-4">{children}</div>}
    </div>
  )
}

function PropertyListCard({ project }) {
  const [wishlist, setWishlist] = useState(false)
  const [compared, setCompared] = useState(false)
  const [hovered, setHovered] = useState(false)

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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`overflow-hidden rounded-[24px] border bg-white/92 text-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        hovered 
          ? 'border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(212,175,55,0.12)] ' 
          : 'border-slate-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left Side: Property Image */}
        <div className="relative overflow-hidden min-h-[220px] aspect-[4/3] sm:aspect-auto sm:w-[300px] sm:shrink-0">
          <motion.img 
            src={project.images[0]} 
            alt={project.name} 
            animate={{ scale: hovered ? 1.06 : 1.0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover" 
            loading="lazy" 
          />
          
          {/* Ambient Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B11]/95 via-[#080B11]/10 to-transparent pointer-events-none" />

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

          {/* Tag Badge */}
          <span className={`absolute left-4 top-4 inline-flex rounded-full border px-3 py-1 text-[9.5px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${badge.classes}`}>
            {badge.text}
          </span>

          {/* Interactive Wishlist & Compare Toggles */}
          <div className="absolute right-4 top-4 flex gap-2">
            {/* Compare */}
            <motion.button
              onClick={() => setCompared(!compared)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex h-8.5 w-8.5 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition ${
                compared 
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]' 
                  : 'bg-white/75 border-slate-200 text-slate-600 hover:text-white hover:border-white/30'
              }`}
              title="Compare Property"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M16 3h5v5M8 21H3v-5M12 3v18M3 12h18" />
              </svg>
            </motion.button>

            {/* Wishlist */}
            <motion.button
              onClick={() => setWishlist(!wishlist)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex h-8.5 w-8.5 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition ${
                wishlist 
                  ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                  : 'bg-white/75 border-slate-200 text-slate-600 hover:text-[#D4AF37] hover:border-white/30'
              }`}
              title="Add to Wishlist"
            >
              <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-300 ${wishlist ? 'fill-rose-500 text-rose-500 scale-110' : 'fill-none text-slate-600'}`} stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.button>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-[8px] bg-slate-50/80 px-2.5 py-1.5 backdrop-blur-md border border-slate-100 shadow-md">
            <span className="text-[#D4AF37] text-[10px] font-black">★</span>
            <span className="text-white text-[11.5px] font-bold">{project.rating || '4.8'}</span>
          </div>

          {/* Photo Count badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-[8px] bg-slate-50/80 px-2 py-1.5 backdrop-blur-md border border-slate-100 shadow-md text-[10px] font-bold text-slate-700">
            <span>📷 1/{project.images.length || 5}</span>
          </div>
        </div>

        {/* Right Side: Property Specifications & Context */}
        <div className="flex flex-col p-6 sm:p-7 justify-between text-left flex-1 min-w-0">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">{project.builder}</div>
              <h3 className="mt-1 text-[21px] font-extrabold text-slate-900 hover:text-[#D4AF37] transition duration-300">{project.name}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0 fill-none stroke-[#D4AF37]/75" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {project.locality}
              </div>
            </div>
            {/* Price section */}
            <div className="sm:text-right shrink-0">
              <div className="text-[22px] font-black text-[#D4AF37] tracking-tight">{project.priceLabel}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">onwards</div>
            </div>
          </div>

          {/* Configurations Grid */}
          <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 border-y border-slate-100 py-4">
            {project.configurations.slice(0, 3).map((c) => (
              <div key={c.type} className="rounded-[12px] bg-slate-100 border border-slate-100 p-3 flex flex-col justify-between">
                <div className="text-[12px] font-bold text-slate-600">{c.type}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{c.area}</div>
                <div className="text-[13px] font-extrabold text-[#D4AF37] mt-1.5">{c.price}</div>
              </div>
            ))}
          </div>

          {/* Summary description */}
          <p className="mt-4 line-clamp-2 text-[13.5px] leading-6 text-slate-600 font-medium">{project.summary}</p>

          {/* Core Amenities Custom Icons Row */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-black uppercase tracking-widest text-[#D4AF37]/80">Key Amenities</span>
              <div className="flex gap-2">
                {/* Swimming Pool */}
                <span className="h-6.5 w-6.5 rounded-md bg-white border border-slate-100 flex items-center justify-center" title="Swimming Pool">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M2 6c.6 0 1.2-.2 1.6-.6L5 4.3c.8-.8 2-.8 2.8 0l1.4 1.1c.4.4 1 .6 1.6.6" />
                    <path d="M2 12c.6 0 1.2-.2 1.6-.6l1.4-1.1c.8-.8 2-.8 2.8 0" />
                  </svg>
                </span>
                {/* Gym */}
                <span className="h-6.5 w-6.5 rounded-md bg-white border border-slate-100 flex items-center justify-center" title="Fitness Centre">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#D4AF37]" fill="currentColor">
                    <path d="M6.5 5h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zM9 11h6v2H9z" />
                  </svg>
                </span>
                {/* Clubhouse */}
                <span className="h-6.5 w-6.5 rounded-md bg-white border border-slate-100 flex items-center justify-center" title="Luxury Clubhouse">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 21h18M3 10h18M5 21V10M19 21V10" />
                  </svg>
                </span>
                {/* Security */}
                <span className="h-6.5 w-6.5 rounded-md bg-white border border-slate-100 flex items-center justify-center" title="24x7 Security">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3" />
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="text-[11px] font-bold text-slate-500">Updated: {project.updated}</div>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Link
              to={`/${project.slug}`}
              className="flex h-[44px] items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 text-[13px] font-bold text-slate-800 transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] cursor-pointer"
            >
              View Details
            </Link>
            <a
              href={`https://wa.me/918102422651?text=${encodeURIComponent(`Hi, I am interested in *${project.name}* (${project.locality}).\n\n*Price:* ${project.priceLabel}\n*Config:* ${project.beds.join(', ')}\n\nKindly share more details. Thank you!`)}`}
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden flex h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[13px] font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)] transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ListingPage() {
  const [selectedTab, setSelectedTab] = useState('')
  const [openFilter, setOpenFilter] = useState('')
  const [propertyType, setPropertyType] = useState('Residential')
  const [constructionStatus, setConstructionStatus] = useState([])
  const [selectedBeds, setSelectedBeds] = useState([])
  const [localitySearch, setLocalitySearch] = useState('')
  const [selectedLocality, setSelectedLocality] = useState('')
  const [selectedQuick, setSelectedQuick] = useState({ possession: '', bhk: '', budget: '', area: '' })
  const [collapsed, setCollapsed] = useState({})
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleCollapse = (key) => setCollapsed((s) => ({ ...s, [key]: !s[key] }))

  const filteredLocalities = listingFilters.sidebar.localities.filter((l) =>
    l.toLowerCase().includes(localitySearch.toLowerCase()),
  )

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedTab === 'Ready to Move' && p.possession !== 'Ready to Move') return false
      if (selectedTab === 'Under Construction' && p.possession !== 'Under Construction') return false
      if (constructionStatus.length > 0 && !constructionStatus.includes(p.possession)) return false
      if (selectedQuick.possession && p.possession !== selectedQuick.possession) return false
      if (selectedQuick.bhk && !p.beds.includes(selectedQuick.bhk)) return false
      if (selectedBeds.length > 0 && !selectedBeds.some((b) => p.beds.includes(b))) return false
      if (selectedLocality && !p.microMarket.toLowerCase().includes(selectedLocality.toLowerCase())) return false
      return true
    })
  }, [constructionStatus, selectedBeds, selectedLocality, selectedQuick, selectedTab])

  const recentProjects = projects.filter((p) => p.recent).slice(0, 3)

  const Sidebar = (
    <aside className="h-fit overflow-hidden rounded-[18px] border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-bold text-slate-900">Filters</div>
          <button
            onClick={() => { setConstructionStatus([]); setSelectedBeds([]); setSelectedLocality(''); setSelectedQuick({ possession: '', bhk: '', budget: '', area: '' }); setSelectedTab('') }}
            className="text-[12px] font-semibold text-[#0f4c81] transition hover:underline"
          >
            Clear all
          </button>
        </div>
      </div>
      <div className="px-5 py-4">
        <SidebarSection title="Construction Status" collapsed={collapsed.status} onToggle={() => toggleCollapse('status')}>
          <div className="space-y-3">
            {listingFilters.sidebar.constructionStatus.map((item) => (
              <label key={item} className="flex cursor-pointer items-center gap-3 text-[14px] text-slate-700">
                <input
                  type="checkbox"
                  checked={constructionStatus.includes(item)}
                  onChange={() => setConstructionStatus((s) => s.includes(item) ? s.filter((x) => x !== item) : [...s, item])}
                  className="h-4 w-4 rounded border-slate-300 accent-[#0D6EFD]"
                />
                {item}
              </label>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="No. of Bedrooms" collapsed={collapsed.beds} onToggle={() => toggleCollapse('beds')}>
          <div className="grid grid-cols-2 gap-2">
            {[...listingFilters.sidebar.bedsLeft, ...listingFilters.sidebar.bedsRight].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedBeds((s) => s.includes(item) ? s.filter((x) => x !== item) : [...s, item])}
                className={`rounded-[8px] border px-3 py-2 text-[13px] font-medium transition ${selectedBeds.includes(item) ? 'border-[#b8d4f5] bg-[#eff6ff] text-[#0f4c81]' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Budget" collapsed={collapsed.budget} onToggle={() => toggleCollapse('budget')}>
          <div className="flex gap-3">
            <select className="flex-1 rounded-[8px] border border-slate-200 px-3 py-2 text-[13px] text-slate-700 outline-none">
              <option>Min Budget</option>
              <option>₹50 L</option><option>₹75 L</option><option>₹1 Cr</option>
            </select>
            <select className="flex-1 rounded-[8px] border border-slate-200 px-3 py-2 text-[13px] text-slate-700 outline-none">
              <option>Max Budget</option>
              <option>₹2 Cr</option><option>₹3 Cr</option><option>₹5 Cr+</option>
            </select>
          </div>
        </SidebarSection>

        <SidebarSection title="Type of Property" collapsed={collapsed.propType} onToggle={() => toggleCollapse('propType')}>
          <div className="space-y-3">
            {listingFilters.sidebar.typeOfProperty.map((item) => (
              <label key={item} className="flex cursor-pointer items-center gap-3 text-[14px] text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-[#0D6EFD]" />
                {item}
              </label>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Locality" collapsed={collapsed.locality} onToggle={() => toggleCollapse('locality')}>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-[11px] h-3.5 w-3.5 text-slate-600" />
            <input
              value={localitySearch}
              onChange={(e) => setLocalitySearch(e.target.value)}
              placeholder="Search locality"
              className="w-full rounded-[8px] border border-slate-200 py-2.5 pl-8 pr-3 text-[13px] outline-none placeholder:text-slate-600"
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto space-y-2">
            {filteredLocalities.slice(0, 12).map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocality(selectedLocality === loc ? '' : loc)}
                className={`flex w-full items-center gap-2 rounded-[6px] px-2 py-1.5 text-left text-[13px] transition ${selectedLocality === loc ? 'bg-[#eff6ff] font-semibold text-[#0f4c81]' : 'text-slate-700 hover:text-[#0f4c81]'}`}
              >
                📍 {loc}
              </button>
            ))}
          </div>
        </SidebarSection>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <AppHeader />

      <main className="mx-auto max-w-[1380px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb + title */}
        <ScrollReveal>
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-1.5 text-[12px] text-slate-500">
              <Link to="/" className="transition hover:text-[#0f4c81]">Home</Link>
              <span>›</span>
              <span className="text-slate-700">Residential Properties in Bangalore</span>
            </div>
            <h1 className="text-[26px] font-bold text-slate-900 sm:text-[32px]">Residential Properties for Sale in Bangalore</h1>
            <p className="mt-1 text-[13px] text-slate-500">Explore {projects.length} premium projects across East Bangalore</p>
          </div>
        </ScrollReveal>

        {/* Top filter bar */}
        <ScrollReveal delay={0.1}>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex h-[44px] items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700 transition hover:border-slate-300 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>

            {listingFilters.topTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(selectedTab === tab ? '' : tab)}
                className={`flex h-[44px] items-center rounded-[10px] border px-4 text-[13px] font-medium transition ${selectedTab === tab ? 'border-[#b8d4f5] bg-[#eff6ff] text-[#0f4c81]' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
              >
                {tab}
              </button>
            ))}

            {listingFilters.quickFilters.map((filter) => (
              <div key={filter.key} className="relative">
                <FilterChip
                  label={filter.label}
                  value={selectedQuick[filter.key]}
                  onClick={() => setOpenFilter(openFilter === filter.key ? '' : filter.key)}
                  onClear={() => setSelectedQuick((s) => ({ ...s, [filter.key]: '' }))}
                />
                {openFilter === filter.key && (
                  <div className="absolute left-0 top-[50px] z-20 min-w-[220px] overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
                    <div className={`grid p-3 gap-1 text-[13px] ${filter.key === 'bhk' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {filter.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSelectedQuick((s) => ({ ...s, [filter.key]: opt })); setOpenFilter('') }}
                          className={`rounded-[8px] px-3 py-2 text-left transition hover:bg-[#f0f7ff] hover:text-[#0f4c81] ${selectedQuick[filter.key] === opt ? 'bg-[#eff6ff] font-semibold text-[#0f4c81]' : 'text-slate-700'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="ml-auto flex items-center gap-3 text-[13px]">
              <span className="text-slate-500">{filteredProjects.length} Properties</span>
              <div className="flex h-[44px] items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4">
                Sort: <span className="font-semibold text-slate-900">Recommended</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main layout */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar — desktop */}
          <ScrollReveal direction="left" delay={0.2} className="hidden lg:block lg:w-[290px] lg:shrink-0">
            {Sidebar}
          </ScrollReveal>

          {/* Listings */}
          <section className="flex-1 min-w-0">
            {filteredProjects.length > 0 ? (
              <div className="space-y-5">
                {filteredProjects.map((p) => (
                  <PropertyListCard key={p.slug} project={p} />
                ))}
              </div>
            ) : (
              <ScrollReveal>
                <div className="rounded-[16px] border border-slate-200 bg-white py-20 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <div className="text-[16px] font-semibold text-slate-700">No projects match your filters</div>
                  <p className="mt-2 text-[13px] text-slate-500">Try adjusting or clearing your filters</p>
                </div>
              </ScrollReveal>
            )}

            {/* Recently added strip */}
            <div className="mt-8 overflow-hidden rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-[20px] font-bold text-slate-900 sm:text-[26px]">Recently Added in Bangalore</h2>
                <Link to="/" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D6EFD] text-white">›</Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recentProjects.map((p) => (
                  <Link key={p.slug} to={`/${p.slug}`} className="group overflow-hidden rounded-[14px] border border-slate-200 transition hover:shadow-md">
                    <img src={p.images[0]} alt={p.name} className="aspect-[16/10] w-full object-cover" />
                    <div className="p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-600">{p.builder}</div>
                      <div className="mt-1 text-[16px] font-bold text-slate-900">{p.name}</div>
                      <div className="mt-1 text-[13px] text-slate-500">{p.priceLabel}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto h-full w-full max-w-[340px] overflow-y-auto bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="font-bold text-slate-900">Filters</div>
              <button onClick={() => setMobileFiltersOpen(false)}><X className="h-5 w-5 text-slate-700" /></button>
            </div>
            <div className="p-5">{Sidebar}</div>
          </div>
        </div>
      )}

      <FloatingWidgets />
      <AppFooter />
    </div>
  )
}

export default ListingPage
