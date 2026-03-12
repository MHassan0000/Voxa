'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/[0.06] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-zinc-300" />
      </button>

      {/* Overlay + slide-out sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar drawer */}
            <motion.div
              className="fixed top-0 left-0 z-50 h-full w-[260px] lg:hidden"
              style={{ backgroundColor: '#131320' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.08] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              <Sidebar onLinkClick={() => setOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
