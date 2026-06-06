import { ChevronLeft, ChevronRight, Heart, MapPin, PlaySquare, Star } from 'lucide-react'

function PropertyCard({ project }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[262px_1fr]">
        <div className="relative border-b border-slate-100 lg:border-b-0 lg:border-r">
          <img src={project.images?.[0] || project.image} alt={project.name} className="h-[260px] w-full object-cover lg:h-full" />
          <div className="absolute left-4 top-4 rounded-full bg-[#123f48] px-4 py-1.5 text-xs font-semibold text-white">
            {project.badge}
          </div>
          <button className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-6 text-xs text-slate-600">
            <div className="text-center">
              <div className="text-2xl leading-none text-slate-600">◌</div>
              <div>360 View</div>
            </div>
            <div className="text-center">
              <PlaySquare className="mx-auto h-5 w-5 text-slate-600" />
              <div>Video</div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-[20px] font-semibold leading-tight text-slate-900">{project.name}</h3>
              <p className="mt-1 max-w-2xl text-[15px] leading-7 text-slate-600">
                {project.configurations.map((item) => item.type).join(', ')}, Apartments in {project.locality}, ({project.landmark})
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-slate-500" /> {project.microMarket}
              </div>
            </div>
            <button className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:text-[#1f74d8]">
              <Heart className="h-6 w-6" />
            </button>
          </div>

          <div className="grid gap-5 py-4 sm:grid-cols-3">
            {project.configurations.map((item) => (
              <div key={`${project.slug}-${item.type}`}>
                <div className="text-[15px] font-medium text-slate-700">{item.type}</div>
                <div className="mt-1 text-[15px] text-slate-500">{item.area}</div>
                <div className="mt-1 text-[15px] font-semibold text-slate-900">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-[13px] text-slate-500">
            <span className="font-semibold uppercase tracking-wide text-slate-700">Top Amenities</span>
            {project.amenities.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="text-slate-700">•</span>{item}
              </span>
            ))}
          </div>

          <div className="mt-3 text-[15px] leading-7 text-slate-600">{project.summary} <button className="font-semibold text-[#1f74d8]">Show More</button></div>

          <div className="mt-4 flex flex-col gap-4 border-t border-slate-100 pt-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-6 text-[15px] text-slate-600">
              <div>{project.towers}</div>
              <div>Last updated : {project.updated}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#1f74d8]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <button className="text-[16px] font-semibold text-[#1f74d8]">View Details</button>
              <button className="rounded-[10px] bg-[#0D6EFD] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#095fda]">
                Instant Call Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
