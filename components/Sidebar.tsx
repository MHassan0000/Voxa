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
      style={{ backgroundColor: '#131320' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-7">
        <Image
          src="/images/voxalogo.png"
          alt="Voxa"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span className="text-xl font-bold tracking-tight text-white">
          VOXA
        </span>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/[0.06]" />

      {/* Navigation */}
      <motion.nav
        className="flex-1 flex flex-col gap-1 px-3 mt-5"
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative
                    ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: '#4f46e5' }}
                      layoutId="sidebar-active"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="w-5 h-5 relative z-10 flex-shrink-0" />
                  <span className="relative z-10">{link.label}</span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Bottom branding */}
      <div className="px-6 py-5 border-t border-white/[0.06]">
        <p className="text-xs text-zinc-500">
          © 2026 Voxa
        </p>
      </div>
    </aside>
  );
}
