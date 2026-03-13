'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div
      className="flex h-screen w-full items-center justify-center"
      style={{ backgroundColor: '#050507' }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <motion.div
          className="h-10 w-10 rounded-full border-2 border-zinc-700"
          style={{ borderTopColor: '#6c63ff' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-sm font-medium text-zinc-400">Loading…</p>
      </div>
    </div>
  );
}
