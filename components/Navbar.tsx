'use client';

import MobileNav from './MobileNav';
import Image from 'next/image';
import { Show, UserButton, SignInButton } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-15 px-3 sm:px-5 lg:px-8 border-b border-white/4"
      style={{ backgroundColor: 'rgba(5, 5, 7, 0.8)', backdropFilter: 'blur(20px)' }}
    >
      {/* Left – Mobile nav + logo on small screens */}
      <div className="flex items-center gap-3">

        <div className="flex lg:hidden items-center gap-3">
          <Image
            src="/images/voxa-logo-new.png"
            alt="Voxa"
            width={32}
            height={32}
            className="w-8 h-8 rounded-md object-contain shrink-0"
          />
          <span className="text-base font-bold text-zinc-100 tracking-wide">
            Voxa
          </span>
        </div>
      </div>

      {/* Center */}
      <div className="hidden sm:flex items-center gap-2" />

      {/* Right – Clerk Auth */}
      <div className="flex items-center gap-3">
        <Show when="signed-in">
          <UserButton />
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-zinc-200 transition-all duration-200 border border-white/8 hover:border-white/16 hover:bg-white/4 cursor-pointer"
              style={{ backgroundColor: 'rgba(14, 14, 20, 0.6)' }}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          </SignInButton>
        </Show>
        <MobileNav />
      </div>
    </header>
  );
}
