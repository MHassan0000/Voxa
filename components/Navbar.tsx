'use client';

import MobileNav from './MobileNav';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-[68px] px-4 sm:px-6 backdrop-blur-xl border-b border-white/[0.06]"
      style={{ backgroundColor: 'rgba(13, 13, 18, 0.85)' }}
    >
      {/* Left – Mobile nav + logo on small screens */}
      <div className="flex items-center gap-3">
        <MobileNav />
        {/* Logo visible only on mobile (sidebar hidden) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Image
            src="/images/voxalogo.png"
            alt="Voxa"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-base font-semibold text-white tracking-tight">
            VOXA
          </span>
        </div>
      </div>

      {/* Center – placeholder for future controls */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Future: quick actions, search, etc. */}
      </div>

      {/* Right – User avatar placeholder (Clerk auth later) */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          {/* Clerk UserButton will replace this */}
        </div>
      </div>
    </header>
  );
}
