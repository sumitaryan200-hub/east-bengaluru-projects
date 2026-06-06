import { ChevronDown, Heart, Menu, Phone, UserCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bangaloreLocalities, topLocalities } from '../data/marketplace'

function AppHeader({ builderLogo, builderName, builderColor }) {
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith('/project/')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [localityOpen, setLocalityOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomePage = location.pathname === '/'
  const isTransparent = isHomePage && !scrolled

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isTransparent 
        ? 'bg-transparent border-b border-white/20 text-white'
        : 'bg-white/95 backdrop-blur-xl border-b border-slate-200 text-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
    }`}>
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo placeholder */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          {isDetailPage && builderName ? (
            <div
              className="flex h-10 items-center rounded-lg px-4 text-[18px] font-black text-white"
              style={{ backgroundColor: builderColor || '#1B3A6B' }}
            >
              {builderName}
            </div>
          ) : (
            <div className={`flex h-10 items-center px-1 text-[18px] font-black tracking-tight transition-colors duration-500 ${
              isTransparent ? 'text-white' : 'text-[#D4AF37]'
            }`}>
              EastProject.in
            </div>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {!isDetailPage && (
            <div className="relative">
              <button
                onClick={() => setLocalityOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-[14px] font-semibold transition-colors duration-500 ${
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'
                }`}
              >
                Localities <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {localityOpen && (
                <div className="absolute left-0 top-[34px] z-40 w-[520px] overflow-hidden rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-lg">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37]/60 mb-3">Popular Localities in East Bangalore</div>
                  <div className="grid grid-cols-3 gap-2">
                    {bangaloreLocalities.map((loc) => (
                      <Link
                        key={loc}
                        to="/residential-properties-in-bangalore"
                        onClick={() => setLocalityOpen(false)}
                        className="rounded-[8px] px-3 py-2 text-[13px] text-slate-700 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                      >
                        {loc}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <Link to="/residential-properties-in-bangalore" className={`text-[14px] font-semibold transition-colors duration-500 ${
            isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'
          }`}>Projects</Link>
          <Link to="/builders/prestige" className={`text-[14px] font-semibold transition-colors duration-500 ${
            isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'
          }`}>Builders</Link>
          <a href="#" className={`text-[14px] font-semibold transition-colors duration-500 ${
            isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'
          }`}>Home Loan</a>
          <Link to="/contact" className={`text-[14px] font-semibold transition-colors duration-500 ${
            isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'
          }`}>Contact</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+918102422651" className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-500 sm:flex ${
            isTransparent 
              ? 'border-slate-200 text-white hover:border-white hover:bg-white/10' 
              : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
          }`}>
            <Phone className="h-3.5 w-3.5" /> Contact
          </a>
          <button className={`relative rounded-full p-2 transition-colors duration-500 ${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'}`}>
            <Heart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#ff6a1f] px-1 text-[9px] font-bold text-white">0</span>
          </button>
          <button className={`rounded-full p-2 transition-colors duration-500 ${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-[#D4AF37]'}`}>
            <UserCircle2 className="h-5 w-5" />
          </button>
          <button onClick={() => setMobileOpen(true)} className={`rounded-full p-2 transition-colors duration-500 lg:hidden ${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700'}`}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white text-slate-900 lg:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="flex h-10 items-center px-1 text-[18px] font-black text-[#D4AF37]">EastProject.in</div>
            <button onClick={() => setMobileOpen(false)}><X className="h-6 w-6 text-slate-700" /></button>
          </div>
          <nav className="px-5 py-6 space-y-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block text-[17px] font-semibold text-slate-800">Home</Link>
            <Link to="/residential-properties-in-bangalore" onClick={() => setMobileOpen(false)} className="block text-[17px] font-semibold text-slate-800">All Projects</Link>
            <Link to="/builders/prestige" onClick={() => setMobileOpen(false)} className="block text-[17px] font-semibold text-slate-800">Builders</Link>
            <a href="tel:+918102422651" className="block text-[17px] font-semibold text-slate-800">Contact Us</a>
          </nav>
          <div className="px-5">
            <div className="text-[12px] font-semibold uppercase tracking-widest text-[#D4AF37]/60 mb-3">Localities</div>
            <div className="grid grid-cols-2 gap-2">
              {topLocalities.map((loc) => (
                <Link key={loc} to="/residential-properties-in-bangalore" onClick={() => setMobileOpen(false)} className="text-[14px] text-slate-700 py-1">{loc}</Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default AppHeader
