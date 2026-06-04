# EastProject.in — Real Estate Website (Claude Context File)

## Owner
- **Name:** Sumit (Real Estate Dealer, East Bangalore)
- **WhatsApp/Phone:** 8102422651
- **Email:** sumitaryan200@gmail.com
- **GitHub:** sumitaryan200-hub
- **Note:** This is a company website, NOT personal — keep all content professional & English

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
    HomePage.jsx          — Main landing page
    ListingPage.jsx       — All properties listing
    ProjectDetailPage.jsx — Single project detail (has BrochureButton + EnquiryForm)
    BuilderPage.jsx       — Builder profile page
  components/
    AppHeader.jsx         — Navigation header
    AppFooter.jsx         — Footer
    FloatingWidgets.jsx   — WhatsApp + Call floating buttons
    LeadForm.jsx          — Lead capture form (brochure + consultation modes)
    PremiumHeroCTAs.jsx   — Hero section CTA buttons
    PropertyCard.jsx      — Reusable property card
    ScrollReveal.jsx      — Scroll animation wrapper
    StaggerReveal.jsx     — Stagger animation wrapper
  data/
    marketplace.js        — ALL project listings data (main data file, 5776 lines, 99 projects)
    builders.js           — All builder profiles
    builderConfig.js      — Builder config
```

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

## Lead Capture System (COMPLETED — 4 Jun 2026)

### How it works:
1. Every project detail page has a **"Download Brochure"** button (bottom of right sidebar)
2. User clicks → modal opens → fills Name + Phone
3. On submit:
   - **WhatsApp opens** on user's phone with professional pre-filled message to 8102422651
   - **Lead saved** to Google Sheet automatically
4. Message tone: Professional English (company website)

### LeadForm.jsx — Key details:
- File: `src/components/LeadForm.jsx`
- Two modes: `mode="brochure"` | `mode="consultation"`
- `SHEET_URL` = Google Apps Script Web App URL (line 7)
- `SUMIT_WHATSAPP` = `918102422651`
- **IMPORTANT:** `openWhatsApp()` must be called BEFORE any `await` — browsers block window.open after async calls

### Google Sheets:
- Sheet name: `EastProject Leads`
- Columns: Timestamp | Name | Phone | Email | Property | Budget | Message | Source
- Apps Script Deployment ID: `AKfycbwtx95EALy3UkmiQytsCwQ8zWCK-oeO_KSCsNBM_R4-1ZvvDSTX4SVfv86wkxhEx35b`
- Script URL: `https://script.google.com/macros/s/AKfycbwtx95EALy3UkmiQytsCwQ8zWCK-oeO_KSCsNBM_R4-1ZvvDSTX4SVfv86wkxhEx35b/exec`

### WhatsApp Message Template (brochure):
```
Hi, I would like to request the brochure for *{projectName}*.

*Name:* {name}
*Contact:* {phone}

Kindly share the brochure at your earliest convenience. Thank you!
```

## Current Projects in marketplace.js
- **99 total projects** — marketplace.js is 5776 lines, always use offset/limit when reading
- **Known bug:** `sobha-one-world` slug appears twice (line 59 & 1559) — duplicate entry
- Key projects: Sobha One World, Prestige Raintree Park, Birla Evara, Godrej Woodscapes, Brigade Oasis, Adarsh Lumina, L&T Elara Celestia, Lodha Elanza, and 90+ more

## Builders in builders.js
Prestige, Sobha, Godrej, Brigade, Puravankara, Sattva, Birla, Lodha, Mahindra, Assetz, Mana, Abhee, Nambiar, Adarsh, Arvind SmartSpaces, Shriram, Sumadhura, DSR, Ramky, Sowparnika, SNN Raj, and 20+ more.

## Completed Work Log
| Date | What was done |
|------|---------------|
| 4 Jun 2026 | Download Brochure button on all project pages |
| 4 Jun 2026 | LeadForm.jsx — WhatsApp auto-redirect on form submit |
| 4 Jun 2026 | Google Sheets lead capture (Apps Script deployed) |
| 4 Jun 2026 | Fixed "Something went wrong" error in form |
| 4 Jun 2026 | Fixed WhatsApp popup blocker issue (call before await) |
| 4 Jun 2026 | Professional English WhatsApp message template |
| 4 Jun 2026 | Fixed duplicate sobha-one-world slug in marketplace.js |
| 4 Jun 2026 | Fixed homepage stats (99+ projects, 25+ builders) |
| 4 Jun 2026 | WhatsApp enquiry button on every property card (HomePage + ListingPage) |
| 4 Jun 2026 | New Launches section on homepage |
| 4 Jun 2026 | Hot Deals section on homepage |
| 4 Jun 2026 | ContactPage.jsx — new Contact/About Us page (/contact route) |
| 4 Jun 2026 | Contact link added to AppHeader nav and AppFooter |

## Pending Tasks / Roadmap
- [ ] Admin Panel — add projects without coding (Phase 1 priority)
- [ ] WhatsApp button on each property card with property details in message
- [ ] Top Deals section on homepage
- [ ] New Launches section on homepage
- [ ] Special Offers section
- [ ] Domain fix: www.eastproject.in DNS verification pending (TXT record _vercel needed)
- [ ] SEO optimization
- [ ] Fix duplicate sobha-one-world slug in marketplace.js

## Important Notes
- All phone numbers in code = 8102422651
- WhatsApp floating button already exists in FloatingWidgets.jsx
- marketplace.js is very large — use offset/limit when reading
- node_modules is gitignored — do NOT add to git
- Images: use Unsplash URLs or actual project website image URLs
- Color theme: Gold = #D4AF37, Dark = #080B11, accent = #AA7C11
- Website tone: Professional English only (not personal/informal)
