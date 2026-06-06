import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, X, Send, Phone, MessageCircle, Sparkles, MessageSquare } from 'lucide-react'

// ─── CHAT PANEL COMPONENT ────────────────────────────────────────────────────
export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [hasOpened, setHasOpened] = useState(false)
  const messageEndRef = useRef(null)

  // Track scroll for "Scroll to Top" button
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-scroll messages to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Trigger welcome message on first open
  const triggerWelcome = () => {
    if (hasOpened) return
    setHasOpened(true)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages([
        {
          id: 1,
          sender: 'advisor',
          text: "Hi 👋\nLooking for luxury properties in Bangalore?\nOur property advisor can help you.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1200)
  }

  const handleOpenChat = () => {
    setChatOpen(true)
    triggerWelcome()
  }

  // Predefined shortcut responses
  const shortcutData = {
    price: {
      user: "💰 Show me elite price ranges",
      advisor: "Our elite Bangalore portfolio ranges from ₹1.2 Cr to ₹6.5 Cr+ for ultra-luxury penthouses and greek-themed signature villas. What is your preferred configuration (e.g. 3 BHK or 4 BHK)?"
    },
    location: {
      user: "📍 What are the hottest locations?",
      advisor: "The most sought-after prime zones are Whitefield (Prestige Raintree Park), Panathur (Sobha Neopolis), and Sarjapur Road. These micro-markets offer exceptional connectivity and up to 14.5% annual appreciation."
    },
    visit: {
      user: "📅 Schedule a VIP site visit",
      advisor: "Excellent choice. We can arrange a private luxury chauffeur-driven carriage for your tour. Please share your phone or click the 'Callback' button below to coordinate the schedule!"
    },
    plans: {
      user: "🏠 Request floor plans & layouts",
      advisor: "Certainly! We have exclusive architectural mockups, 3D layouts, and master carpet floor plans for all properties. I can send them directly to your WhatsApp or Email."
    }
  }

  const handleShortcutClick = (key) => {
    if (isTyping) return
    const pair = shortcutData[key]
    
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: pair.user,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    
    // Show typing state and append advisor message
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const advMsg = {
        id: Date.now() + 1,
        sender: 'advisor',
        text: pair.advisor,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, advMsg])
    }, 1400)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputVal.trim() || isTyping) return

    const userText = inputVal.trim()
    setInputVal('')

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const advMsg = {
        id: Date.now() + 1,
        sender: 'advisor',
        text: `Thank you for reaching out! Your enquiry regarding "${userText}" has been routed to our luxury property concierge. They will contact you shortly with bespoke selections.\n\nFor immediate assistance, feel free to use the WhatsApp or Call options below!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, advMsg])
    }, 1500)
  }

  return (
    <>
      {/* ── CHAT TRIGGER BUBBLE ── */}
      <div className="fixed bottom-24 right-6 z-30 flex flex-col items-end">
        <AnimatePresence>
          {!chatOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 15 }}
              className="flex items-center gap-3"
            >
              {/* Luxury Welcome Bubble Overlay */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                onClick={handleOpenChat}
                className="hidden sm:block max-w-[240px] rounded-[18px] border border-[#D4AF37]/20 bg-white/92 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer hover:border-[#D4AF37]/50 transition-all text-left"
              >
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Online Support
                </div>
                <div className="text-[13px] leading-relaxed text-slate-700 font-medium">
                  Hi 👋 Looking for luxury homes? Let's chat.
                </div>
              </motion.div>

              {/* Floating Profile Button */}
              <motion.button
                onClick={handleOpenChat}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-[#D4AF37]/50 bg-white p-0.5 shadow-[0_8px_30px_rgba(212,175,55,0.22)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.48)] transition-all cursor-pointer overflow-visible"
              >
                {/* Profile Image */}
                <div className="h-full w-full overflow-hidden rounded-full border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    alt="Pooja Agarwal"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Pulse Green Online Badge */}
                <span className="absolute bottom-0 right-1 flex h-4.5 w-4.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-emerald-500 border-2 border-[#080B11]"></span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EXPANDABLE CHAT PANEL ── */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[370px] h-[520px] flex flex-col overflow-hidden rounded-[24px] border border-[#D4AF37]/25 bg-white/92 shadow-[0_20px_60px_-10px_rgba(212,175,55,0.14)] backdrop-blur-xl "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 bg-white/95 px-5 py-4">
                <div className="flex items-center gap-3">
                  {/* Small Profile Frame */}
                  <div className="relative h-11 w-11 rounded-full border border-[#D4AF37]/45 p-0.5 shrink-0 bg-[#0b0f17]">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                      alt="Pooja Agarwal"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border border-[#080B11]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[14px] font-bold text-slate-900 flex items-center gap-1">
                      Pooja Agarwal <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-600">Luxury Property Advisor</div>
                  </div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setChatOpen(false)}
                  className="rounded-full border border-slate-200 p-1.5 text-slate-600 hover:border-slate-200 hover:text-white transition duration-200"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* MESSAGES BODY */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-[#080B11] to-[#080B11]">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col max-w-[80%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div
                      className={`rounded-[18px] px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#080B11] font-bold rounded-tr-none shadow-[0_4px_12px_rgba(212,175,55,0.15)]'
                          : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none backdrop-blur-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                  </motion.div>
                ))}

                {/* Simulated Typing State */}
                {isTyping && (
                  <div className="flex flex-col items-start mr-auto max-w-[80%]">
                    <div className="rounded-[18px] rounded-tl-none bg-slate-100 border border-slate-200 px-4.5 py-3.5 backdrop-blur-sm">
                      <span className="flex items-center gap-1.5 py-0.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#D4AF37]" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#D4AF37]" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#D4AF37]" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messageEndRef} />
              </div>

              {/* PROPERTY INTERACTIVE SHORTCUTS */}
              <div className="px-4 py-2 bg-white/95 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                <button
                  onClick={() => handleShortcutClick('price')}
                  disabled={isTyping}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-[11.5px] font-bold text-slate-700 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer disabled:opacity-50"
                >
                  💰 Price Ranges
                </button>
                <button
                  onClick={() => handleShortcutClick('location')}
                  disabled={isTyping}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-[11.5px] font-bold text-slate-700 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer disabled:opacity-50"
                >
                  📍 Hot Locations
                </button>
                <button
                  onClick={() => handleShortcutClick('visit')}
                  disabled={isTyping}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-[11.5px] font-bold text-slate-700 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer disabled:opacity-50"
                >
                  📅 Schedule Visit
                </button>
                <button
                  onClick={() => handleShortcutClick('plans')}
                  disabled={isTyping}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-[11.5px] font-bold text-slate-700 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-pointer disabled:opacity-50"
                >
                  🏠 Floor Plans
                </button>
              </div>

              {/* QUICK CONNECT BAR */}
              <div className="grid grid-cols-2 gap-2 px-5 py-2 bg-white/95 border-t border-slate-100">
                {/* WhatsApp button */}
                <a
                  href="https://wa.me/918102422651?text=Hi,%20I'm%20interested%20in%20luxury%20properties%20in%20Bangalore."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center justify-center gap-2 rounded-[12px] bg-[#25D366]/10 border border-[#25D366]/30 text-[12.5px] font-extrabold text-[#25D366] transition hover:bg-[#25D366]/20 cursor-pointer"
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-[#25D366] text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                {/* Callback Button */}
                <a
                  href="tel:+918102422651"
                  className="flex h-10 items-center justify-center gap-2 rounded-[12px] bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[12.5px] font-extrabold text-[#D4AF37] transition hover:bg-[#D4AF37]/20 cursor-pointer"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>Callback</span>
                </a>
              </div>

              {/* INPUT BOX */}
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 border-t border-slate-100 bg-white px-5 py-3"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a bespoke enquiry..."
                  disabled={isTyping}
                  className="w-full bg-transparent text-[13.5px] text-slate-900 placeholder:text-slate-600 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#080B11] transition hover:opacity-90 disabled:opacity-30 cursor-pointer"
                >
                  <Send className="h-3.8 w-3.8 stroke-[2.5px]" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SCROLL TO TOP ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  )
}
