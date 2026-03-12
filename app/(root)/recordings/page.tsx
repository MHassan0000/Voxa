'use client';

import { motion } from 'framer-motion';
import { Video } from 'lucide-react';

export default function RecordingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1100px] mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1a1a2e' }}>
          <Video className="w-5 h-5" style={{ color: '#6366f1' }} />
        </div>
        <h1 className="text-2xl font-semibold text-white">Recordings</h1>
      </div>

      <div
        className="rounded-2xl border border-white/[0.07] p-16 flex flex-col items-center justify-center text-center min-h-[350px]"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <Video className="w-14 h-14 text-zinc-600 mb-4" />
        <p className="text-zinc-500 text-sm">No recordings yet</p>
      </div>
    </motion.div>
  );
}
