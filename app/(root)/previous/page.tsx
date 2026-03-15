'use client';

import { motion } from 'framer-motion';
import { History } from 'lucide-react';

import CallList from '@/components/CallList';

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
          style={{
            background:
              'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(108, 99, 255, 0.05) 100%)',
            border: '1px solid rgba(108, 99, 255, 0.2)',
          }}
        >
          <History className="w-4 h-4 text-indigo-400" />
        </div>
        <h1 className="text-lg font-medium text-zinc-100">
          Previous Meetings
        </h1>
      </div>

      <CallList type="ended" />
    </motion.div>
  );
}
