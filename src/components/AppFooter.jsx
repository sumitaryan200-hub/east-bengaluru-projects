import { Link } from 'react-router-dom'
import { bangaloreLocalities } from '../data/marketplace'
import { builders } from '../data/builders'

function AppFooter() {
  const featuredBuilders = builders.slice(0, 10)

  return (
    <footer className="border-t border-white/5 bg-[#080B11] text-slate-300">
      {/* Main footer grid */}
      <div className="mx-auto max-w-[1380px] px-4 pt-14 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <div className="flex h-10 items-center text-[18px] font-black text-[#D4AF37] tracking-tight">EastProject.in</div>
            <p className="mt-4 text-[13px] leading-6 text-slate-400">
              Bangalore's premium AI-powered real estate discovery platform. Explore 2, 3 &amp; 4 BHK apartments from top builders across East Bangalore.
            </p>
            <div className="mt-6 space-y-2 text-[13px] text-slate-400">
              <div>📍 Bangalore, Karnataka</div>
              <div>📞 +91 99999 99999</div>
              <div>✉️ info@eastproject.in</div>
            </div>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2 text-[12px] font-bold text-[#D4AF37] tracking-wide">
                RERA Registered Agent
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-slate-500 mb-5">Quick Links</div>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/" className="transition hover:text-white">Home</Link></li>
              <li><Link to="/residential-properties-in-bangalore" className="transition hover:text-white">Residential Properties</Link></li>
              <li><Link to="/residential-properties-in-bangalore" className="transition hover:text-white">New Launches</Link></li>
              <li><Link to="/residential-properties-in-bangalore" className="transition hover:text-white">Ready to Move</Link></li>
              <li><Link to="/residential-properties-in-bangalore" className="transition hover:text-white">Under Construction</Link></li>
              <li><a href="#" className="transition hover:text-white">Home Loan</a></li>
              <li><a href="#" className="transition hover:text-white">EMI Calculator</a></li>
              <li><Link to="/contact" className="transition hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Localities */}
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-slate-500 mb-5">Popular Localities</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
              {bangaloreLocalities.slice(0, 16).map((loc) => (
                <li key={loc}>
                  <Link to="/residential-properties-in-bangalore" className="transition hover:text-white">{loc}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Builders */}
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-slate-500 mb-5">Top Builders</div>
            <ul className="space-y-3 text-[13px]">
              {featuredBuilders.map((b) => (
                <li key={b.slug}>
                  <Link to={`/builders/${b.slug}`} className="transition hover:text-white">{b.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secondary links row */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] text-slate-500 mb-6">
            <a href="#" className="transition hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="transition hover:text-slate-300">Terms &amp; Conditions</a>
            <a href="#" className="transition hover:text-slate-300">Disclaimer</a>
            <a href="#" className="transition hover:text-slate-300">RERA Information</a>
            <a href="#" className="transition hover:text-slate-300">Sitemap</a>
            <a href="#" className="transition hover:text-slate-300">Feedback</a>
          </div>

          {/* RERA Disclaimer */}
          <div className="rounded-[16px] border border-slate-800 bg-[#0f131a] p-5 text-[11.5px] leading-[1.8] text-slate-400">
            <span className="text-[#D4AF37] font-bold">RERA Disclaimer: </span>
            This website is managed by RERA-authorised real estate agent <span className="text-slate-200 font-semibold">Gautam Agrawal</span>. Project information, pricing, availability, floor plans, specifications, images and possession timelines are subject to change by the respective developer. Images are representational. Users may receive updates on their registered contact details. Information may be shared with RERA-registered developers as required.
          </div>

          {/* Copyright */}
          <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[12px] text-slate-500 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} EastProject.in · All Rights Reserved · Managed by Gautam Agrawal</div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>AI-Powered Publishing Engine · Bangalore Properties Only</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
