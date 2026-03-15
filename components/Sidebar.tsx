'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { sidebarLinks } from '@/constants';

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void;
  collapsed?: boolean;
  onToggle?: () => void;
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

export default function Sidebar({
  className = '',
  onLinkClick,
  collapsed = false,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col h-full ${className}`}
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 py-7 ${collapsed ? 'justify-center px-3' : 'px-6'}`}>
        <div
          className="w-10 h-10 rounded-lg shrink-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/voxa-logo-new.png')" }}
          role="img"
          aria-label="Voxa logo"
        />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className="text-xl font-bold tracking-wide text-zinc-100 overflow-hidden whitespace-nowrap"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              Voxa
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className={`h-px bg-white/4 ${collapsed ? 'mx-3' : 'mx-5'}`} />

      {/* Navigation */}
      <motion.nav
        className={`flex-1 flex flex-col gap-0.5 mt-5 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}
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
                title={collapsed ? link.label : undefined}
              >
                <motion.div
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-3' : 'px-4'} py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
                    ${isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/3'
                    }`}
                  whileHover={{ x: collapsed ? 0 : 3 }}
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
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        className="relative z-10 overflow-hidden whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Toggle Button */}
      {onToggle && (
        <div className={`px-3 py-3 border-t border-white/4`}>
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-full py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all cursor-pointer"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <PanelLeftClose className="w-4.5 h-4.5" />
                <span>Collapse</span>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Bottom branding (only when expanded) */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            className="px-6 py-5 border-t border-white/4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded shrink-0 bg-contain bg-center bg-no-repeat opacity-70"
                style={{ backgroundImage: "url('/images/voxa-logo-new.png')" }}
                role="img"
                aria-label="Voxa logo"
              />
              <p className="text-xs font-medium text-zinc-400">
                Voxa
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
