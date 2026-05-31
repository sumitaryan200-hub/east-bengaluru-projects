import { MapPin, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import FloatingWidgets from '../components/FloatingWidgets'
import ScrollReveal from '../components/ScrollReveal'
import StaggerReveal from '../components/StaggerReveal'
import { getBuilderBySlug } from '../data/builders'
import { projects } from '../data/marketplace'

function BuilderPage() {
  const { slug } = useParams()
  const builder = getBuilderBySlug(slug)
  const builderProjects = projects.filter((p) => p.builderSlug === slug)
  const primary = builder?.primaryColor || '#0D6EFD'

  if (!builder) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <div className="text-4xl">🏗️</div>
        <div className="text-[20px] font-bold text-slate-900">Builder Not Found</div>
        <Link to="/" className="text-[14px] font-semibold text-[#0f4c81] hover:underline">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AppHeader />

      <main>
        {/* Builder hero banner */}
        <ScrollReveal>
          <div className="border-b border-slate-200" style={{ background: `linear-gradient(135deg, ${primary}10 0%, #fff 60%)` }}>
            <div className="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center gap-1.5 text-[12px] text-slate-500">
                <Link to="/" className="transition hover:text-[#0f4c81]">Home</Link>
                <span>›</span>
                <span className="text-slate-700">Builders</span>
                <span>›</span>
                <span className="text-slate-700">{builder.name}</span>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {builder.logo && (
                  <div className="flex-shrink-0">
                    <img
                      src={builder.logo}
                      alt={`${builder.name} logo`}
                      className="h-[90px] w-auto object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-[30px] font-black text-slate-900 sm:text-[38px]">{builder.name}</h1>
                  <div className="mt-1 text-[15px] font-medium italic text-slate-500">"{builder.tagline}"</div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px]">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(builder.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'text-slate-300'}`} />
                      ))}
                      <span className="font-semibold text-slate-700">{builder.rating} Rating</span>
                    </div>
                    <div className="h-4 w-px bg-slate-300" />
                    <span className="text-slate-600">{builder.experience}+ Years of Excellence</span>
                    <div className="h-4 w-px bg-slate-300" />
                    <span className="text-slate-600">Est. {builder.founded}</span>
                    <div className="h-4 w-px bg-slate-300" />
                    <span className="font-semibold" style={{ color: primary }}>
                      {builderProjects.length > 0 ? `${builderProjects.length} Projects in Bangalore` : 'Projects Coming Soon'}
                    </span>
                  </div>

                  <p className="mt-4 max-w-[680px] text-[14px] leading-7 text-slate-600">{builder.description}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="tel:+919999999999"
                      className="flex h-[44px] items-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: primary }}
                    >
                      📞 Enquire About Projects
                    </a>
                    <Link
                      to="/residential-properties-in-bangalore"
                      className="flex h-[44px] items-center gap-2 rounded-[10px] border border-slate-200 px-6 text-[14px] font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View All Bangalore Projects
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal delay={0.1}>
          <div className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 divide-x divide-slate-200 sm:grid-cols-3">
                {[
                  { label: 'Years Experience', value: `${builder.experience}+` },
                  { label: 'Projects Listed', value: builderProjects.length > 0 ? builderProjects.length : '—' },
                  { label: 'Trust Rating', value: `${builder.rating}/5` },
                ].map((stat) => (
                  <div key={stat.label} className="px-6 py-5 text-center">
                    <div className="text-[24px] font-black" style={{ color: primary }}>{stat.value}</div>
                    <div className="mt-0.5 text-[12px] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects section */}
        <div className="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-[24px] font-bold text-slate-900 sm:text-[30px]">
              {builderProjects.length > 0 ? `${builder.name} Projects in Bangalore` : 'No Projects Listed Yet'}
            </h2>
          </ScrollReveal>

          {builderProjects.length > 0 ? (
            <StaggerReveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {builderProjects.map((p) => (
                <article key={p.slug} className="flex h-full flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm transition hover:shadow-md h-full flex flex-col justify-between">
                  <div className="relative">
                    <img src={p.images[0]} alt={p.name} className="aspect-[16/10] w-full object-cover" />
                    <span className={`absolute left-3 top-3 rounded-[6px] px-3 py-1 text-[11px] font-semibold text-white ${p.badge === 'Ready to Move' ? 'bg-[#1a7a3c]' : p.badge === 'New Launch' ? 'bg-[#c41e3a]' : 'bg-[#1B3A6B]'}`}>
                      {p.badge}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 justify-between">
                    <div>
                      <div className="text-[20px] font-bold text-slate-900">{p.name}</div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-slate-500">
                        <MapPin className="h-3.5 w-3.5" style={{ color: primary }} />
                        {p.microMarket}, Bangalore
                      </div>
                      <div className="mt-3 text-[18px] font-bold text-slate-900">{p.priceLabel}</div>
                      <div className="mt-1 text-[13px] text-slate-500">{p.configurations[0]?.area} · {p.beds.join(', ')}</div>
                      <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-slate-500">{p.summary}</p>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <Link
                        to={`/project/${p.slug}`}
                        className="flex h-[40px] flex-1 items-center justify-center rounded-[10px] text-[13px] font-semibold text-white transition hover:opacity-90"
                        style={{ backgroundColor: primary }}
                      >
                        View Details
                      </Link>
                      <a
                        href="tel:+919999999999"
                        className="flex h-[40px] items-center justify-center rounded-[10px] border border-slate-200 px-4 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Enquire
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          ) : (
            <ScrollReveal>
              <div className="mt-10 rounded-[20px] border border-slate-200 bg-slate-50 py-20 text-center">
                <div className="text-4xl mb-4">🏗️</div>
                <div className="text-[18px] font-bold text-slate-700">{builder.name} projects coming soon</div>
                <p className="mt-2 text-[14px] text-slate-500">
                  Register your interest and we'll notify you when new projects are listed.
                </p>
                <a
                  href="tel:+919999999999"
                  className="mt-6 inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[14px] font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: primary }}
                >
                  📞 Register Interest
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* RERA trust bar */}
        <div className="border-t border-slate-200 bg-[#f8fafc] py-8">
          <div className="mx-auto max-w-[1380px] px-4 text-center text-[12px] leading-6 text-slate-500 sm:px-6 lg:px-8">
            Listings managed by RERA-authorised agent <span className="font-semibold text-slate-700">Gautam Agrawal</span>. All project information is subject to change by the respective developer.
          </div>
        </div>
      </main>

      <FloatingWidgets />
      <AppFooter />
    </div>
  )
}

export default BuilderPage
