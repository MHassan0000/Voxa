'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, CalendarDays, Video } from 'lucide-react';

const actionCards = [
  {
    title: 'New Meeting',
    description: 'Start an instant meeting',
    icon: Plus,
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
  {
    title: 'Join Meeting',
    description: 'Via invitation link',
    icon: Users,
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  },
  {
    title: 'Schedule Meeting',
    description: 'Plan your meeting',
    icon: CalendarDays,
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  },
  {
    title: 'View Recordings',
    description: 'Meeting recordings',
    icon: Video,
    gradient: 'linear-gradient(135deg, #f59e0b, #eab308)',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time
    ? time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : '';

  const formattedDate = time
    ? time.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1100px] mx-auto space-y-8"
    >
      {/* Hero / Clock Banner */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl p-8 sm:p-10 lg:p-12 min-h-[240px] flex flex-col justify-end"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
        }}
      >
        {/* Decorative ambient glows */}
        <div
          className="absolute top-[-40%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(79, 70, 229, 0.15)' }}
        />
        <div
          className="absolute bottom-[-30%] left-[30%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'rgba(139, 92, 246, 0.1)' }}
        />

        {/* Time display */}
        <div className="relative z-10">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {formattedTime}
          </motion.h1>
          <motion.p
            className="mt-2 text-base sm:text-lg text-zinc-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {formattedDate}
          </motion.p>
        </div>
      </motion.div>

      {/* Action Cards */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.title}
              variants={item}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden rounded-2xl p-6 text-left cursor-pointer group min-h-[170px] flex flex-col justify-between border-0 outline-none"
              style={{ background: card.gradient }}
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-white/70 mt-0.5">
                  {card.description}
                </p>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent" />
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
