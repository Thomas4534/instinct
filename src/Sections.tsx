// src/components/Sections.tsx
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Sections = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-8 py-32"
    >
      {/* === HYPERLUMINAL BACKGROUND === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Quantum Core Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white/15 via-white/5 to-transparent blur-[200px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Nebula Layers */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[1200px] h-[1200px] bg-gradient-radial from-blue-500/8 to-transparent blur-[180px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[1000px] h-[1000px] bg-gradient-radial from-purple-500/6 to-transparent blur-[160px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Energy Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(255,255,255,0.03)_100%)] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_99%,rgba(255,255,255,0.03)_100%)] bg-[length:50px_50px]" />
      </div>

      {/* === QUANTUM PARTICLES === */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-white to-white/80 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (Math.random() - 0.5) * 80, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full text-center flex flex-col items-center space-y-16">
        {/* Headline */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            },
          }}
          className="space-y-8"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight">
            <span className="text-instinct bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              Make. It. Happen.
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.4 },
            },
          }}
          className="max-w-3xl"
        >
          <p className="text-instinct-small text-xl sm:text-2xl text-white/70 leading-relaxed tracking-wide font-light">
            You build, We make it go viral.
          </p>
        </motion.div>

        {/* === QUANTUM PROGRESS ORB === */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1, delay: 0.6 }
            },
          }}
          className="relative w-64 h-64 rounded-full"
        >
          {/* Orb Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Orb Surface */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10" />

          {/* Orb Core */}
          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-white to-white/80 shadow-[0_0_80px_rgba(255,255,255,0.8)]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Orb Ring */}
          <motion.div
            className="absolute -inset-4 rounded-full border border-white/20"
            animate={{
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>

      {/* === FLOATING GEOMETRY === */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/10 rounded-lg backdrop-blur-sm"
          style={{
            width: `${Math.random() * 120 + 40}px`,
            height: `${Math.random() * 120 + 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            rotate: [0, 180, 360],
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* === EDGE VIGNETTE === */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle at 50% 50%, transparent 40%, black 90%)" />
    </section>
  );
};

export default Sections;