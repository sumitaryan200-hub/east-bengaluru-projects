# EastProject.in — Real Estate Website (Claude Context File)

## Owner
- **Name:** Sumit (Real Estate Dealer, East Bangalore)
- **WhatsApp/Phone:** 8102422651
- **Email:** sumitaryan200@gmail.com
- **GitHub:** sumitaryan200-hub

## Website
- **Live URL:** www.eastproject.in
- **Vercel Project:** east-bengaluru-projects-26w2
- **GitHub Repo:** https://github.com/sumitaryan200-hub/east-bengaluru-projects
- **Hosting:** Vercel (auto-deploy on git push)
- **Domain:** Hostinger (DNS connected to Vercel)

## Tech Stack
- React + Vite (JSX)
- Tailwind CSS v4
- Framer Motion + GSAP animations
- React Router DOM
- Dark luxury theme (gold #D4AF37 + black #080B11)

## Project Structure
```
src/
  pages/
    HomePage.jsx        — Main landing page
    ListingPage.jsx     — All properties listing
    ProjectDetailPage.jsx — Single project detail
    BuilderPage.jsx     — Builder profile page
  components/
    AppHeader.jsx       — Navigation header
    AppFooter.jsx       — Footer
    FloatingWidgets.jsx — WhatsApp + Call floating buttons
    PremiumHeroCTAs.jsx — Hero section CTA buttons
    PropertyCard.jsx    — Reusable property card
    ScrollReveal.jsx    — Scroll animation wrapper
    StaggerReveal.jsx   — Stagger animation wrapper
  data/
    marketplace.js      — ALL project listings data (main data file)
    builders.js         — All builder profiles
    builderConfig.js    — Builder config
```

## What This Website Does
Sumit is a real estate dealer/agent in East Bangalore. This website lists luxury residential projects from top builders like Prestige, Sobha, Godrej, Brigade etc. Clients visit the site to discover projects and contact Sumit.

## Deploy Workflow
```
Edit files in src/ folder
git add .
git commit -m "description"
git push
→ Vercel auto-deploys in 2 minutes → live on www.eastproject.in
```

## How to Add a New Project
Edit `src/data/marketplace.js` — add new object at the TOP of the `projects` array.

### Project Object Structure:
```js
{
  slug: 'builder-project-name',        // URL slug (kebab-case)
  name: 'Project Full Name',
  builder: 'Builder Name',
  builderSlug: 'builder-slug',         // must match builders.js
  city: 'Bangalore',
  locality: 'Locality, Bangalore',
  microMarket: 'Locality',             // for tab filtering
  landmark: 'Near XYZ',
  priceLabel: '₹X Cr onwards',
  priceValue: 1.2,                     // numeric for sorting
  images: ['url1', 'url2', ...],       // min 3 images
  status: 'New Launch',                // or 'Under Construction' / 'Ready to Move'
  configurations: [
    { type: '2 BHK', area: '1200 Sq.ft', price: '₹X Cr' },
  ],
  amenities: ['Pool', 'Gym', ...],
  summary: 'One line description',
  overview: 'Detailed 2-3 paragraph description',
  towers: '10 Towers, G+20 Floors',
  totalUnits: 1000,
  projectArea: '25 Acres',
  possession: 'New Launch',
  possessionDate: 'Dec 2027',
  badge: 'New Launch',                 // shows on card: 'New Launch' / 'Ready to Move' / 'Hot Deal'
  isNew: true,                         // shows New Launch badge
  recent: true,                        // shows in Recently Added section
  rating: 4.8,
  propertyType: 'Apartment',
  beds: ['2 BHK', '3 BHK'],
  areaRange: 1200,                     // smallest area (for sorting)
  rera: 'RERA number',
  localityHighlights: [
    { icon: '🚇', label: 'Metro', value: '2 km to Metro' },
  ],
  floorPlans: [
    { type: '2 BHK', area: '1200 Sq.ft', price: '₹X Cr', image: 'url' },
  ],
  faqs: [
    { q: 'Question?', a: 'Answer.' },
  ],
}
```

## Current Projects in marketplace.js
1. **Sobha One World** — Hoskote, New Launch, 1-4 BHK, ₹1.09 Cr+, 14 towers 46 floors, 300-acre township
2. **Prestige Raintree Park** — Whitefield, Under Construction, 2-4 BHK, ₹1.2 Cr+
3. (many more projects...)

## Builders in builders.js
Prestige, Sobha, Godrej, Brigade, Puravankara, Sattva, Birla, Lodha, Mahindra, Assetz, Mana, Abhee, Nambiar, Adarsh, Arvind SmartSpaces, Shriram, Sumadhura, DSR, Ramky, Sowparnika, SNN Raj, and 20+ more.

## Pending Tasks / Roadmap
- [ ] Admin Panel — add projects without coding (Phase 1 priority)
- [ ] WhatsApp button on each property card with property details in message
- [ ] Top Deals section on homepage
- [ ] New Launches section on homepage
- [ ] Special Offers section
- [ ] Lead capture form with Supabase database
- [ ] Domain fix: www.eastproject.in DNS verification pending (TXT record _vercel needed)
- [ ] SEO optimization

## Important Notes
- All phone numbers in code = 8102422651 (already updated)
- WhatsApp floating button already exists in FloatingWidgets.jsx
- marketplace.js is 330KB+ — very large file, use offset/limit when reading
- node_modules is gitignored — do NOT add to git
- Images: use Unsplash URLs or actual project website image URLs
- Color theme: Gold = #D4AF37, Dark = #080B11, accent = #AA7C11
