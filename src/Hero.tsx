// src/components/Hero.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const INITIAL_DELAY_MS = 500;

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), INITIAL_DELAY_MS);
    return () => clearTimeout(visibilityTimer);
  }, []);

  const fadeIn = (yOffset: number, delay: number) => ({
    initial: { opacity: 0, y: yOffset },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay },
  });

  return (
    <section className="relative h-[85vh] flex items-center justify-center bg-black overflow-hidden text-white">
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient cold glow */}
        <div className="absolute top-1/2 left-1/2 w-[1100px] h-[1100px] -translate-x-1/2 -translate-y-1/2 bg-white/[0.03] blur-[180px] rounded-full" />
        <div className="absolute top-[40%] left-[35%] w-[700px] h-[700px] bg-sky-300/10 blur-[250px] rounded-full" />
        <div className="absolute top-[70%] left-[60%] w-[600px] h-[600px] bg-cyan-400/10 blur-[220px] rounded-full" />

        {/* Moving light gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === NEW: Frosted Crack Edges === */}
        <div className="absolute left-0 top-0 h-full w-[300px] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/ice-crystals.png')] bg-repeat blur-[1px]" />
        <div className="absolute right-0 top-0 h-full w-[300px] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/ice-crystals.png')] bg-repeat blur-[1px]" />

        {/* === NEW: Gentle Frost Mist Animation === */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(173,216,230,0.05),transparent_80%)]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* === NEW: Animated Frost Veins (thin moving icy light lines) === */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[400px] bg-gradient-to-b from-cyan-200/30 via-white/30 to-transparent blur-[2px] rounded-full"
            style={{
              left: `${i % 2 === 0 ? 5 + i * 3 : 95 - i * 3}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              opacity: [0.05, 0.25, 0.05],
              scaleY: [0.8, 1.1, 0.8],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      {/* === CONTENT === */}
      <div className="relative text-center max-w-3xl mx-auto z-10 p-4">
        {/* Frosty Aura Behind Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isVisible
              ? {
                  opacity: [0.3, 0.5, 0.3],
                  scale: [0.9, 1.05, 0.9],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] w-[550px] h-[250px] bg-gradient-radial from-cyan-200/20 via-white/10 to-transparent blur-[100px] rounded-full"
        />



        {/* Title */}
        <motion.h1
          {...fadeIn(30, 0)}
          className="relative text-instinct text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight mb-8 drop-shadow-[0_0_45px_rgba(200,240,255,0.45)]"
        >
          Instinct 2025 ©
        </motion.h1>

        {/* Shimmer Line Under Title */}
        <motion.div
          className="relative w-[180px] h-[2px] mx-auto mb-8 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sky-200 via-white to-sky-200 blur-sm"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeIn(20, 0.2)}
          className="text-instinct-small text-gray-300 text-lg sm:text-xl tracking-wide leading-relaxed"
        >
          Make the World See You.
        </motion.p>
      </div>

      {/* === EDGE FADE GRADIENTS === */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
