'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ActionCardList from '@/components/ActionCardList';

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
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
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
      className="w-full max-w-275 mx-auto space-y-6"
    >
      {/* Hero / Clock Banner */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-12 min-h-50 sm:min-h-55 flex flex-col justify-end"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(160deg, rgba(5,5,7,0.7) 0%, rgba(5,5,7,0.4) 50%, rgba(5,5,7,0.6) 100%)',
          }}
        />

        <div className="relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {formattedTime}
          </motion.h1>
          <motion.p
            className="mt-2 text-sm sm:text-base text-zinc-300 font-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {formattedDate}
          </motion.p>
        </div>
      </motion.div>

      {/* Action Cards */}
      <ActionCardList containerVariants={container} itemVariants={item} />
    </motion.div>
  );
}

