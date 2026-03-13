import {
  Home,
  CalendarClock,
  History,
  Video,
  Plus,
  Users,
  CalendarDays,
} from 'lucide-react';

export const sidebarLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Upcoming', href: '/upcoming', icon: CalendarClock },
  { label: 'Previous', href: '/previous', icon: History },
  { label: 'Recordings', href: '/recordings', icon: Video },
  { label: 'Personal Room', href: '/personal-room', icon: Plus },
];

export const actionCards = [
  {
    title: 'New Meeting',
    description: 'Start an instant meeting',
    icon: Plus,
  },
  {
    title: 'Join Meeting',
    description: 'Via invitation link',
    icon: Users,
  },
  {
    title: 'Schedule Meeting',
    description: 'Plan your meeting',
    icon: CalendarDays,
  },
  {
    title: 'View Recordings',
    description: 'Meeting recordings',
    icon: Video,
  },
];
