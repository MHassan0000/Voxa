'use client';

import { motion } from 'framer-motion';
import type { ActionCardProps } from '@/types';

export default function ActionCard({
  title,
  description,
  icon: Icon,
  variants,
  onClick,
}: ActionCardProps) {
  return (
    <motion.button
      variants={variants}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="glass-card relative overflow-hidden rounded-2xl p-5 text-left cursor-pointer group min-h-35 sm:min-h-37.5 flex flex-col justify-between outline-none"
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-white/14"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Icon className="w-4.5 h-4.5 text-zinc-300 group-hover:text-white transition-colors" />
      </div>

      {/* Text */}
      <div className="mt-auto">
        <h3 className="text-sm font-medium text-zinc-100">
          {title}
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">
          {description}
        </p>
      </div>
    </motion.button>
  );
}
