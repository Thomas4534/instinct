import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHeader from "./FloatingHeader";
import Network from "./Network";

// --- Component: Featured Video Info (Clean & Above Video) ---
const FeaturedVideoInfo = ({ video, customNames, handleNameChange }) => {
  const name = customNames[video.id] ?? video.defaultCompany;
  const isCustom = name !== video.defaultCompany;

  return (
    <div className="flex flex-col items-start w-full relative mb-4">
      <div className="relative w-full max-w-4xl">
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(video.id, e.target.value)}
          className="text-left font-semibold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight
                     bg-transparent border-b border-transparent focus:border-white/30 outline-none
                     pb-3 w-full transition-all duration-300 resize-none px-0"
          placeholder="Enter Video Title..."
        />
        {isCustom && (
          <span className="absolute -top-4 right-0 text-xs text-white/50 font-mono italic">
            Custom
          </span>
        )}
      </div>

      <div className="text-white/60 text-sm mt-3 mb-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{video.date}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70 font-medium">
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>{video.views.toLocaleString()} views</span>
        </div>
      </div>
    </div>
  );
};

// --- Component: Grid Video Info (Tighter) ---
const GridVideoInfo = ({ video, customNames, handleNameChange }) => {
  const name = customNames[video.id] ?? video.defaultCompany;

  return (
    <div className="flex flex-col items-start space-y-1 w-full pt-3">
      <input
        type="text"
        value={name}
        onChange={(e) => handleNameChange(video.id, e.target.value)}
        className="text-white text-base font-semibold bg-transparent border-b border-transparent focus:border-white/20 outline-none pb-1 w-full transition-colors duration-300 px-1 hover:bg-white/5 rounded"
        placeholder="Custom Title"
      />
      <div className="flex items-center gap-3 flex-wrap text-white/50 text-xs">
        <span className="text-white/70">{video.date}</span>
        <span className="text-white/40">·</span>
        <span className="flex items-center gap-1 text-white/60 font-medium">
          <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {video.views.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

// === VIDEO PANEL (Main Component) ===
const VideoPanel = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customNames, setCustomNames] = useState<Record<number, string>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const videoTitles: Record<number, string> = {
    1: "Cluely Series A",
    2: "Cluely Marketing Team",
    3: "Cluely AfterParty",
    4: "Cluely Demo",
    5: "Cluely Draft",
    6: "Cluely Web Search",
    7: "Cluely University",
    8: "Cluely Therapy Session",
    9: "Cluely Web Call",
    10: "Cluely Search Feature",
  };

  const videos = Array.from({ length: 9 }, (_, i) => ({
    id: i + 2,
    src: `/videos/video_${i + 2}.mp4`,
    defaultCompany: videoTitles[i + 2] || `Cluely-${1000 + i * 7}`,
    views: Math.floor(150_000_000 + Math.random() * 50_000_000),
    date: new Date(
      2025,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  const featuredVideo = {
    id: 1,
    src: "/videos/video_1.mp4",
    defaultCompany: videoTitles[1],
    views: 210_000_000,
    date: "Nov 8, 2025",
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsFullscreen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setTimeout(() => {
      setSelectedVideo(null);
      document.body.style.overflow = "unset";
    }, 500);
  };

  const handleNameChange = (id: number, newName: string) => {
    setCustomNames((prev) => ({ ...prev, [id]: newName }));
  };

  // Handle Network button click - navigate to network page
  const handleNetworkClick = () => {
    navigate("/network");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* === FLOATING HEADER === */}
      <FloatingHeader onNetworkClick={handleNetworkClick} />

      <div className="w-full flex flex-col items-center space-y-16 pt-24">
        {/* === FEATURED VIDEO === */}
        <div className="w-full max-w-7xl px-8 flex flex-col">
          <FeaturedVideoInfo
            video={featuredVideo}
            customNames={customNames}
            handleNameChange={handleNameChange}
          />

          <motion.div
            whileHover={{ scale: 1.005 }}
            className="relative w-full aspect-[16/8.5] rounded-[24px] overflow-hidden
            border border-white/10 bg-gradient-to-b from-white/5 to-black/30
            shadow-[0_0_80px_-15px_rgba(255,255,255,0.1)]
            group cursor-pointer transition-all duration-700"
            onClick={() => handleVideoClick(featuredVideo)}
          >
            <video
              src={featuredVideo.src}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover scale-105 brightness-[0.5] group-hover:brightness-100 group-hover:scale-[1.07]
                         transition-all duration-[1500ms] ease-out"
            />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30
              bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)]
              transition-opacity duration-700 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* === GRID VIDEOS === */}
        <div className="w-full max-w-7xl px-8">
          <h2 className="text-xl font-bold text-white/90 mb-6 border-b border-white/10 pb-2">
            Recent Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-12">
            {videos.map((vid) => (
              <div key={vid.id} className="flex flex-col items-start w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-video overflow-hidden rounded-[16px] border border-white/10
                  bg-gradient-to-br from-white/[0.04] to-black/40 group
                  shadow-lg transition-all duration-700 cursor-pointer w-full"
                  onClick={() => handleVideoClick(vid)}
                >
                  <video
                    src={vid.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover scale-105 brightness-[0.4] group-hover:brightness-100 group-hover:scale-110
                               transition-all duration-[1500ms] ease-out"
                  />

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30
                    bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)]
                    transition-opacity duration-700 pointer-events-none"
                  />
                </motion.div>

                <GridVideoInfo
                  video={vid}
                  customNames={customNames}
                  handleNameChange={handleNameChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === FULLSCREEN MODAL === */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFullscreen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
              className="absolute top-8 right-8 z-30 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              onClick={closeFullscreen}
            >
              <div className="w-4 h-4 relative">
                <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
              </div>
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-full h-full max-w-7xl max-h-[85vh] mx-10 rounded-2xl overflow-hidden
              border border-white/10 shadow-[0_0_100px_-20px_rgba(255,255,255,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={selectedVideo.src}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent flex justify-start z-20"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-bold text-white text-2xl drop-shadow-md">
                    {customNames[selectedVideo.id] ?? selectedVideo.defaultCompany}
                  </span>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{selectedVideo.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70 font-medium">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>{selectedVideo.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Main App component with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoPanel />} />
        <Route path="/network" element={<Network />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;