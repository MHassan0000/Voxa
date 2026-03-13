'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  CalendarClock,
  History,
  Video,
  Plus,
} from 'lucide-react';

const sidebarLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Upcoming', href: '/upcoming', icon: CalendarClock },
  { label: 'Previous', href: '/previous', icon: History },
  { label: 'Recordings', href: '/recordings', icon: Video },
  { label: 'Personal Room', href: '/personal-room', icon: Plus },
];

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void;
}

const sidebarVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const linkVariant = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export default function Sidebar({ className = '', onLinkClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col h-full ${className}`}
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-7">
        <Image
          src="/images/VOXA.png"
          alt="Voxa"
          width={40}
          height={40}
          className="w-10 h-10 rounded-lg object-contain shrink-0"
          priority
        />
        <span className="text-xl font-bold tracking-wide text-zinc-100">
          Voxa
        </span>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-white/4" />

      {/* Navigation */}
      <motion.nav
        className="flex-1 flex flex-col gap-0.5 px-3 mt-5 overflow-y-auto"
        variants={sidebarVariants}
        initial="hidden"
        animate="show"
      >
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href));
          const Icon = link.icon;

          return (
            <motion.div key={link.href} variants={linkVariant}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className="relative block"
              >
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
                    ${isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/3'
                    }`}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(108, 99, 255, 0.08) 100%)',
                        border: '1px solid rgba(108, 99, 255, 0.15)',
                      }}
                      layoutId="sidebar-active"
                      transition={{
                        type: 'spring' as const,
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="w-5 h-5 relative z-10 shrink-0" />
                  <span className="relative z-10">{link.label}</span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Bottom branding */}
      <div className="px-6 py-5 border-t border-white/4 mt-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/images/VOXA.png"
            alt="Voxa"
            width={20}
            height={20}
            className="w-5 h-5 rounded opacity-70 object-contain shrink-0"
          />
          <p className="text-xs font-medium text-zinc-400">
            Voxa
          </p>
        </div>
      </div>
    </aside>
  );
}
