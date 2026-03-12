'use client';

import MobileNav from './MobileNav';
import Image from 'next/image';
import { Show, UserButton, SignInButton } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';

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

      {/* Right – Clerk Auth */}
      <div className="flex items-center gap-3">
        <Show when="signed-in">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
              },
            }}
          />
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#4f46e5' }}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </SignInButton>
        </Show>
      </div>
    </header>
  );
}
