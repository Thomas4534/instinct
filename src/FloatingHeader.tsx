import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

const FloatingHeader = ({ onNetworkClick }: { onNetworkClick: () => void }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [dotCount, setDotCount] = useState(1)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 })

  const headerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  // === scroll + hover tracking ===
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = headerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const commonQuestions = [
    { question: "What is Instinct?", answer: "A creative studio transforming vision into cinematic reality through innovative digital experiences." },
    { question: "How to start a project?", answer: "Begin with our discovery process — share your vision, we handle the creative execution from concept to delivery." },
    { question: "Pricing and packages", answer: "Custom solutions starting at $25K. We tailor packages to your specific needs and project scope." },
    { question: "View our work portfolio", answer: "Explore our latest projects showcasing cinematic storytelling and technical innovation." },
    { question: "Contact the studio", answer: "Reach us at hello@instinct.studio or schedule a consultation through our contact form." },
  ]

  const filteredQuestions = commonQuestions.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleQuestionClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowResults(false)
      setIsFocused(false)
      setExpandedIndex(null)
      inputRef.current?.blur()
    }
    if (e.key === "Enter" && searchQuery.trim()) {
      setShowResults(false)
      setIsFocused(false)
      setExpandedIndex(null)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
        setIsFocused(false)
        setExpandedIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() && isFocused) {
      setShowResults(true)
    } else if (!searchQuery.trim()) {
      setShowResults(false)
      setExpandedIndex(null)
    }
  }, [searchQuery, isFocused])

  const getAnimatedPlaceholder = () => {
    const baseText = "Search Instinct"
    const dots = ".".repeat(dotCount)
    return `${baseText}${dots}`
  }

  return (
    <motion.header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl transition-all duration-1000 ${
        hasScrolled ? "top-4 translate-y-0" : "top-8 translate-y-2"
      }`}
    >
      <div className="relative">
        {/* Enhanced Background Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.7,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-xl opacity-20"
        />

        {/* Main Container */}
        <motion.div
          style={{
            background: `radial-gradient(800px circle at ${springX.get()}px ${springY.get()}px,
              rgba(255,255,255,0.08),
              transparent 70%)`,
          }}
          className="relative rounded-full overflow-hidden transition-all duration-1000 backdrop-blur-3xl border border-white/10 shadow-2xl"
        >
          {/* Animated Border Glow */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-30"
          />

          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-15" />

          {/* Animated Top Shine */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />

          {/* Input + Buttons */}
          <div className="relative z-30 flex items-center">
            {/* Search Input */}
            <div className="flex-1 flex items-center px-6 py-5">
              <motion.div
                animate={{
                  scale: isFocused ? 1.1 : 1,
                  rotate: isFocused ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 mr-3 text-white/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.div>

              <motion.input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyPress}
                placeholder={getAnimatedPlaceholder()}
                animate={{
                  background: isFocused ? "rgba(255,255,255,0.02)" : "transparent",
                }}
                className="text-instinct-small !text-[17px] flex-1 bg-transparent border-none outline-none text-white/90 placeholder-white/45 font-light tracking-tight"
              />
            </div>

            {/* Divider + Buttons */}
            <div className="flex items-center pr-3 space-x-2">
              <motion.div
                animate={{
                  height: isHovered ? "24px" : "20px",
                }}
                className="w-px bg-white/20 mr-2"
              />

              {/* Enhanced Home Button */}
              <motion.button
                whileHover={{
                  scale: 1.08,
                  background: "rgba(255,255,255,0.08)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="relative overflow-hidden px-5 py-2.5 rounded-full bg-white/[0.03] text-instinct-small !text-[17px] text-white/85 hover:text-white transition-all duration-500 group"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/20"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">Home</span>
              </motion.button>

              {/* Enhanced Network Button */}
              <motion.button
                whileHover={{
                  scale: 1.08,
                  background: "rgba(255,255,255,0.08)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onNetworkClick}
                className="relative overflow-hidden px-5 py-2.5 rounded-full bg-white/[0.03] text-instinct-small !text-[17px] text-white/85 hover:text-white transition-all duration-500 group"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/20"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />
                <span className="relative z-10">Network</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-4 rounded-2xl bg-black/80 backdrop-blur-3xl border border-white/15 shadow-2xl overflow-hidden"
          >
            {/* Dropdown Shine */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleQuestionClick(index)}
                    className="w-full text-left px-6 py-4 hover:bg-white/10 text-white/90 text-[19px] transition-all duration-300 group"
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="inline-block transition-transform duration-300"
                    >
                      {item.question}
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="px-6 pb-4 text-sm text-gray-300 leading-relaxed"
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="border-t border-white/5" />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-4 text-white/50 text-[17px]"
              >
                No results found.
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default FloatingHeader