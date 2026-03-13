'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const drawerContent = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed top-0 left-0 z-50 h-[100dvh] w-65 lg:hidden overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring' as const, stiffness: 350, damping: 35 }}
          >
            {/* Solid background layer to prevent bleed-through */}
            <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0f' }} />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-4 z-20 flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/6 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>

            {/* Sidebar content */}
            <div className="relative z-10 h-full overflow-y-auto">
              <Sidebar onLinkClick={() => setOpen(false)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/4 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-zinc-400" />
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
}
