import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import BuilderPage from './pages/BuilderPage'
import ContactPage from './pages/ContactPage'
import SmoothScroll from './components/SmoothScroll'
import CursorGlow from './components/CursorGlow'

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <CursorGlow />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/residential-properties-in-bangalore" element={<ListingPage />} />
          <Route path="/builders/:slug" element={<BuilderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* SEO-friendly project URLs: /sobha-neopolis-eastproject */}
          <Route path="/:projectSlug" element={<ProjectDetailPage />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
