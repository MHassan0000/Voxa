import type { LucideIcon } from 'lucide-react';
import type { Variants } from 'framer-motion';

/* ── Sidebar ─────────────────────────────────────── */

export interface SidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

/* ── Action Cards ────────────────────────────────── */

export interface ActionCardData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  modalTitle: string;
  modalDescription: string;
  buttonText: string;
}

export interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variants?: Variants;
  onClick?: () => void;
}

/* ── Meeting Modal ───────────────────────────────── */

export interface MeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  buttonText: string;
  icon?: LucideIcon;
  image?: string;
  buttonIcon?: string;
  className?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}
