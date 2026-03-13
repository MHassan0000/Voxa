'use client';

import { motion } from 'framer-motion';
import { History } from 'lucide-react';

export default function PreviousPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-275 mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <History className="w-4 h-4 text-zinc-300" />
        </div>
        <h1 className="text-lg font-medium text-zinc-100">Previous Meetings</h1>
      </div>

      <div className="glass-card rounded-2xl p-14 flex flex-col items-center justify-center text-center min-h-75">
        <History className="w-10 h-10 text-zinc-500 mb-3" />
        <p className="text-zinc-400 text-xs">No previous meetings</p>
      </div>
    </motion.div>
  );
}
